import api from './axios'
import type { Page, PageResult } from '@/types/page'

export interface ResourceApi<T> {
  getPage: (page: Page, filters?: Record<string, any>) => Promise<PageResult<T>>
  count: () => Promise<number>
  getById: (id: string) => Promise<T>
  deleteById: (id: string) => Promise<string>
}

export function createResourceApi<T>(base: string): ResourceApi<T> {
  const getPage = async (page: Page, filters?: Record<string, any>): Promise<PageResult<T>> => {
    const response = await api.get<PageResult<T>>(base, {
      params: {
        page: page.page,
        size: page.size,
        ...filters,
      },
    })

    return response.data
  }

  const count = async (): Promise<number> => {
    const response = await api.get<{ count: number }>(`${base}/count`)
    return response.data.count
  }

  const getById = async (id: string): Promise<T> => {
    const response = await api.get<T>(`${base}/${id}`)
    return response.data
  }

  const deleteById = async (id: string): Promise<string> => {
    const response = await api.delete<{ message: string }>(`${base}/${id}`)
    return response.data.message
  }

  return { getPage, count, getById, deleteById }
}
