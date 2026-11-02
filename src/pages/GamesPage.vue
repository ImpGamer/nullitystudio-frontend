<template>
    <section class="hero-min">
        <p><router-link to="/home" class="discrete-link">Home</router-link> // Catalog</p>
        <h2>What we have transmitted</h2>

        <p>Every project we are working on, from the first prototypes to the ones you can now play with.</p>
    </section>
    <section class="hero">
        <div class="hero-inner" style="background-color: var(--bg-panel-2);">
            <div>
                <span class="featured-tag">Game Of Month - {{ featuredDisplay }}</span>
            </div>

            <AppLoader
            v-if="!featuredGame"
            label="// Retrieving the featured game" />

            <div v-else class="month-container">
                <lite-youtube class="month-video" :videoid="featuredGame.trailer"></lite-youtube>
                <div class="v-container">
                    <h2>{{ featuredGame.title }}</h2>

                    <p>{{ featuredGame.description }}</p>
                    <div>
                      <router-link :to="`/game?id=${featuredGame.id}`" class="btn btn-solid">
                            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor"
                                stroke-width="2" aria-hidden="true">
                                <path d="M7 17L17 7M9 7h8v8" />
                            </svg>
                            See More
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="hero">
        <div class="hero-inner">
            <p class="eyebrow">//Complete catalog</p>
            <div class="space-between">
                <h2>Explore the files</h2>
                <div class="search-box">
                    <input
                        type="text"
                        id="searchInput"
                        v-model="titleFilter"
                        placeholder="Search by name..."
                        @keyup.enter="filterByTitle(titleFilter)"
                    />
                    <button @click="filterByTitle(titleFilter)" 
                    type="button" class="btn">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" aria-hidden="true">
                            <circle cx="11" cy="11" r="7" />
                            <path d="M21 21l-4.3-4.3" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="catalog" id="catalog">
                <select
                @input="pagination.onPerPageChange" :disabled="gamesState != ResponseState.SUCCESS">
                    <option v-for="g_value in gamesQuantity"
                    :key="g_value"
                    :value="g_value">
                        {{ g_value }}
                    </option>
                </select>

                <AppLoader
                v-if="gamesState != ResponseState.SUCCESS"
                label="// Retrieving the catalog" />
                <div v-else-if="pageDisplay.length === 0" class="load-error">
                    <p>No matches found with <i>'{{ appliedTitle }}'</i></p>
                </div>

                <div class="elements">
                    <GameCard v-for="game in pageDisplay"
                    :key="game.id"
                    :game="game"
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
import '@justinribeiro/lite-youtube';
import AppLoader from '@components/AppLoader.vue';
import CatalogPager from '@components/CatalogPager.vue';
import GameCard from '@components/GameCard.vue';
import { useGamesStore } from '@stores/games';
import { computed, ref, watchEffect, onMounted, watch } from 'vue';
import { gamesQuantity } from '@config/filters.config';
import { useCatalogPagination } from '@/composables/useCatalogPagination';
import { useRetriableRequest } from '@/composables/useRetriableRequest';
import type { Game } from '@types/game';
import { ResponseState } from '@/api/axios';

const gameStore = useGamesStore();

const titleFilter = ref('')
const appliedTitle = ref('')
const pagination = useCatalogPagination(gamesQuantity[0]);

const pageDisplay = ref<Game[]>([])
const featuredGame = ref<Game | null>(null)

// Destacado: mientras `featuredGame` siga en null el loader gira; si el
// servidor falla o no responde, reintenta solo cada pocos segundos.
const { run: loadFeatured } = useRetriableRequest(
    async () => {
        const featuredId = await gameStore.featured();
        return await gameStore.getById(featuredId);
    },
    {
        onSuccess: (fetched) => (featuredGame.value = fetched),
    },
)

// Mientras no haya respuesta solo se pinta el loader, nunca la tarjetas
// a medias o la rejilla vacía. Un fallo reintenta solo.
const { state: gamesState, run: loadPage } = useRetriableRequest(
    (filters?: Record<string, any>) =>
        gameStore.getPage(
            {
                page: pagination.page.value,
                size: pagination.perPage.value,
            },
            filters
        ),
    {
        onSuccess: (response) => {
            pagination.setTotal(response.total)
            pageDisplay.value = response.page;
        },
        onError: () => {
            pagination.setTotal(0)
            pageDisplay.value = []
        },
    },
)

const hasChangeQuery = computed(() => titleFilter.value.toLowerCase() !== appliedTitle.value.toLowerCase())
onMounted(() => void loadFeatured())

// Único punto de carga del catálogo: page, perPage y el filtro de título
// son sus dependencias, así que el watchEffect se re-ejecuta solo.
watchEffect(async () => await loadPage())

async function filterByTitle(title: string): Promise<void> {
    if (gamesState.value == ResponseState.LOADING) return;
    if (title.length <= 0) return;
    if (!hasChangeQuery.value) return;

    appliedTitle.value = title
    pagination.resetPage()
    await loadPage({ title });
}

watch(titleFilter, async (value) => {
    if (gamesState.value == ResponseState.LOADING) return;
    if (value.length > 0) return;

    appliedTitle.value = ''
    pagination.resetPage()
    await loadPage();
})

const featuredDisplay = computed(() => {
    const d = new Date();
    
    return new Intl.DateTimeFormat('en', {
        day: undefined,
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
    }).format(d)
})

</script>
<style scoped>
.month-video {
    width: 100%;
    aspect-ratio: 16 / 9;
    border: 1px solid var(--line);
}

.month-container {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(420px, 820px) 1fr;
    justify-content: space-between;

    gap: 44px;
}

.search-box {
    display: flex;
    align-items: stretch;
    flex-direction: row;
}

.month-container h2 {
    font-family: var(--font-display);
    font-weight: 300;
    font-size: 2.3rem;
}

.month-container p {
    max-width: 50ch;
}

.featured-tag::before {
    content: "★";
    font-size: 10px;
}

.load-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;

    width: 100%;
    padding: clamp(36px, 6vw, 72px) 20px;
    text-align: center;
}

.load-error p {
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: var(--fs-lg);
    letter-spacing: 0.16em;
}
.load-error i {
    color: var(--red);
}


@media (width < 1110px) {
    .month-container {
        grid-template-columns: 1fr;
    }
    .month-video {
        order: 2;
    }
    .month-container > .v-container {
        order: 1;
    }
}
</style>
