<template>
  <!-- La información todavía no llegó: solo el loader -->
  <template v-if="!game">
    <section class="hero-min">
      <p>
        <router-link to="/home" class="discrete-link">Home</router-link>
        //
        <router-link to="/games" class="discrete-link">Games</router-link>
      </p>
      <AppLoader label="// Fetching the game files" />
    </section>
  </template>

  <!-- Información disponible: se muestra la ficha completa -->
  <template v-else>
    <section class="hero-min">
      <p>
        <router-link to="/home" class="discrete-link">Home</router-link>
        //
        <router-link to="/games" class="discrete-link">Games</router-link>
        // {{ game.title }}
      </p>
      <div>
        <span class="status-badge">{{ game.status.name }}</span>
      </div>
      <h2>{{ game.title }}</h2>
      <p>
        {{ game.shortDescription }}
      </p>
      <div class="tags-container">
        <span v-for="t in game.tags"
        :key="t"
        class="tag">
          {{ t }}
        </span>
      </div>
    </section>
    <section class="gd-trailer">
      <lite-youtube :videoid="game.trailer" class="trailer"></lite-youtube>
    </section>
    <section class="hero">
      <div class="hero-inner">
        <div class="gd-grid">
          <div class="v-container">
            <p class="eyebrow">// About the game</p>
            <p v-for="p in gameDescription"
            :key="p">
              {{ p }}
            </p>
            <br />
            <p class="eyebrow">// History</p>
            <h2>{{ game.history.title }}</h2>
            <p v-for="p in gameHistory"
            :key="p">
              {{ p }}
            </p>

            <br/>
            <div v-if="gallery.length > 0" class="v-container">
              <p class="eyebrow">// Gallery</p>
              <div class="gd-gallery">
                <img v-for="img, i in gallery"
                :key="i"
                :src="img"
                @click="onImgClick(i)"/>
              </div>
            </div>
          </div>
          <aside class="gd-sidebar">
            <div class="sidebar-element">
              <span>Status</span>
              <p>{{ game.status.name }}</p>
            </div>
            <div class="sidebar-element">
              <span>Release Date</span>
              <p>{{ date }}</p>
            </div>
            <div class="sidebar-element">
              <span>Available on</span>
              <div v-for="store in game.stores" :key="store.id"
              class="space-between">
                <div class="tags-container">
                  <component :is="getIconPlatform(store.id)"/>
                  <p>{{ store.name }}</p>
                </div>
                <a class="discrete-link" :href="store.link" target="blank">
                  <IconExternalLink stroke="2"/>
                </a>
              </div>
            </div>
            <div class="sidebar-element">
              <span>Platforms</span>
              <div v-for="p in game.platforms"
              :key="p.id"
              class="tags-container">
                <component :is="getIconPlatform(p.id)" stroke="2"/>
                <p>{{ p.name }}</p>
              </div>
            </div>
            <div class="sidebar-element">
              <span>Tags</span>
              <div class="tags-container">
                <span v-for="t in game.tags.slice(0, 3)"
                :key="t"
                class="tag">
                {{ t }}
                </span>
              </div>
            </div>
            <div class="sidebar-element">
              <span>Developer / Editor</span>
              <p>{{ game.studio }}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <div class="lightbox no-display" ref="lightbox">
      <div class="lightbox-frame">
        <img :src="showImage" />
        <button class="lightbox-close close-btn" @click="toggleLightBox" aria-label="Close">✕</button>
        <button @click="setImage(indexImage - 1)" class="lightbox-nav lightbox-prev" aria-label="Previous"><</button>
        <button @click="setImage(indexImage + 1)" class="lightbox-nav lightbox-next" aria-label="NextS">></button>
        <span class="lightbox-counter">{{ counterNavigator }}</span>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import '@justinribeiro/lite-youtube'
import { IconExternalLink } from '@tabler/icons-vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { clamp, formatDate, byParrafs } from '@utils/functions'
import { useGamesStore } from '@stores/games'
import { getIconPlatform } from '@config/platforms.config'
import AppLoader from '@components/AppLoader.vue'
import type { Game } from '@/types/game'
import { errorRedirection } from '@/router/index'
import { useRetriableRequest } from '@/composables/useRetriableRequest'
import { isServerFault } from '@/api/axios'
import axios from 'axios'

const gameStore = useGamesStore();
const route = useRoute()

const game = ref<Game | null>(null)

