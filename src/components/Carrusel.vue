<template>
    <div class="carrusel">
        <div class="elements" ref="elementsRef">
            <GameCard 
            v-for="g in games.slice(indexElements)"
            :key="g.id"
            :game="g"/>
        </div>
        <div class="buttons">
            <button class="button" @click="move(-props.indexStep)" aria-label="Previous"><</button>
            <button class="button" @click="move(props.indexStep)" aria-label="Next">></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Game } from '@utils/interfaces';
import type { PropType } from 'vue';
import { ref } from 'vue';
import GameCard from '@components/GameCard.vue';
import { clamp } from '@utils/functions';

const props = defineProps({
    games: {
        type: Array as PropType<Game[]>,
        required: true
    },
    indexStep: {
        type: Number,
        default: 1
    }
})
const indexElements = ref(0);

function move(step:number) {
    indexElements.value = clamp(indexElements.value + step, 0, props.games.length - 1);
}
</script>

<style scoped>
.carrusel {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.elements {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: clamp(360px, 26vw, 420px);
    align-items: start;
    gap: 32px;
    width: max-content;
    min-width: 0;

    overflow-x: auto;
    overflow-y: hidden;
    padding-top: 8px;
    scrollbar-width: none;
}
.buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;

    padding: 18px 32px;
    gap: 16px;
    background-color: var(--bg-panel-2);
}
.button {
    background-color: transparent;
    width: 36px;
    height: 36px;
    padding: 10px;
    border: 2px solid var(--line);
    border-radius: 50%;
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    transition: color .2s ease;
}
.button:hover {
    border-color: var(--purple);
    color: var(--purple);
}
</style>