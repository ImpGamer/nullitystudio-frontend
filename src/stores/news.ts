import { defineStore } from 'pinia'
import { newsApi, getLatest } from '@/api/news.api'
import { useCachedResource } from '@/composables/useCachedResource'
import type { News } from '@/types/news'
import type { PageResult } from '@/types/page'
import { ref } from 'vue'

export const useNewsStore = defineStore('news', () => {
  // Misma caché que games: paginación, getById y count compartidos
  const latestId = ref<string | null>(null)
  const { getPage, getById, count, prime } = useCachedResource<News>(newsApi)

  /**
   * Paginación filtrada por tags. Sin tags cae en la caché por offsets;
   * con tags, cada combinación tiene su ventana cacheada en la composable.
   */
  function filterByTags(tags: string[], page: number, size: number): Promise<PageResult<News>> {
    return getPage({ page, size }, tags.length > 0 ? { tags } : undefined)
  }

  /** Primer artículo del catálogo (según el orden del backend). */
  async function latest(): Promise<News> {
    if(latestId.value != null) 
      return getById(latestId.value);

    const response = await getLatest();
    latestId.value = response.id;

    return prime(response);
  }

  return {
    filterByTags,
    latest,
    getPage,
    getById,
    count,
  }
})