// Mientras `game` siga en null el loader gira. Un fallo de servidor o de
// conexión reintenta solo; un 4xx (id inválido o inexistente) no se
// reintenta y va a la pantalla de error, que es la respuesta definitiva.
const { run: loadGame } = useRetriableRequest(
  (id: string) => gameStore.getById(id),
  {
    shouldRetry: () => false,
    onSuccess: (fetched) => (game.value = fetched),
    onError: (e) => {
      if (isServerFault(e) || !axios.isAxiosError(e)) return

      const status = e.response?.status ?? 400
      const message = e.response?.data?.message ?? `Unable to retrieve the game`

      errorRedirection(status, message)
    },
  },
)

onMounted(() => {
  const gameId = route.query.id;
  if(!gameId) {
    errorRedirection(400, `No ID param set on path`)
    return
  }

  void loadGame(String(gameId))
})

// Ningún computed toca `game` sin red: si no hay datos, devuelven vacío.
const gallery = computed(() => game.value?.gallery ?? [])

const gameHistory = computed(() => byParrafs(game.value?.history?.description ?? '', 30));
const gameDescription = computed(() => byParrafs(game.value?.description ?? '', 30));
const date = computed(() => formatDate(game.value?.date));

const lightbox = ref<HTMLElement | null>(null)

const indexImage = ref(0)
const showImage = computed(() => gallery.value[indexImage.value] ?? '')
const counterNavigator = computed(() => `${indexImage.value + 1} / ${gallery.value.length}`)

function setImage(i: number) {
  indexImage.value = clamp(
    i, 
    0, 
    Math.max(gallery.value.length - 1, 0))
}

function onImgClick(index: number): void {
    toggleLightBox()
    setImage(index)
}

function toggleLightBox(): void {
    lightbox.value?.classList.toggle('no-display')
}
</script>

<style scoped>
.gd-trailer {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  border-bottom: 1px solid var(--line);
  box-sizing: border-box;
}

.trailer {
  width: min(100%, 1280px);
  aspect-ratio: 21 / 9;
  height: auto;

  border: 1px solid var(--line);
}

.gd-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  align-items: start;
  width: 100%;
}

.gd-grid p {
  max-width: 70ch;
}

.gd-grid h2 {
  font-size: clamp(30px, 100vw, 44px);
}

.gd-sidebar {
  position: sticky;
  top: 96px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 28px 26px;

  background: var(--bg-panel);
  border: 1px solid var(--line);
}

.sidebar-element {
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line);
}

.sidebar-element span {
  font-family: var(--font-mono);
  font-weight: 200;
  font-size: 12.5px;
  color: var(--muted);
}

.sidebar-element p {
  font-family: var(--font-mono);
  font-weight: 300;
  color: var(--text);
}

.status-badge {
  display: inline-flex;
  font-size: 12px;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: v-bind('game?.status.color');
  border: 1px solid v-bind('game?.status.color');
  padding: 6px 12px;
  align-items: center;
  gap: 8px;
}

.gd-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;

  max-width: calc(280px * 3 + 14px * 2);
}

.gd-gallery img {
  width: 100%;
  aspect-ratio: 4/3;
  border: 1px solid var(--line);
  background: var(--bg-panel);

  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.gd-gallery img:hover {
  transform: scale(1.06);
  cursor: pointer;
}

.status-badge::before {
  content: '●';
  font-size: 9px;
  animation: pulse-dot 1.6s ease-in-out infinite;
}

.lightbox {
  position: fixed;
  background: var(--bg-box);
  z-index: 1000;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lightbox-frame {
  position: relative;
  width: min(1000px, 100%);
  aspect-ratio: 16/9;
  border: 1px solid var(--line);
}
.lightbox-frame img {
  width: 100%;
  height: 100%;
  display: block;
}
.lightbox-close {
  position: absolute;
  top: -46px;
  right: 0;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: rgba(8, 8, 11, 0.7);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
}
.lightbox-nav:hover {
  border-color: var(--purple);
  color: var(--purple);
}
.lightbox-prev{left:-58px;}
.lightbox-next{right: -58px;}
.lightbox-counter {
    position: absolute;
    left: 8px;
    bottom: 0;
    font-size: var(--fs-sm);
    color: var(--muted);
    font-family: var(--font-mono);
}

@media (width < 1110px) {
  .gd-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .gd-sidebar {
    position: static;
    order: -1;
    width: 100%;
  }
  .lightbox-prev{left: 8px;}
  .lightbox-next{right: 8px;}
}
</style>
