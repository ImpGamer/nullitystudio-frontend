import type { News } from '@utils/interfaces'
import { Pagination } from '@utils/classes'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useNewsStore = defineStore('news', () => {
  const news: Record<number, News> = {
    0: {
      id: 0,
      title: 'New Game!',
      tags: ['studio', 'development'],
      rTime: 3,
      date: '2026-02-18',
      header: 'New games arrives to the studio, different from others',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni neque veritatis dolorem. Est incidunt, quam eveniet commodi quibusdam, quisquam aliquid ea dolore rem, id recusandae aliquam voluptatum sapiente iusto alias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni neque veritatis dolorem. Est incidunt, quam eveniet commodi quibusdam, quisquam aliquid ea dolore rem, id recusandae aliquam voluptatum sapiente iusto alias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni neque veritatis dolorem. Est incidunt, quam eveniet commodi quibusdam, quisquam aliquid ea dolore rem, id recusandae aliquam voluptatum sapiente iusto alias.',
    },
    1: {
      id: 1,
      title: 'Colaboration!',
      tags: ['studio'],
      rTime: 9,
      date: '2026-07-04',
      header: 'We hope a collaboration from axtionStudios',
      text: 'Porem ipsum dolor sit amet consectetur adipisicing elit. Magni neque veritatis dolorem. Est incidunt, quam eveniet commodi quibusdam, quisquam aliquid ea dolore rem, id recusandae aliquam voluptatum sapiente iusto alias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni neque veritatis dolorem. Est incidunt, quam eveniet commodi quibusdam, quisquam aliquid ea dolore rem, id recusandae aliquam voluptatum sapiente iusto alias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni neque veritatis dolorem. Est incidunt, quam eveniet commodi quibusdam, quisquam aliquid ea dolore rem, id recusandae aliquam voluptatum sapiente iusto alias.',
    },
    2: {
      id: 2,
      title: 'Grow up',
      tags: ['studio', 'gaming'],
      rTime: 7,
      date: '2026-12-25',
      header: 'Christmas is arriving and the studio has surprises for you!',
      text: 'Rorem ipsum dolor sit amet consectetur adipisicing elit. Magni neque veritatis dolorem. Est incidunt, quam eveniet commodi quibusdam, quisquam aliquid ea dolore rem, id recusandae aliquam voluptatum sapiente iusto alias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni neque veritatis dolorem. Est incidunt, quam eveniet commodi quibusdam, quisquam aliquid ea dolore rem, id recusandae aliquam voluptatum sapiente iusto alias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni neque veritatis dolorem. Est incidunt, quam eveniet commodi quibusdam, quisquam aliquid ea dolore rem, id recusandae aliquam voluptatum sapiente iusto alias.',
    },
  }

  const newsList = computed(() => Object.values(news))
  const newsCount = computed(() => newsList.value.length)
  const latest = computed(() => 0)

  function getById(id: number) {
    return news[id]
  }

  function filterByTags(tags: string[], page: number, size: number) : News[] {
    if(tags.length === 0) 
        return new Pagination(newsList.value).of(page,size)

    const normalizedTags = tags.map((t) => t.toLowerCase())
    return new Pagination(newsList.value.filter((n) =>
      n.tags.some((tag) => normalizedTags.includes(tag.toLowerCase())),
    )).of(page, size)
  }

  return {
    news: newsList,
    latest,
    count: newsCount,
    getById,
    filterByTags
  }
})
