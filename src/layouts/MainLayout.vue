<script setup lang="ts">
import { IconMenu2 } from '@tabler/icons-vue';
import Logo from '@components/Logo.vue';
import { ref, computed, onMounted } from 'vue';
import { formatNumber } from '@utils/functions';
import { useRetriableRequest } from '@/composables/useRetriableRequest';
import { useConfigStore } from '@/stores/config';
import type { SocialAccount } from '@/types/config';
import { getIconPlatform } from '@/config/platforms.config';

const mobileNav = ref<HTMLElement | null>(null)
function toggleMobileNav() {
    mobileNav.value?.classList.toggle('no-display')
}
const configStore = useConfigStore()

const socials = ref<SocialAccount[]>([]);
const { run: loadSocials } = useRetriableRequest(
    () => configStore.get('socials'),
    {
        onSuccess: (response) => socials.value = response.accounts
    }
)
onMounted(async () => void loadSocials());

const year = computed(() => new Date().getFullYear())
const navElements = [
    {
        name: 'Home',
        path: '/home',
        hash: 'home'
    },
    {
        name: 'Games',
        path: '/games',
        hash: 'catalog'
    },
    {
        name: 'News',
        path: '/news',
        hash: 'catalog'
    },
    {
        name: 'About Us',
        path: '/home',
        hash: 'about-us'
    }
]
const contactLink = {
    name: 'Contact Us',
    path: '/home',
    hash: 'contact'
}
const completeElements = [
    ...navElements,
    contactLink
]

</script>

<template>
    <div class="crt-overlay" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
    </div>
    <div class="scanlines" aria-hidden="true"></div>
    <div class="vignette" aria-hidden="true"></div>
    <div class="mobile-menu no-display" ref="mobileNav">
        <div class="space-between">
            <Logo/>
            <button @click="toggleMobileNav" class="close-btn">x</button>
        </div>
        <div class="h-space-b">
            <div class="mobile-nav">
                <router-link v-for="e, i in completeElements" 
                :to="{ path: e.path, hash: `#${e.hash}` }"
                class="locked-hover"
                @click="toggleMobileNav">
                    <span>{{ formatNumber(i+1) }}</span>
                    <p>{{ e.name }}</p>
                </router-link>
            </div>
            <div>
                <div class="space-between">
                    <p class="eyebrow"> CH 00 - Menu</p>
                    <div class="social-container">
                        <a v-for="social in socials" 
                        :key="social.key"
                        class="locked-hover"
                        :style="{ '--social-color': social.color }"
                        :href="social.url"
                        target="_blank"
                        :title="social.name">
                            <span class="social-icon">
                                <span class="social-glow" aria-hidden="true"></span>
                                <component :is="getIconPlatform(social.key)"
                                stroke="2"/>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <header>
        <nav>
            <Logo/>
            <div class="tags-container">
                <router-link v-for="e in navElements"
                    :to="{ path: e.path, hash: `#${e.hash}`}"
                    class="locked-hover">
                    {{ e.name }}
                </router-link>
            </div>
            <router-link class="btn btn-solid" 
            :to="{ path: contactLink.path, hash: `#${contactLink.hash}` }">
                {{ contactLink.name }}
            </router-link>
            <div class="burger-btn" @click="toggleMobileNav">
                <IconMenu2 stroke="2"/>
            </div>
        </nav>
    </header>
    <main>
        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
    </main>

    <footer>
        <div class="footer-container">
            <div class="footer-top">
                <Logo/>
                <div class="social-container">
                    <a v-for="social in socials" 
                        :key="social.key"
                        class="locked-hover"
                        :style="{ '--social-color': social.color }"
                        :href="social.url"
                        target="_blank"
                        :title="social.name">
                            <span class="social-icon">
                                <span class="social-glow" aria-hidden="true"></span>
                                <component :is="getIconPlatform(social.key)"
                                stroke="2"/>
                            </span>
                        </a>
                </div>
            </div>
            <div class="footer-bottom">
                <span>© {{ year }} Nullity Studio. All Rights reserved.</span>
                <span class="no-signal">[ NO SIGNAL // END OF TRANSMISSION ]</span>
            </div>
        </div>
    </footer>
</template>

<style scoped>
nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 10vw;
    margin: 0 auto;
}

footer {
    border-top: 1px solid var(--line);
    min-height: 180px;
    padding: 0 15vw;
    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
}

.footer-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
}

footer hr {
    color: var(--line);
}

