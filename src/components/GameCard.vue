<template>
    <router-link 
    class="game-card" 
    :to="`/game?id=${props.game.id}`">
        <div class="game-art">
            <img :src="props.game.cover" />
            <span class="game-status">{{ props.game.status.name }}</span>
        </div>
        <div class="body-card">
            <div class="tags-container">
                <span v-for="t in showedTags" class="tag">{{ t }}</span>
            </div>
            <h3>{{ props.game.title }}</h3>
            <p>{{ props.game.shortDescription }}</p>
        </div>
    </router-link>
</template>

<script setup lang="ts">
import type { Game } from '@/types/game';
import { computed } from 'vue';

const props = defineProps<{
    game: Game
}>()

const showedTags = computed(() => props.game.tags.slice(0,4))
</script>

<style scoped>

.game-card {
    background: var(--bg-panel);
    border: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    scroll-snap-align: start;
    transition: border-color .25s ease, transform .25s ease;
}

.game-card:hover {
    border-color: v-bind('props.game.status.color');
    transform: translateY(-3px);
    cursor: pointer;
}

.game-art {
    aspect-ratio: 16/9;
    width: 100%;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid var(--line);
}
.body-card {
    padding: 20px 25px;
    display: flex;
    flex-direction: column;

    gap: 16px;
}

.body-card h3 {
    font-family: var(--font-display);
    font-weight: 500;
    font-size: 1.5em;
    letter-spacing: 1.1;
    line-height: 1.1;
}
.body-card p {
    line-clamp: 3;
    -webkit-box-orient: vertical;

    font-size: 11.5px;
    font-family: var(--font-mono);
    color: var(--muted);
    letter-spacing: 0.98;
    line-height: 1.5;
}
.game-art canvas,
.game-art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.game-status {
    position: absolute;
    top: 14px;
    left: 14px;
    font-family: var(--font-mono);
    font-size: 10.5px;
    letter-spacing: .1em;
    text-transform: uppercase;
    padding: 5px 9px;
    background: rgba(8, 8, 11, .8);
    border: 1px solid v-bind('props.game.status.color');
    color: v-bind('props.game.status.color');
}

.mark {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(26px, 3vw, 40px);
    letter-spacing: .04em;
    color: var(--purple);
    text-shadow: 0 0 30px rgba(0, 0, 0, .8);
    mix-blend-mode: screen;
}
</style>
