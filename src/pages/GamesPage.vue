<template>
    <section class="hero-min">
        <p><router-link to="/home" class="link">Home</router-link> // Catalog</p>
        <h2>What we have transmitted</h2>

        <p>Every project we are working on, from the first prototypes to the ones you can now play with.</p>
    </section>
    <section class="hero">
        <div class="hero-inner" style="background-color: var(--bg-panel-2);">
            <div>
                <span class="featured-tag">Game Of Month - {{ featuredDisplay }}</span>
            </div>
            <div class="month-container">
                <lite-youtube class="month-video" :videoid="gameStore.featured().trailer"></lite-youtube>
                <div class="v-container">
                    <h2>{{ gameStore.featured().title }}</h2>
                    <div class="tags-container">
                        <span v-for="tag in gameStore.featured().tags"
                        :key="tag"
                        class="tag">
                            {{ tag }}
                        </span>
                    </div>
                    <p>{{ gameStore.featured().short_description }}</p>
                    <div>
                        <router-link :to="`/game?id=${gameStore.featured().id}`" class="btn btn-solid">
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
                        v-model="searchQuery"
                        placeholder="Search by name..."
                    />
                    <button 
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
                @input="onSelectChange">
                    <option v-for="g_value in gamesQuantity"
                    :key="g_value"
                    :value="g_value">
                        {{ g_value }}
                    </option>
                </select>
                <div class="elements">
                    <GameCard v-for="game in filteredGames.result"
                    :key="game.id"
                    :game="game"
                    />
                </div>
                    
                <div v-if="pagesBtns > 0" class="pager">
                    <button @click="setPage(page - 1)"><</button>
                    <button v-if="previousButtons">...</button>
                    <button v-for="i in pagesBtns" 
                    :key="i"
                    :class="{ active: page === btnDisplay(i) }"
                    @click="setPage(i)">
                        {{ btnDisplay(i) }}
                    </button>
                    <button v-if="nextButtons">...</button>
                    <button @click="setPage(page + 1)">></button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import '@justinribeiro/lite-youtube';
import GameCard from '@components/GameCard.vue';
import { useGamesStore } from '@stores/games';
import { computed, ref, watch } from 'vue';
import { gamesQuantity } from '@config/filters.config';
import { clamp } from '@utils/functions';

const gameStore = useGamesStore();
const searchQuery = ref('');

const maxPageButtons = 4;
const page = ref(1);
const gamesPerPage = ref(gamesQuantity[0]);
const filteredGames = computed(() => gameStore.filterGamesByTitle(searchQuery.value, page.value, gamesPerPage.value));

const batch = computed(() => Math.ceil(page.value / maxPageButtons))
const totalPages = computed(() => Math.ceil(filteredGames.value.count / gamesPerPage.value));
const pagesBtns = computed(() => {
    const firstPage = (batch.value - 1) * maxPageButtons;

    const remainingPages = totalPages.value - firstPage;
    return clamp(remainingPages, 0, maxPageButtons);
});


function setPage(page_v) {
    page.value = clamp(page_v, 1, Math.max(totalPages.value, 1));
}

const btnDisplay = (i) => maxPageButtons * (batch.value - 1) + i;
const previousButtons = computed(() => page.value - maxPageButtons > 0)
const nextButtons = computed(() => {
    const maxInBatch = gamesPerPage.value * maxPageButtons
    return filteredGames.value.count > maxInBatch * batch.value
})

watch(searchQuery, () => {
    page.value = 1;
});

const onSelectChange = (e) => {
    gamesPerPage.value = parseInt(e.target.value);
    page.value = 1;
};

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
