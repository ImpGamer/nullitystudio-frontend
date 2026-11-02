import { ref } from 'vue'
import { ResponseState } from '@/api/axios'
import { DEFAULT_RETRY_DELAY, useRetryScheduler } from '@/composables/useRetryScheduler'

export type RetriableRequestOptions<TArgs extends unknown[], TResult> = {
  /** Espera entre reintentos, en ms. */
  retryDelay?: number;
  /**
   * Si devuelve false el error no se reintenta (p. ej. un 4xx: reintentar
   * no lo arregla). Por defecto se reintenta cualquier fallo.
   */
  shouldRetry?: (error: unknown, ...args: TArgs) => boolean;
  /** Se ejecuta antes de cada intento, reinicios incluidos. */
  onStart?: (...args: TArgs) => void
  /** Se ejecuta con el resultado cuando un intento termina bien. */
  onSuccess?: (result: TResult, ...args: TArgs) => void
  /** Se ejecuta con el error cuando un intento falla, antes de reintentar. */
  onError?: (error: unknown, ...args: TArgs) => void
}

/**
 * Envuelve una petición con estado LOADING/SUCCESS/ERROR y reintento
 * automático: el loader no se detiene ni cuando la carga falla, porque el
 * estado vuelve a LOADING en cada intento.
 *
 * El reintento repite la MISMA llamada con los argumentos del intento
 * fallido; un `run` más nuevo cancela el reintento pendiente y los
 * resultados de intentos viejos se descartan (no pisan datos frescos).
 *
 * La limpieza de timers vive en `useRetryScheduler`, así que desmontar el
 * componente detiene cualquier reintento en vuelo.
 */
export function useRetriableRequest<TArgs extends unknown[], TResult>(
  request: (...args: TArgs) => Promise<TResult>,
  options: RetriableRequestOptions<TArgs, TResult> = {},
) {
  const state = ref(ResponseState.LOADING)
  const scheduler = useRetryScheduler(options.retryDelay ?? DEFAULT_RETRY_DELAY)

  let runId = 0

  async function run(...args: TArgs): Promise<void> {
    const current = ++runId

    scheduler.clear()
    state.value = ResponseState.LOADING
    options.onStart?.(...args)

    try {
      const result = await request(...args)

      if (current !== runId) return // ya arrancó una carga más nueva

      state.value = ResponseState.SUCCESS
      options.onSuccess?.(result, ...args)
    } catch (error: unknown) {
      if (current !== runId) return

      state.value = ResponseState.ERROR
      options.onError?.(error, ...args)

      if (options.shouldRetry?.(error, ...args) ?? true) {
        scheduler.schedule(() => void run(...args))
      }
    }
  }

  return { state, run }
}
