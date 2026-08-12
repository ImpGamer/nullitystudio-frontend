<template>
  <section class="hero-min">
    <p>
      <router-link to="/home" class="link">Home</router-link>
      //
      <router-link to="/games" class="link">Games</router-link>
      // {{ game.title }}
    </p>
    <div>
      <span class="status-badge">{{ statusDsply.name }}</span>
    </div>
    <h2>{{ game.title }}</h2>
    <p>
      {{ game.short_description }}
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
          <p v-for="p in gameDescription">
            {{ p }}
          </p>
          <br />
          <p class="eyebrow">// History</p>
          <h2>{{ game.history.title }}</h2>
          <p v-for="p in gameHistory">
            {{ p }}
          </p>

          <br/>
          <div v-if="game.gallery.length > 0" class="v-container">
            <p class="eyebrow">// Gallery</p>
            <div class="gd-gallery">
              <img v-for="img, i in game.gallery" 
              :src="img" 
              @click="onImgClick(i)"/>
            </div>
          </div>
        </div>
        <aside class="gd-sidebar">
          <div class="sidebar-element">
            <span>Status</span>
            <p>{{ statusDsply.name }}</p>
          </div>
          <div class="sidebar-element">
            <span>Release Date</span>
            <p>{{ date }}</p>
          </div>
          <div class="sidebar-element">
            <span>Available on</span>
            <div v-for="[p, link] in Object.entries(game.links)"
            class="space-between">
              <div class="tags-container">
                <component :is="getIconPlatform(p)"/>
                <p>{{ p.replace(/[-_]/g, ' ') }}</p>
              </div>
              <a class="link" :href="link" target="blank">
                <IconExternalLink stroke="2"/>
              </a>
            </div>
          </div>
          <div class="sidebar-element">
            <span>Platforms</span>
            <div v-for="p in game.platforms"
            class="tags-container">
              <component :is="getIconPlatform(p)" stroke="2"/>

              <p>{{ p }}</p>
            </div>
          </div>
          <div class="sidebar-element">
            <span>Tags</span>
            <div class="tags-container">
              <span v-for="t in game.tags.slice(0, 3)"
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

<script setup lang="ts">
import '@justinribeiro/lite-youtube'
import { IconExternalLink } from '@tabler/icons-vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { clamp, formatDate, byParrafs } from '@utils/functions'
import { useGamesStore } from '@stores/games'
import { getStatusInfo } from '@config/gameStatus'
import { getIconPlatform } from '@config/platforms.config'

const gameStore = useGamesStore();
const route = useRoute();

const gameId: number = Number(route.query.id)
const game = gameStore.getGameById(gameId)!;

const statusDsply = getStatusInfo(game.status);

const gameHistory = computed(() => byParrafs(game.history.description, 30));
const gameDescription = computed(() => byParrafs(game.description, 30))
const date = computed(() => formatDate(game.date))

const lightbox = ref<HTMLElement | null>(null)
  
const indexImage = ref(0)
const showImage = computed(() => game.gallery[indexImage.value])
const counterNavigator = computed(() => `${indexImage.value + 1} / ${game.gallery.length}`)

function setImage(i: number) {
  indexImage.value = clamp(
    i, 
    0, 
    game.gallery.length - 1)
}

function onImgClick(index: number): void {
    toggleLightBox()
    setImage(index)
}

function toggleLightBox(): void {
    lightbox.value?.classList.toggle('no-display')
}
</script>

<style scope>
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
  color: v-bind('statusDsply.color');
  border: 1px solid v-bind('statusDsply.color');
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
