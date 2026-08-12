<template>
    <router-link 
    class="game-card" 
    :to="`/game?id=${props.game.id}`">
        <div v-if="props.game" class="game-art">
            <img :src="props.game.cover" />
            <span class="game-status">{{ statusInfo.name }}</span>
        </div>
        <div v-else class="game-art">
            <canvas ref="canvasRef"></canvas>
            <span class="game-status">{{ statusInfo.name }}</span>
            <span class="mark">[N]</span>
        </div>
        <div class="body-card">
            <div class="tags-container">
                <span v-for="t in props.game.tags" class="tag">{{ t }}</span>
            </div>
            <h3>{{ props.game.title }}</h3>
            <p>{{ props.game.description }}</p>
        </div>
    </router-link>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { getStatusInfo } from '@config/gameStatus';
import type { Game, GameStatusInfo } from '@utils/interfaces';

const props = defineProps<{
    game: Game
}>()

const statusInfo: GameStatusInfo = getStatusInfo(props.game.status);
const canvasRef = ref<HTMLCanvasElement | null>(null);
let rafId:number = 0;
let lastPaint = 0;

function paintNoise(canvas: HTMLCanvasElement | null) {
    if(!canvas) {
        console.error('Canvas element is not available on gameCard');
        return;
    }

    const ctx = canvas.getContext('2d');
    if(!ctx) return;
    const w = canvas.width, h = canvas.height;
    const imageData = ctx.createImageData(w, h);
    const c = [192, 57, 249];

    for (let i = 0; i < imageData.data.length; i += 4) {
        const v = Math.random() * 22;
        const bias = Math.random() < 0.02 ? 1 : 0.12;
        imageData.data[i] = 10 + v * 0.3 + c[0] * bias;
        imageData.data[i + 1] = 10 + v * 0.3 + c[1] * bias;
        imageData.data[i + 2] = 14 + v * 0.3 + c[2] * bias;
        imageData.data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
}

function loop(timestamp:number) {
    if (timestamp - lastPaint > 220) {
        paintNoise(canvasRef.value);
        lastPaint = timestamp;
    }
    rafId = requestAnimationFrame(loop);
}

onMounted(() => {
    if (!canvasRef.value) return;

    paintNoise(canvasRef.value);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(loop);
    }
});

onUnmounted(() => {
    if (rafId) cancelAnimationFrame(rafId);
});
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
    border-color: v-bind('statusInfo.color');
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
    line-height: 0.9;
}
.body-card p {
    line-clamp: 3;
    -webkit-box-orient: vertical;

    font-size: 11.5px;
    font-family: var(--font-mono);
    color: var(--muted);
    letter-spacing: 0.98;
    line-height: 0.97;
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
    border: 1px solid v-bind('statusInfo.color');
    color: v-bind('statusInfo.color');
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
