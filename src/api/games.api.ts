import type { Game } from '@/types/game'
import api from './axios'
import { createResourceApi } from './resource.api'

const base = '/games'
export const gamesApi = createResourceApi<Game>(base)

export const {
  getPage: getPageGames,
  count: countGames,
  getById: getGameById,
  deleteById: deleteGameById,
} = gamesApi

export async function getFeaturedGame(): Promise<Game> {
  const response = await api.get<Game>(`${base}/featured/current`)
  return response.data
}
