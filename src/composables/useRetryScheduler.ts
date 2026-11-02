import { onUnmounted } from 'vue'

export const DEFAULT_RETRY_DELAY = 3000

/**
 * Factory de reintentos para peticiones: `schedule(callback)` espera
 * `retryDelay` ms y lanza el callback (un solo reintento pendiente a la vez;
 * cada `schedule` nuevo cancela el anterior). `clear` cancela el pendiente.
 *
 * La limpieza al desmontar el componente es automática, así que cada
 * página o componente puede crear su scheduler sin dejar timers huérfanos.
 */
export function useRetryScheduler(retryDelay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null

  function schedule(callback: () => void): void {
    clear()

    timer = setTimeout(() => {
      timer = null
      callback()
    }, retryDelay)
  }

  function clear(): void {
    if (timer === null) return

    clearTimeout(timer)
    timer = null
  }

  onUnmounted(clear)

  return { schedule, clear }
}
