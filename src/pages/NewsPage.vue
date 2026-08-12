<template>
    <section class="hero-min">
        <p><router-link to="/home" class="link">Home</router-link> // News</p>
        <h2>Our Records</h2>

        <p>Production updates, announcements and internal studio notes, in the order in which they were broadcast.</p>
    </section>
    <section class="hero" style="background-color: var(--bg-panel-2);">
        <div class="hero-inner">
            <div>
                <span class="eyebrow featured-tag">
                    Current Transmition
                </span>
            </div>
            <div class="meta-container">
                <span>{{ date }}</span>
                <span class="dot"></span>
                <span class="tag">{{ cNews.tags[0] }}</span>
                <span class="dot"></span>
                <span>{{ cNews.rTime }} minute reading</span>
            </div>
            <h2>{{ cNews.title }}</h2>
            <div class="short-description">
                <p>{{ cNews.header }}</p>
            </div>
            <div class="article-text">
                <p v-for="p in parrafs"
                :key="p">
                    {{ p }}
                </p>
            </div>
            <p class="end-news">
                [ END OF // TRANSMITION ]
            </p>
        </div>
    </section>
    <section class="hero" id="catalog">
        <div class="hero-inner">
            <p class="eyebrow">//Complete Files</p>
            <h2>All transmissions</h2>

            <div class="tags-container">
                <button class="btn"
                @click="filteredTags.clear()"
                :class="{ 'btn-solid': filteredTags.size === 0 }">
                    All
                </button>
                <button v-for="t in tagsStore.tags"
                @click="toggleInFilter(t)"
                class="btn" 
                :class="{ 'btn-solid': filteredTags.has(t) }">
                    {{ t }}
                </button>
            </div>
            <div class="catalog" id="catalog">
                <select>
                    <option v-for="v in newsQuantity"
                    :value="v">
                    {{ v }}
                    </option>
                </select>
                <div class="elements">
                    <NewsCard v-for="n in filteredNews"
                    :class="{ active: newsId === n.id }"
                    :news="n"
                    :key="n.id"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import NewsCard from '@/components/NewsCard.vue';
import { useNewsStore } from '@stores/news';
import { newsQuantity } from '@config/filters.config'
import { useRoute } from 'vue-router';
import { byParrafs, formatDate } from '@utils/functions';
import { computed, ref } from 'vue';
import { useTagsStore } from '@stores/tags';

const newsStore = useNewsStore();
const tagsStore = useTagsStore();
const route = useRoute()

const filteredTags = ref(new Set<string>())
const newsId = computed(() => Number(route.params.id))
const cNews = computed(() => newsStore.getById(newsId.value))

const filteredNews = computed(() => newsStore.filterByTags(
    Array.from(filteredTags.value),
    1,
    10
))

const parrafs = computed(() => byParrafs(cNews.value.text, 30))
const date = computed(() => formatDate(cNews.value.date))

function toggleInFilter(t: string) {
    if(filteredTags.value.delete(t)) return;

    filteredTags.value.add(t);
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

.article-text p {
    font-size: var(--fs-base);
    max-width: 74ch;
}

.article-text p:first-of-type::first-letter {
    font-family: var(--font-body);
    font-size:2.6em;
    font-weight:700;
    color:var(--purple);
    float:left;
    line-height:.8;
    margin:.05em .08em 0 0;
}

.end-news {
    color: var(--red);
    font-size: 12.5px;
    font-family: var(--font-mono);
    letter-spacing: 0.9;
}
</style>