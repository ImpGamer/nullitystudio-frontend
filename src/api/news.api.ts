import type { News } from '@/types/news'
import { createResourceApi } from './resource.api'
import api from './axios'

const base = '/news'
export const newsApi = createResourceApi<News>(base)

export const {
  getPage: getNewsPage,
  count: countNews,
  getById: getNewsById,
  deleteById: deleteNewsById,
} = newsApi

export async function getLatest() : Promise<News> {
  const response = await api.get<News>(`${base}/latest`)
  return response.data;
}
