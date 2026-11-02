import { computed, ref, watch } from 'vue'
import { clamp } from '@utils/functions'

export function useCatalogPagination(
  initalPerPage: number,
  options: { maxPageButtons?: number } = {},
) {
  const maxPageButtons = options.maxPageButtons ?? 4
  const page = ref(1)
  const perPage = ref(initalPerPage)
  const totalItems = ref(0)

  const totalPages = computed(() => Math.ceil(totalItems.value / perPage.value))
  const batch = computed(() => Math.ceil(page.value / maxPageButtons))
  const pagesBtns = computed(() => {
    const firstPage = (batch.value - 1) * maxPageButtons
    const remainingPages = totalPages.value - firstPage

    return clamp(remainingPages, 0, maxPageButtons)
  })
  const previousButtons = computed(() => page.value - maxPageButtons > 0)
  const nextButtons = computed(() => {
    const maxInBatch = perPage.value * maxPageButtons
    return totalItems.value > maxInBatch * batch.value
  })

  function btnDisplay(index: number): number {
    return maxPageButtons * (batch.value - 1) + index
  }

  function setPage(nextPage: number): void {
    page.value = clamp(nextPage, 1, Math.max(totalPages.value, 1))
  }

  function setPerPage(nextPerPage: number): void {
    perPage.value = nextPerPage
    page.value = 1
  }

  function onPerPageChange(event: Event): void {
    const target = event.target as HTMLSelectElement
    setPerPage(Number(target.value))
  }

  function setTotal(nextTotal: number): void {
    totalItems.value = nextTotal
  }

  function resetPage(): void {
    page.value = 1
  }

  watch(totalPages, () => {
    setPage(page.value)
  })

  return {
    page,
    perPage,
    totalItems,
    pagesBtns,
    previousButtons,
    nextButtons,
    btnDisplay,
    setPage,
    setPerPage,
    onPerPageChange,
    setTotal,
    resetPage,
  }
}
