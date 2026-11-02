import { ref } from 'vue'
import { defineStore } from 'pinia'
import { gamesApi, getFeaturedGame } from '@/api/games.api'
import { useCachedResource } from '@/composables/useCachedResource'
import type { Game } from '@/types/game'

export const useGamesStore = defineStore('games', () => {
  // Paginación, getById y count cacheados: lógica compartida en la composable
  const { getPage, getById, count, prime } = useCachedResource<Game>(gamesApi)

  const featuredId = ref<string>('')

  let featuredPromise: Promise<string> | null = null

  // Único método propio de este store: el resto lo comparte con el resto
  async function featured(): Promise<string> {
    if (featuredId.value.length > 0) return featuredId.value

    if (!featuredPromise) {
      featuredPromise = getFeaturedGame()
        .then((game: Game) => {
          featuredId.value = game.id
          prime(game) // queda en la caché: getById(featuredId) no vuelve a pedirlo

          return game.id
        })
        .finally(() => {
          featuredPromise = null
        })
    }

    return featuredPromise
  }

  return {
    featured,
    count,
    getPage,
    getById,
  }
})