.footer-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 0 10px;
}

.footer-bottom {
    border-top: 1px solid var(--line);
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--muted-dim);
    letter-spacing: .04em;
    padding-top: 8px;
}
.footer-bottom > :not(:first-child) {
    text-align: end;
}

header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(8, 8, 11, .78);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--line);
}

.crt-overlay {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 999;
    mix-blend-mode: overlay;
    opacity: .5;
}

.crt-overlay svg {
    width: 100%;
    height: 100%;
}

.scanlines {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 998;
    background: repeating-linear-gradient(to bottom,
            rgba(255, 255, 255, 0.035) 0px,
            rgba(255, 255, 255, 0.035) 1px,
            transparent 1px,
            transparent 3px);
    animation: scan-drift 9s linear infinite;
}

@keyframes scan-drift {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 0 120px;
    }
}

.vignette {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 997;
    box-shadow: inset 0 0 18vw 30px black;
}

@media (prefers-reduced-motion: reduce) {
    .scanlines {
        animation: none;
    }

    * {
        animation-duration: .001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: .001ms !important;
    }
}

.burger-btn {
    display: none;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 38px;
    border: 2px solid var(--muted);
    color: white;
    cursor: pointer;
}
.burger-btn:hover {
    color: var(--purple);
    border-color: var(--purple);
}
.mobile-menu {
    position: fixed;
    inset: 0;
    background-color: var(--bg-box);
    z-index: 999;
    overflow-y: scroll;
}

.h-space-b {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100%;
}
.mobile-menu > :first-child {
    border-bottom: 1px solid var(--muted-dim);
}
.mobile-menu > * {
    padding: 25px 35px;
    width: 100%;
}
.mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.mobile-nav > a {
    display: flex;
    flex-direction: row;
    gap: 14px;
    align-items: baseline;
    justify-content: start;
    padding: 20px 15px;
    border-bottom: 1px solid var(--muted-dim);
    width: 100%;
    cursor: pointer;
}
.mobile-nav p {
    color: var(--text);
    font-size: 1.925rem;
    font-family: var(--font-display);
}
.mobile-nav span {
    color: var(--muted);
    font-size: var(--fs-sm);
    font-family: var(--font-mono);
}
.locked-hover {
    transition: color .2s ease;
    cursor: pointer;
}
.locked-hover:hover,
.locked-hover:hover * {
    color: var(--purple);
}
.locked-hover::before {
    content: "[";
    opacity: 0;
    transition: opacity .15s, margin .15s ease;
    margin-right: 0;
    color: var(--purple);
}
.locked-hover::after {
    content: "]";
    opacity: 0;
    transition: opacity .15s, margin .15s ease;
    margin-left: 0;
    color: var(--purple);
}
.locked-hover:hover::before {
    opacity: 1;
    margin-right: 4px;
}
.locked-hover:hover::after {
    opacity: 1;
    margin-left: 4px;
}

.tags-container > a {
    padding: 9px 14px;
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: var(--fs-lg);
    letter-spacing: .06em;
    position: relative;
}
.social-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 14px;
}

.social-container > .locked-hover {
    --social-color: var(--purple);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    transition: color .2s ease;
}

.social-icon {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    isolation: isolate;
}

/* Halo diagonal hacia la derecha: 70% del icono con el color de la red. */
.social-glow {
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(
        135deg,
        color-mix(in srgb, var(--social-color) 70%, transparent) 0%,
        color-mix(in srgb, var(--social-color) 70%, transparent) 70%,
        transparent 100%
    );
    filter: blur(5px);
    opacity: 0;
    transform: translateX(-12%) skewY(-6deg) scale(.95);
    transition: opacity .22s ease, transform .22s ease;
    pointer-events: none;
}

.social-container > .locked-hover:hover .social-glow,
.social-container > .locked-hover:focus-visible .social-glow {
    opacity: 1;
    transform: translateX(10%) skewY(-6deg) scale(1.08);
}

.social-container > .locked-hover:hover,
.social-container > .locked-hover:hover * {
    color: color-mix(in srgb, var(--social-color) 70%, var(--text));
}

.social-container > .locked-hover:hover::before,
.social-container > .locked-hover:hover::after {
    color: var(--social-color);
}

@media (width < 1100px) {
    nav > :not(.brand, .burger-btn) {
        display: none;
    }
    .burger-btn {
        display: flex;
    }
    footer {
        padding: 0 5.5vw;
    }
}
</style>