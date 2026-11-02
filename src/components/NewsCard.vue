<template>
    <div class="news-card">
        <div class="news-meta">
            <span>{{ date }}</span>
            <div>
                <span v-for="t in cutTags"
                class="tag">
                    {{ t }}
                </span>
            </div>
        </div>
        <h3>{{ news.title }}</h3>
        <p>{{ news.previewText }}</p>
        <router-link :to="{
            name: 'news-detail',
            params: {
                id: news.id
            }
        }" 
        class="discrete-link">Read Note →</router-link>
    </div>
</template>

<script setup lang="ts">
import { News } from '@/types/news';
import { formatDate } from '@utils/functions';
import { computed } from 'vue';

const props = defineProps<{
    news: News
}>()

const date = computed(() => formatDate(props.news.createdAt))
const cutTags = computed(() => props.news.tags.slice(0, 3))
</script>

<style scoped>
.news-card {
    background: var(--bg);
    border: 1px solid var(--line);
    padding: 26px 24px;
    display: flex;
    flex-direction: column;
    gap: 17px;
    justify-content: space-between;
    width: 100%;
    transition: border-color .25s ease, transform .25s ease;
}

.news-card:hover {
    border-color: var(--purple-dim);
    transform: translateY(-3px);
}

.news-card h3 {
    font-family: var(--font-display);
    font-size: var(--fs-lg);
    font-weight: 600;
    line-height: 1.25;
}

.news-card p {
    color: var(--muted);
    font-size: 13.5px;
}

.news-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--muted-dim);
    letter-spacing: .05em;
}
</style>