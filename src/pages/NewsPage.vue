<template>
  <section class="hero-min">
    <p><router-link to="/home" class="discrete-link">Home</router-link> // News</p>
    <h2>Our Records</h2>

    <p>
      Production updates, announcements and internal studio notes, in the order in which they were
      broadcast.
    </p>
  </section>
  <section class="hero" style="background-color: var(--bg-panel-2)">
    <div class="hero-inner">
      <div>
        <span class="eyebrow featured-tag"> Current Transmition </span>
      </div>

      <AppLoader v-if="!cNews" label="// Retrieving the current transmission" />

      <template v-else>
        <div class="meta-container">
          <span>{{ date }}</span>
          <span class="dot"></span>
          <span class="tag">{{ cNews.tags[0] }}</span>
          <span class="dot"></span>
          <span>{{ cNews.readingTime }} minutes reading</span>
        </div>
        <h2>{{ cNews.title }}</h2>
        <div class="short-description">
          <p>{{ cNews.header }}</p>
        </div>
        <div v-html="cNews.htmlContent" class="article-text"></div>
        <p class="end-news">[ END OF // TRANSMITION ]</p>
      </template>
    </div>
  </section>
  <section class="hero" id="catalog">
    <div class="hero-inner">
      <p class="eyebrow">//Complete Files</p>
      <h2>All transmissions</h2>

      <div class="tags-container">
        <button
          class="btn"
          @click="filteredTags.clear()"
          :class="{ 'btn-solid': filteredTags.size === 0 }"
        >
          All
        </button>
        <button
          v-for="t in tagsStore.tags"
          :key="t"
          @click="toggleInFilter(t)"
          class="btn"
          :class="{ 'btn-solid': filteredTags.has(t) }"
        >
          {{ t }}
        </button>
      </div>
      <div class="catalog" id="catalog">
        <select @input="pagination.onPerPageChange">
          <option v-for="v in newsQuantity" :key="v" :value="v">
            {{ v }}
          </option>
        </select>
        <AppLoader v-if="newsState !== ResponseState.SUCCESS" label="// Retrieving the catalog" />
        <div v-else class="elements">
          <NewsCard
            v-for="n in pageDisplay"
            :class="{ active: currentId === n.id }"
            :news="n"
            :key="n.id"
          />
        </div>
        <CatalogPager
          :page="pagination.page.value"
          :pages-btns="pagination.pagesBtns.value"
          :previous-buttons="pagination.previousButtons.value"
          :next-buttons="pagination.nextButtons.value"
          :btn-display="pagination.btnDisplay"
          @page-change="pagination.setPage"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import NewsCard from '@/components/NewsCard.vue'
import AppLoader from '@components/AppLoader.vue'
import CatalogPager from '@components/CatalogPager.vue'
import { useNewsStore } from '@stores/news'
import { newsQuantity } from '@config/filters.config'
import { useRoute } from 'vue-router'
import { formatDate } from '@utils/functions'
import { computed, ref, watch, watchEffect } from 'vue'
import { useTagsStore } from '@stores/tags'
import { useCatalogPagination } from '@/composables/useCatalogPagination'
import { useRetriableRequest } from '@/composables/useRetriableRequest'
import { News } from '@/types/news'
import { ResponseState, isServerFault } from '@/api/axios'

const route = useRoute()
const tagsStore = useTagsStore()
const newsStore = useNewsStore()

const pagination = useCatalogPagination(newsQuantity[0])
const currentId = ref<string>('')
const filteredTags = ref(new Set<string>())
const pageDisplay = ref<News[]>([])

// Transmisión actual: mientras `cNews` siga en null el loader gira. Cualquier
// fallo reintenta solo; un 4xx (id inexistente) cae en la última transmisión.
const cNews = ref<News | null>(null)

const featured = useRetriableRequest(
  async (id: string) => {
    if (!id) return await newsStore.latest()

    try {
      return await newsStore.getById(id)
    } catch (e: unknown) {
      if (!isServerFault(e)) return await newsStore.latest()
      throw e
    }
  },
  {
    onStart: () => (cNews.value = null),
    onSuccess: (news) => (cNews.value = news),
  },
)

watch(
  () => route.params.id,
  (id) => {
    const targetId = Array.isArray(id) || !id || id.length <= 0 ? '' : id
    void featured.run(targetId)
  },
  { immediate: true },
)

watch(
  () => cNews.value,
  (currentNews) => (currentId.value = !currentNews ? '' : currentNews.id),
)

// Loader del catálogo: solo se pintan tarjetas cuando un intento termina en
// SUCCESS; mientras carga o reintenta, se pinta el loader, nunca la rejilla.
const { state: newsState, run: loadPage } = useRetriableRequest(
  (filters?: Record<string, any>) =>
    newsStore.getPage(
      {
        page: pagination.page.value,
        size: pagination.perPage.value,
      },
      filters,
    ),
  {
    onSuccess: (response) => {
      pageDisplay.value = response.page
      pagination.setTotal(response.total)
    },
    onError: () => {
      pageDisplay.value = []
      pagination.setTotal(0)
    },
  },
)

const date = computed(() => formatDate(cNews.value?.createdAt))

watchEffect(async () => await loadPage())

function toggleInFilter(t: string) {
  if (filteredTags.value.delete(t)) {
    pagination.resetPage()
    return
  }

  filteredTags.value.add(t)
  pagination.resetPage()
}
</script>

<style scoped>
.dot {
  width: 3px;
  height: 3px;

  background-color: var(--muted-dim);
  border-radius: 50%;
}
.news-card.active {
  border-color: var(--purple-dim);
}

.meta-container {
  display: flex;
  flex-direction: row;
  gap: 12px;
  color: var(--muted);
  font-size: 14px;
  font-family: var(--font-mono);

  align-items: center;
}

.short-description {
  border-left: 2px solid var(--purple);
  padding-left: 20px;
}
.short-description p {
  font-size: var(--fs-lg);
  font-family: var(--font-body);
  font-weight: 400;
  color: var(--text);
  max-width: 90ch;
}
.article-text {
  display: flex;
  flex-direction: column;

  gap: 20px;
}

.article-text:deep(*) {
  font-size: var(--fs-base);
  font-family: var(--font-mono);
  color: var(--text);
  font-weight: 400;
  max-width: 90ch;
}
.article-text :deep(h1),
.article-text :deep(h2),
.article-text :deep(h3),
.article-text :deep(h4),
.article-text :deep(h5),
.article-text :deep(h6) {
  font-family: inherit;
  font-size: 1.55rem;
  font-weight: 700;
  color: var(--muted-dim);
  max-width: 100%;
}

.article-text :deep(strong),
.article-text :deep(b) {
  font-weight: 900;
}
.article-text :deep(a) {
  text-decoration: underline;
  font-size: inherit;
  font-family: inherit;
  font-style: normal;
  color: var(--purple);
  font-weight: inherit;
}

.article-text :deep(a:hover) {
  font-style: italic;
  cursor: pointer;
}

.article-text :deep(> p:first-child::first-letter) {
  font-family: var(--font-body);
  font-size: 2.6em;
  font-weight: 700;
  color: var(--purple);
  float: left;
  line-height: 0.8;
  margin: 0.05em 0.08em 0 0;
}

.article-text :deep(ul),
.article-text :deep(ol) {
  padding-left: 1.8rem;
  max-width: inherit;
}

.article-text :deep(ul) {
  list-style: disc;
}

.article-text :deep(ol) {
  list-style: decimal;
}

.article-text :deep(li) {
  padding-left: 0.35rem;
  margin-bottom: 0.6rem;
  line-height: 1.6;
}

.article-text :deep(li::marker) {
  color: var(--purple);
  font-weight: 700;
}

.article-text :deep(li ul),
.article-text :deep(li ol) {
  margin-top: 0.6rem;
}

.article-text :deep(figure) {
  width: 100%;
  max-width: inherit;
  margin: 0;
  max-width: 74ch;
}

.article-text :deep(img) {
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
  object-fit: contain;
  border-radius: 8px;
}
.article-text :deep(figcaption) {
  margin-top: 8px;
  font-size: var(--fs-sm);
  color: var(--muted-dim);
  font-style: italic;
}

.end-news {
  color: var(--red);
  font-size: 12.5px;
  font-family: var(--font-mono);
  letter-spacing: 0.9;
}
</style>
