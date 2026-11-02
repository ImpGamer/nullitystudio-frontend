import { ref } from 'vue'
import { cleanFilters } from '@/api/axios'
import type { ResourceApi } from '@/api/resource.api'
import type { Page, PageResult } from '@/types/page'

type CachedWindow = {
  ids: string[]
  total: number
}

/**
 * Caché de paginación + entidades para cualquier recurso con API paginada.
 *
 * Se crea DENTRO del setup de un store de Pinia, así que su estado vive junto
 * al store y queda compartido entre todos los componentes que lo usen.
 *
 * Estrategia:
 * - Sin filtros: relleno de huecos con `offsetInPage` (solo pide lo que falta
 *   en la ventana [start, end)).
 * - Con filtros: cada combinación de filtros tiene su propia ventana cacheada,
 *   porque desde los offsets no se puede reconstruir un resultado filtrado.
 * - Entidades: se guardan por id y se reutilizan entre ventanas.
 * - count(): total sin filtros, con dedup de la promesa en vuelo.
 */
export function useCachedResource<T extends { id: string }>(api: ResourceApi<T>) {
  const idsByOffset = new Map<number, string>()
  const entityCache = new Map<string, T>()
  const filteredWindows = new Map<string, CachedWindow>()
  const total = ref<number | null>(null)

  let countPromise: Promise<number> | null = null

  /** Guarda una entidad en la caché (para sembrarla sin volver a pedirla). */
  function prime(item: T): T {
    entityCache.set(item.id, item)
    return item
  }

  async function getById(id: string): Promise<T> {
    const cached = entityCache.get(id)
    if (cached) return cached

    return prime(await api.getById(id))
  }

  async function count(): Promise<number> {
    if (total.value !== null) return total.value

    if (!countPromise) {
      countPromise = api
        .count()
        .then((fetchedTotal) => {
          total.value = fetchedTotal
          return fetchedTotal
        })
        .finally(() => {
          countPromise = null
        })
    }

    return countPromise
  }

  async function getPage(page: Page, filters?: Record<string, any>): Promise<PageResult<T>> {
    const clean = cleanFilters(filters)

    if (clean) return getFilteredPage(page, clean)

    const start = (page.page - 1) * page.size
    const end = start + page.size // exclusivo

    const missingStart = findFirstMissingOffset(start, end)

    if (missingStart !== null) {
      // offsetInPage le dice al backend "de esta página, sáltate los primeros
      // N elementos, ya los tengo". El backend siempre te da el resto HASTA
      // el final de la ventana (size - offsetInPage elementos), por eso basta
      // con encontrar el PRIMER hueco: todo lo que sigue después también va
      // a venir en esa misma respuesta.
      const offsetInPage = missingStart - start
      await fetchAndCacheFromOffset(page, offsetInPage, start)
    }

    return buildResultFromCache(start, end)
  }

  async function getFilteredPage(page: Page, filters: Record<string, any>): Promise<PageResult<T>> {
    const key = windowKey(page, filters)
    const cached = filteredWindows.get(key)

    if (cached) {
      return {
        total: cached.total,
        page: cached.ids.map((id) => entityCache.get(id)!),
      }
    }

    const response = await api.getPage(page, filters)

    filteredWindows.set(key, {
      ids: response.page.map((item) => item.id),
      total: response.total,
    })
    response.page.forEach((item) => prime(item))

    return response
  }

  /** Clave estable: ni el orden de los filtros ni el de los tags cambian la ventana. */
  function windowKey(page: Page, filters: Record<string, any>): string {
    const entries = Object.entries(filters).map(([key, value]) => {
      const normalized = Array.isArray(value) ? [...value].sort() : value
      return [key, normalized] as [string, any]
    })

    entries.sort(([a], [b]) => a.localeCompare(b))

    return `${page.page}:${page.size}:${JSON.stringify(Object.fromEntries(entries))}`
  }

  /**
   * Busca la primera posición absoluta dentro de [start, end) que todavía no
   * está en cache. Como el backend solo puede devolver un "sufijo" de la
   * ventana (offsetInPage -> end), asumimos que si algo falta, falta desde
   * ahí en adelante — no huecos sueltos en medio. Esto se cumple naturalmente
   * porque idsByOffset solo se llena con fetches que siempre completan hasta
   * el final de su ventana.
   */
  function findFirstMissingOffset(start: number, end: number): number | null {
    for (let offset = start; offset < end; offset++) {
      if (!idsByOffset.has(offset)) return offset
    }
    return null
  }

  async function fetchAndCacheFromOffset(
    page: Page,
    offsetInPage: number,
    windowStart: number,
  ): Promise<void> {
    const { page: items, total: fetchedTotal } = await api.getPage(page, { offsetInPage })

    items.forEach((item, i) => {
      // mutación directa: idsByOffset y entityCache solo reciben altas, nunca
      // reemplazos ni bajas, por eso no hay riesgo de pisar datos válidos
      idsByOffset.set(windowStart + offsetInPage + i, item.id)
      prime(item)
    })

    total.value = fetchedTotal
  }

  async function buildResultFromCache(start: number, end: number): Promise<PageResult<T>> {
    const ids: string[] = []
    for (let offset = start; offset < end; offset++) {
      const id = idsByOffset.get(offset)
      if (id) ids.push(id) // ya debería existir siempre aquí, el fetch anterior llenó el hueco
    }

    return {
      total: await count(),
      page: ids.map((id) => entityCache.get(id)!),
    }
  }

  return { getPage, getById, count, total, prime }
}
