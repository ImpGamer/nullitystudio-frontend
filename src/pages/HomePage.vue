<template>
    <section class="hero hero-home" id="home" aria-labelledby="hero-title">
        <img :src="bannerImage" class="hero-bg"
            alt="Nullity Studio logo displayed on a CRT monitor inside a dark corridor" fetchpriority="high"
            decoding="async" />
        <div class="hero-scrim" aria-hidden="true"></div>
        <div class="hero-grid" aria-hidden="true"></div>

        <div class="hero-inner hero-home-inner">
            <div class="hero-copy">
                <p class="eyebrow hero-eyebrow">
                    <span>//nullity_studio.exe</span>
                    <span class="hero-signal">signal: online</span>
                </p>

                <h1 id="hero-title" class="hero-title">
                    <span class="glitch-text" data-text="We Build, You Play">We Build, You Play.</span>
                </h1>

                <p class="hero-lead">
                    An independent studio focused on developing
                    <strong>horror and action experiences</strong>
                    for all types of players and communities.
                </p>

                <div class="h-container hero-actions">
                    <router-link to="/games" class="btn btn-solid">
                        <IconDeviceGamepad2 size="18" stroke="2" aria-hidden="true" />
                        See Our Games
                    </router-link>
                    <a href="#tune-in" class="btn">
                        Establish connection
                        <IconArrowRight size="18" stroke="2" aria-hidden="true" />
                    </a>
                </div>
            </div>

            <aside class="hero-hud"
            v-animate-on-view="{
                animation: 'backInRight',
                thresold: 0.3
            }" aria-label="Studio at a glance">
                <div class="hud-head">
                    <span class="hud-dot" aria-hidden="true"></span>
                    <span>// transmission</span>
                    <span class="hud-code">CH 00</span>
                </div>
                <dl class="hud-list">
                    <div>
                        <dt>Established</dt>
                        <dd>2024</dd>
                    </div>
                    <div>
                        <dt>Focus</dt>
                        <dd>Horror / Action</dd>
                    </div>
                    <div>
                        <dt>Mode</dt>
                        <dd>Independent</dd>
                    </div>
                    <div>
                        <dt>Reach</dt>
                        <dd>PC — Web — Mobile</dd>
                    </div>
                </dl>
                <a class="hud-scroll" href="#about-us">
                    <span>Discover the studio</span>
                    <IconArrowDown class="hud-arrow" size="16" stroke="2" aria-hidden="true" />
                </a>
            </aside>
        </div>
    </section>

    <section class="hero recommended-section" aria-labelledby="recommended-title">
        <div class="hero-inner recommended-inner">
            <div class="space-between recommended-head">
                <div class="recommended-heading">
                    <p class="eyebrow">// recommended</p>
                    <h2 id="recommended-title">Some of our Games</h2>
                </div>
                <router-link class="btn btn-solid" to="/games">
                    See all games
                    <IconArrowRight size="16" stroke="2" aria-hidden="true" />
                </router-link>
            </div>

            <AppLoader v-if="!firstPage" label="// Fetching recommended games" />

            <div v-else-if="recommendedGames.length === 0" class="recommended-empty">
                <p class="no-signal">// No games on this channel yet.</p>
                <router-link class="btn" to="/games">Browse the catalog</router-link>
            </div>

            <div v-else class="recommended-carousel" role="region" aria-roledescription="carousel"
                aria-label="Recommended games">
                <div class="carousel-toolbar">
                    <p class="carousel-hint">
                        <IconArrowsHorizontal size="16" stroke="1.75" aria-hidden="true" />
                        <span>Drag, scroll or use the arrows</span>
                        <span class="carousel-count">
                            {{ recommendedGames.length }} {{ recommendedGames.length === 1 ? 'title' : 'titles' }}
                        </span>
                    </p>
                    <div class="carousel-controls">
                        <button type="button" class="carousel-btn" :disabled="!canScrollPrev"
                            aria-label="Previous recommended games" aria-controls="recommended-track"
                            @click="scrollRecommended(-1)">
                            <IconChevronLeft size="18" stroke="2" aria-hidden="true" />
                        </button>
                        <button type="button" class="carousel-btn" :disabled="!canScrollNext"
                            aria-label="Next recommended games" aria-controls="recommended-track"
                            @click="scrollRecommended(1)">
                            <IconChevronRight size="18" stroke="2" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                <div class="carousel-viewport" :class="{ 'has-prev': canScrollPrev, 'has-next': canScrollNext }">
                    <ul id="recommended-track" ref="recommendedTrack" class="recommended-track" role="list"
                        tabindex="0" aria-label="Recommended games. Use the left and right arrow keys to navigate."
                        @scroll.passive="updateRecommendedState">
                        <li v-for="game in recommendedGames" :key="game.id" class="recommended-slide">
                            <GameCard :game="game" />
                        </li>
                    </ul>
                </div>

                <div v-if="isRecommendedScrollable" class="carousel-progress" aria-hidden="true">
                    <span class="carousel-progress-fill"
                        :style="{ transform: `scaleX(${scrollProgress / 100})` }"></span>
                </div>
            </div>
        </div>
    </section>
    <section class="hero" style="background-color: var(--bg-panel-2);" id="news">
        <div class="hero-inner">
            <p class="eyebrow">//From the shadows</p>
            <div class="space-between">
                <h2>Studio News</h2>
                <router-link class="btn" to="/news">More News</router-link>
            </div>

            <AppLoader v-if="!latestNews" />
            <div v-else class="news-cards">
                <NewsCard v-for="n in latestNews" :key="n.id" :news="n" />
            </div>
        </div>
    </section>
    <section class="hero-min about" id="about-us" aria-labelledby="about-title">
        <div class="about-grid">
            <div class="about-copy">
                <p class="eyebrow">//about_nullity</p>
                <h2 id="about-title" class="about-title">Games first. Everything else follows.</h2>

                <p class="about-lead">
                    <strong>Nullity Studio</strong> is an independent studio born in 2024 to bring horror and
                    action together in a single experience.
                </p>

                <div class="about-body">
                    <p>
                        It started with one person. Today we keep bringing in new talent to raise the bar of
                        every game we make.
                    </p>
                    <p>
                        We take design seriously — visually and mechanically — so each title delivers a unique
                        experience within its genre, or a different one entirely.
                    </p>
                </div>

                <dl class="about-stats">
                    <div class="stat" v-animation-on-view="{
                        animation: 'fadeInLeft',
                        delay: '150ms'
                    }">
                        <dt>Current projects</dt>
                        <dd class="no-signal">{{ countGames }}</dd>
                    </div>
                    <div class="stat" v-animation-on-view="{
                        animation: 'fadeInUp',
                        delay: '250ms'
                    }">
                        <dt>Independent</dt>
                        <dd class="no-signal">100%</dd>
                    </div>
                    <div class="stat" v-animation-on-view="{
                        animation: 'fadeInRight',
                        delay: '350ms'
                    }">
                        <dt>Established</dt>
                        <dd>2024</dd>
                    </div>
                </dl>
            </div>

            <figure class="service-reel">
                <div class="reel-top">
                    <span>//services_reel.mp4</span>
                    <span class="reel-time">00:33</span>
                </div>
                <div class="reel-frame">
                    <video ref="serviceVideo" class="reel-video" :src="servicesVideo" :poster="servicesPoster" loop
                        muted playsinline preload="metadata"
                        aria-label="Nullity Studio services reel: game development, web and mobile development, artificial intelligence, WhatsApp chatbots, smart home, cloud and DevOps, and cybersecurity."
                        @play="isVideoPlaying = true" @pause="isVideoPlaying = false">
                        <p class="no-signal">Your browser does not support videos.</p>
                    </video>
                    <button type="button" class="reel-toggle" @click="toggleVideo"
                        :aria-label="isVideoPlaying ? 'Pause the services video' : 'Play the services video'">
                        <component :is="isVideoPlaying ? IconPlayerPauseFilled : IconPlayerPlayFilled" size="16"
                            aria-hidden="true" />
                    </button>
                    <span class="reel-status" aria-hidden="true">no audio // loop</span>
                </div>
                <figcaption>
                    One reel, every channel we work on — from game worlds to cloud infrastructure.
                </figcaption>
            </figure>
        </div>

        <div class="services-block">
            <div class="services-head">
                <div class="services-heading">
                    <p class="eyebrow">//beyond_games</p>
                    <h3 class="services-title">What else can we do?</h3>
                </div>
                <p class="services-lead">
                    We started with video games and we will continue like this, but we also expanded our
                    horizons towards web/mobile applications, security tests such as defense or attack,
                    personal and business AI tools, Cloud &amp; DevOps and physical and logical intelligent
                    systems.
                </p>
            </div>

            <ul class="service-grid" role="list">
                <li v-for="(service, index) in services" :key="service.title" class="service-card" v-animation-on-view="{
                        animation: 'fadeInUpBig',
                        delay: `${index * 350}ms`,
                        thresold: 0.3
                    }">
                    <div class="card-top">
                        <span class="card-icon">
                            <component :is="service.icon" size="22" stroke="1.75" aria-hidden="true" />
                        </span>
                        <span class="card-index" aria-hidden="true">{{ formatNumber(index+1) }}</span>
                    </div>
                    <h4>{{ service.title }}</h4>
                    <p>{{ service.description }}</p>
                    <ul class="tags-container card-tags" role="list">
                        <li v-for="tag in service.tags" :key="tag" class="tag">{{ tag }}</li>
                    </ul>
                </li>
            </ul>
        </div>
    </section>
    <section class="hero" style="background-color: var(--bg-panel-2);" id="tune-in">
        <div class="hero-inner center">
            <p class="eyebrow"><span class="no-signal">//Establish the connection</span></p>
            <h2>Find out before everyone else</h2>

            <p>Previews, development notes, and first access to closed tests — straight to your inbox, no noise
                involved.</p>
            <form class="tune-in-form" @submit.prevent="registerEmail">
                <input v-model="registerAddress"  placeholder="email@address.com" required type="email" />
                <button class="btn btn-solid">Tune In</button>
            </form>
        </div>
    </section>
    <section class="hero" id="contact">
        <div class="hero-inner">
            <p class="eyebrow">//Open channel</p>
            <div>
                <h2>Send us a Message</h2>
                <p>If you would like to build a software or game, or just send us a comment</p>
            </div>

            <div class="contact-container">
                <form class="contact-form" @submit.prevent="sendMessage">
                    <div class="contact-label">
                        <label>Name</label>
                        <input type="text" v-model="formBody.name" placeholder="Your Name" required />
                    </div>
                    <div class="contact-label">
                        <label>Email Address</label>
                        <input type="email" v-model="formBody.email" placeholder="email@address.com" required />
                    </div>
                    <div class="contact-label">
                        <label>Message</label>
                        <textarea v-model="formBody.message" placeholder="Tell us what you need..." required></textarea>
                    </div>
                    <TurnstileWidget
                    ref="turnstile"
                    @verify="captchaToken = $event"/>
                    <div>
                        <button class="btn btn-solid"
                            :disabled="messageStatus === ResponseState.LOADING">
                            {{ messageStatus === ResponseState.LOADING ? 'Sending...' : 'Send Message' }}
                        </button>
                    </div>
                </form>
                <div class="v-container email-contact">
                    <p>By Email</p>
                    <div v-if="publishersEmail" class="contact-label">
                        <label>Press and Publishers</label>
                        <a class="discrete-link" :href="`mailto:${publishersEmail}`">
                            {{ publishersEmail }}
                        </a>
                    </div>
                    <div v-if="supportEmail" class="contact-label">
                        <label>Support</label>
                        <a class="discrete-link" :href="`mailto:${supportEmail}`">
                            {{ supportEmail }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import 'animate.css'
import NewsCard from '@/components/NewsCard.vue';
import GameCard from '@/components/GameCard.vue';
import { useGamesStore } from '@stores/games';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { Component } from 'vue';
import { Game } from '@/types/game';
import AppLoader from '@/components/AppLoader.vue';
import type { News } from '@/types/news';
import { useNewsStore } from '@/stores/news';
import { useConfigStore } from '@stores/config';
import { useRetriableRequest } from '@/composables/useRetriableRequest';
import api, { ResponseState } from '@/api/axios';
import { useToast } from 'vue-toastification';
import axios, { HttpStatusCode } from 'axios';
import {
    IconArrowDown,
    IconArrowRight,
    IconArrowsHorizontal,
    IconBrain,
    IconChevronLeft,
    IconChevronRight,
    IconCloudCog,
    IconCpu2,
    IconDeviceGamepad2,
    IconDeviceMobile,
    IconPlayerPauseFilled,
    IconPlayerPlayFilled,
    IconShieldLock,
} from '@tabler/icons-vue';
import bannerImage from '@/assets/images/static/Banner.webp';
import servicesPoster from '@/assets/images/static/services-poster.webp';
import servicesVideo from '@/assets/videos/nullity-services (online-video-cutter.com).mp4';
import { formatNumber } from '@/utils/functions';
import TurnstileWidget from '@/components/TurnstileWidget.vue';

const gameStore = useGamesStore();
const newsStore = useNewsStore();
const configStore = useConfigStore();

const publishersEmail = ref('')
const supportEmail = ref('')
const registerAddress = ref('')

const firstPage = ref<Game[] | null>(null)
const recommendedGames = computed<Game[]>(() => firstPage.value ?? [])
const countGames = ref(0)

const latestNews = ref<News[] | null>(null)
const formBody = ref<{
    name: string;
    email: string;
    message: string;
}>({
    name: '',
    email: '',
    message: '',
})
const messageStatus = ref(ResponseState.IDLE)
const captchaToken = ref<string | null>(null);
const turnstile = ref<InstanceType<typeof TurnstileWidget> | null>(null);

const toast = useToast();

function registerEmail() {
    const email = registerAddress.value;

    if(email.length === 0) return;
    if(!email.includes('@')) return;

    toast.info('This service is not available at this time.',
        {
            closeButton: true,
            draggable: false,
        }
    )
}

interface Service {
    title: string;
    description: string;
    tags: string[];
    icon: Component;
}

const services: Service[] = [
    {
        title: 'Game Development',
        description:
            'Original horror and action experiences, from the first idea to the final build. Atmosphere, mechanics and design working as one.',
        tags: ['Horror', 'Action', 'Game design'],
        icon: IconDeviceGamepad2,
    },
    {
        title: 'Web & Mobile',
        description:
            'Custom applications with interfaces that feel simple, perform reliably and adapt to the people using them.',
        tags: ['Web', 'Mobile', 'Product'],
        icon: IconDeviceMobile,
    },
    {
        title: 'Cybersecurity',
        description:
            'Defensive hardening and controlled attack simulations to find weaknesses before someone else does.',
        tags: ['Defense', 'Offense', 'Audits'],
        icon: IconShieldLock,
    },
    {
        title: 'AI Tools',
        description:
            'Personal and business assistants that automate work, analyze information and turn data into decisions.',
        tags: ['Automation', 'Assistants', 'Data'],
        icon: IconBrain,
    },
    {
        title: 'Cloud & DevOps',
        description:
            'Cloud-ready architecture and delivery pipelines that ship faster without sacrificing stability.',
        tags: ['Cloud', 'CI/CD', 'Infrastructure'],
        icon: IconCloudCog,
    },
    {
        title: 'Intelligent Systems',
        description:
            'Physical and logical systems that connect sensors, devices and software into a single environment.',
        tags: ['IoT', 'Hardware', 'Automation'],
        icon: IconCpu2,
    },
];

const serviceVideo = ref<HTMLVideoElement | null>(null)
const isVideoPlaying = ref(false)
const userPaused = ref(false)
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
const reducedMotion = ref(motionQuery.matches)
let reelObserver: IntersectionObserver | null = null

function onMotionPreferenceChange(event: MediaQueryListEvent) {
    reducedMotion.value = event.matches

    if (event.matches) {
        userPaused.value = true
        serviceVideo.value?.pause()
    }
}

function toggleVideo() {
    const video = serviceVideo.value
    if (!video) return

    if (video.paused) {
        userPaused.value = false
        void video.play().catch(() => {
            // The browser can still block playback; the button stays available.
        })
    } else {
        userPaused.value = true
        video.pause()
    }
}

// Pause the reel off-screen to save resources and resume it only if the visitor
// has not paused it manually and motion is allowed.
function setupReel() {
    const video = serviceVideo.value
    if (!video) return

    motionQuery.addEventListener('change', onMotionPreferenceChange)

    if (reducedMotion.value) {
        userPaused.value = true
        video.pause()
    }

    reelObserver = new IntersectionObserver(
        ([entry]) => {
            if (!entry) return

            if (!entry.isIntersecting) {
                video.pause()
                return
            }

            if (!reducedMotion.value && !userPaused.value && video.paused) {
                void video.play().catch(() => {
                    // Keep the manual controls as the fallback.
                })
            }
        },
        { threshold: 0.25 },
    )
    reelObserver.observe(video)
}

// Local carousel: native scrolling + snap, with accessible controls and
// progress feedback instead of a separate component.
const recommendedTrack = ref<HTMLUListElement | null>(null)
const canScrollPrev = ref(false)
const canScrollNext = ref(false)
const isRecommendedScrollable = ref(false)
const scrollProgress = ref(0)
let recommendedResizeObserver: ResizeObserver | null = null

function updateRecommendedState() {
    const track = recommendedTrack.value
    if (!track) return

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth)

    isRecommendedScrollable.value = maxScroll > 2
    canScrollPrev.value = track.scrollLeft > 2
    canScrollNext.value = maxScroll > 2 && track.scrollLeft < maxScroll - 2
    scrollProgress.value = maxScroll > 0
        ? Math.min(100, Math.max(0, (track.scrollLeft / maxScroll) * 100))
        : 100
}

function getRecommendedStep(track: HTMLUListElement) {
    const firstSlide = track.firstElementChild

    if (!(firstSlide instanceof HTMLElement)) return track.clientWidth

    const styles = window.getComputedStyle(track)
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0

    return firstSlide.getBoundingClientRect().width + gap
}

function scrollRecommended(direction: -1 | 1) {
    const track = recommendedTrack.value
    if (!track) return

    track.scrollBy({
        left: direction * getRecommendedStep(track),
        behavior: reducedMotion.value ? 'auto' : 'smooth',
    })
}

watch(recommendedTrack, (track) => {
    recommendedResizeObserver?.disconnect()
    recommendedResizeObserver = null

    if (!track) return

    recommendedResizeObserver = new ResizeObserver(() => updateRecommendedState())
    recommendedResizeObserver.observe(track)
    requestAnimationFrame(updateRecommendedState)
}, { flush: 'post' })

watch(firstPage, () => requestAnimationFrame(updateRecommendedState), { flush: 'post' })

// Cada petición vive en su propio useRetriableRequest: si una falla, se
// reintenta sola sin arrastrar a las demás.
const { run: loadGamesPage } = useRetriableRequest(
    () => gameStore.getPage({
        page: 1,
        size: 15
    }),
    {
        onSuccess: (response) => {
            firstPage.value = response.page;
        },
    },
)

const { run: loadGamesCount } = useRetriableRequest(
    () => gameStore.count(),
    {
        onSuccess: (count) => {
            countGames.value = count;
        },
    },
)

const { run: loadLatestNews } = useRetriableRequest(
    () => newsStore.getPage({
        page: 1,
        size: 5
    }),
    {
        onSuccess: (response) => {
            latestNews.value = response.page;
        },
    },
)

const { run: loadMailConfig } = useRetriableRequest(
    () => configStore.get('mail'),
    {
        onSuccess: (mail) => {
            supportEmail.value = mail.supportEmail;
            publishersEmail.value = mail.publishersEmail;
        },
    },
)

onMounted(async () => {
    setupReel()

    // Todas arrancan a la vez; cada una gestiona sus propios reintentos.
    await Promise.all([
        loadGamesPage(),
        loadGamesCount(),
        loadLatestNews(),
        loadMailConfig(),
    ])
})

onBeforeUnmount(() => {
    motionQuery.removeEventListener('change', onMotionPreferenceChange)
    reelObserver?.disconnect()
    recommendedResizeObserver?.disconnect()
})

async function sendMessage() {
    if (!captchaToken.value) {
        toast.error('Please complete the security verification.');
        return;
    }
    if(messageStatus.value === ResponseState.LOADING) return;

    messageStatus.value = ResponseState.LOADING;
    const toastId = toast.info(
        'Your message is being sent...',
        {
            timeout: false,
            closeButton: false,
            closeOnClick: false,
            draggable: false,
        },
    );

    try {
        await api.post('comments/send', {
            ...formBody.value,
            captchaToken: captchaToken.value
        });

        toast.dismiss(toastId);
        messageStatus.value = ResponseState.SUCCESS;

        formBody.value = { name: '', email: '', message: '' };
        toast.success(
            'The message has been send, you\'ll receive a response soon :D'
        )
    } catch (e: unknown) {
        toast.dismiss(toastId);
        messageStatus.value = ResponseState.ERROR;

        if (axios.isAxiosError(e)) {
            const status = e.response?.status;
            let message = e.response?.data.message;
            message = Array.isArray(message) ? message.join('\n') : message;

            if (status === HttpStatusCode.TooManyRequests) {
                toast.info(message);
                return;
            }

            toast.error(message, { timeout: 10 * 1000 })
            return;
        }

        toast.error('Error to connect to the server')
    } finally {
        captchaToken.value = null;
        turnstile.value?.reset();
    }
}
</script>

<style scoped>
/* ---------- Recommended carousel ---------- */

.recommended-inner {
    gap: clamp(26px, 3vw, 40px);
}

.recommended-head {
    align-items: flex-end;
}

.recommended-heading {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.recommended-head .btn {
    min-height: 44px;
}

.recommended-empty {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
    padding: 24px 0;
}

.recommended-carousel {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    min-width: 0;
}

.carousel-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    min-height: 44px;
}

.carousel-hint {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px 12px;
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 10.5px;
    letter-spacing: .12em;
    text-transform: uppercase;
}

.carousel-hint>svg {
    flex: none;
    color: var(--purple);
}

.carousel-count {
    padding-left: 12px;
    border-left: 1px solid var(--line);
    color: var(--text);
}

.carousel-controls {
    display: flex;
    flex: none;
    gap: 8px;
}

.carousel-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 1px solid var(--line);
    background: transparent;
    color: var(--text);
    cursor: pointer;
    transition: border-color .2s ease, color .2s ease, background .2s ease;
}

.carousel-btn:hover:not(:disabled) {
    border-color: var(--purple);
    background: rgba(192, 57, 249, .08);
    color: var(--purple);
}

.carousel-btn:disabled {
    border-color: rgba(42, 39, 50, .55);
    color: var(--muted-dim);
    cursor: not-allowed;
}

.carousel-viewport {
    position: relative;
    min-width: 0;
}

.carousel-viewport::before,
.carousel-viewport::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 8px;
    z-index: 1;
    width: clamp(28px, 4vw, 64px);
    pointer-events: none;
    opacity: 0;
    transition: opacity .2s ease;
}

.carousel-viewport::before {
    left: 0;
    background: linear-gradient(90deg, var(--bg), transparent);
}

.carousel-viewport::after {
    right: 0;
    background: linear-gradient(270deg, var(--bg), transparent);
}

.carousel-viewport.has-prev::before,
.carousel-viewport.has-next::after {
    opacity: 1;
}

.recommended-track {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: clamp(270px, 28vw, 380px);
    align-items: stretch;
    gap: clamp(16px, 1.8vw, 24px);
    margin: 0;
    padding: 4px 0 8px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    overscroll-behavior-x: contain;
    list-style: none;
}

.recommended-track::-webkit-scrollbar {
    display: none;
}

.recommended-slide {
    display: flex;
    min-width: 0;
    scroll-snap-align: start;
}

.carousel-progress {
    width: 100%;
    height: 2px;
    background: var(--line);
    overflow: hidden;
}

.carousel-progress-fill {
    display: block;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, var(--purple-dim), var(--purple));
    transform-origin: left;
    transition: transform .18s linear;
}

.news-cards {
    margin-top: 30px;
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    justify-content: center;
    align-items: center;
    gap: 12px;
}

.news-cards .news-card {
    width: clamp(320px, 20vw, 400px);
}

/* ---------- Hero ---------- */

.hero.hero-home {
    min-height: clamp(560px, calc(100svh - 73px), 980px);
    align-items: stretch;
    isolation: isolate;
}

.hero-scrim {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
        linear-gradient(90deg,
            rgba(8, 8, 11, .96) 0%,
            rgba(11, 11, 20, 0.86) 28%,
            rgba(8, 8, 11, .35) 62%,
            rgba(8, 8, 11, .55) 100%),
        linear-gradient(0deg, var(--bg) 0%, rgba(8, 8, 11, .55) 24%, transparent 58%),
        linear-gradient(180deg, rgba(8, 8, 11, .72) 0%, transparent 24%);
}

.hero-grid {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: .5;
    background-image:
        linear-gradient(to right, rgba(192, 57, 249, .12) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(192, 57, 249, .12) 1px, transparent 1px);
    background-size: 78px 78px;
    mask-image: linear-gradient(90deg, black 0%, rgba(0, 0, 0, .55) 52%, transparent 78%);
}

.hero-inner.hero-home-inner {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(290px, 360px);
    align-items: end;
    gap: clamp(32px, 6vw, 96px);
    padding: clamp(44px, 6vw, 92px) 10vw;
}

.hero-copy {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: clamp(20px, 2.4vw, 30px);
    max-width: 820px;
    animation: hero-in .7s ease both;
}

.hero-eyebrow {
    flex-wrap: wrap;
    gap: 8px 14px;
}

.hero-signal {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding-left: 14px;
    border-left: 1px solid var(--line);
    color: var(--cyan);
    font-size: .78rem;
    letter-spacing: .12em;
}

.hero-title {
    max-width: 100%;
    font-family: var(--font-display);
    font-weight: 400;
    font-size: clamp(3rem, 8.4vw, 7rem);
    line-height: .88;
    letter-spacing: .055em;
    text-transform: uppercase;
    text-wrap: balance;
}

.hero-title .glitch-text {
    display: block;
    width: 100%;
    animation: hero-chroma 7s steps(1, end) infinite;
}

/* The shared glitch layer is too dense at display size. The hero gets a
   lighter chromatic pulse so the headline stays readable. */
.hero-title .glitch-text::before,
.hero-title .glitch-text::after {
    display: none;
}

.hero-lead {
    max-width: 54ch;
    color: #c9c3d6;
    font-size: clamp(.98rem, 1.15vw, 1.08rem);
    line-height: 1.65;
}

.hero-lead strong {
    color: var(--text);
    font-size: inherit;
    font-weight: 600;
}

.hero-actions {
    gap: 12px;
    margin-top: 4px;
}

.hero-actions .btn {
    min-height: 48px;
}

.hero-hud {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px 22px;
    border: 1px solid color-mix(in srgb, var(--purple) 32%, var(--line));
    background: linear-gradient(160deg, rgba(17, 16, 21, .9), rgba(8, 8, 11, .72));
    backdrop-filter: blur(8px);
    animation: hero-in .9s .12s ease both;
}

.hero-hud::before,
.hero-hud::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    pointer-events: none;
}

.hero-hud::before {
    top: -1px;
    left: -1px;
    border-top: 1px solid var(--purple);
    border-left: 1px solid var(--purple);
}

.hero-hud::after {
    right: -1px;
    bottom: -1px;
    border-right: 1px solid var(--purple);
    border-bottom: 1px solid var(--purple);
}

.hud-head {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--line);
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 10.5px;
    letter-spacing: .14em;
    text-transform: uppercase;
}

.hud-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--cyan);
    box-shadow: 0 0 10px var(--cyan);
}

.hud-code {
    margin-left: auto;
    color: #f43f5e;
}

.hud-list {
    display: flex;
    flex-direction: column;
}

.hud-list>div {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    padding: 9px 0;
    border-bottom: 1px dashed rgba(42, 39, 50, .85);
}

.hud-list>div:last-child {
    border-bottom: 0;
}

.hud-list dt {
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 10.5px;
    letter-spacing: .13em;
    text-transform: uppercase;
}

.hud-list dd {
    color: var(--text);
    font-family: var(--font-mono);
    font-size: .78rem;
    text-align: right;
}

.hud-scroll {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 44px;
    padding-top: 12px;
    border-top: 1px solid var(--line);
    color: var(--text);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: .13em;
    text-transform: uppercase;
    transition: color .2s ease;
}

.hud-scroll:hover {
    color: var(--purple);
}

.hud-arrow {
    transition: transform .25s ease;
}

.hud-scroll:hover .hud-arrow {
    transform: translateY(3px);
}

/* ---------- About ---------- */

#about-us,
#news,
#tune-in,
#contact {
    scroll-margin-top: 88px;
}

.about {
    gap: clamp(48px, 6.5vw, 88px);
    padding: clamp(56px, 7vw, 104px) 10vw;
    background: linear-gradient(180deg, var(--bg) 0%, #0b0a0f 100%);
}

.about-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.04fr) minmax(0, .96fr);
    align-items: center;
    gap: clamp(32px, 5vw, 72px);
    width: 100%;
}

.about-copy {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 22px;
    max-width: 66ch;
}

.about-title {
    max-width: 15ch;
    font-size: clamp(2.4rem, 4.6vw, 4.2rem);
    letter-spacing: .06em;
    text-wrap: balance;
}

.about-lead {
    max-width: 58ch;
    color: #c9c3d6;
    font-size: clamp(.98rem, 1.2vw, 1.08rem);
    line-height: 1.7;
}

.about-lead strong {
    color: var(--text);
    font-size: inherit;
}

.about-body {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding-left: 20px;
    border-left: 1px solid var(--line);
}

.about-body p {
    max-width: 62ch;
    line-height: 1.7;
}

.about-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1px;
    width: 100%;
    margin-top: 8px;
    border: 1px solid var(--line);
    background: var(--line);
}

.stat {
    display: flex;
    flex-direction: column-reverse;
    gap: 4px;
    padding: 18px 20px;
    background: var(--bg-panel);
}

.stat dd {
    color: var(--text);
    font-family: var(--font-display);
    font-size: clamp(2rem, 3vw, 2.75rem);
    line-height: 1;
    letter-spacing: .04em;
}

.stat dt {
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 10.5px;
    letter-spacing: .12em;
    text-transform: uppercase;
}

.service-reel {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 0;
    min-width: 0;
}

.reel-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 10.5px;
    letter-spacing: .13em;
    text-transform: uppercase;
}

.reel-time {
    color: #f43f5e;
}

.reel-frame {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border: 1px solid var(--line);
    background: #000;
}

.reel-frame::after {
    content: "";
    position: absolute;
    inset: 10px;
    z-index: 1;
    border: 1px solid rgba(192, 57, 249, .18);
    pointer-events: none;
}

.reel-video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(1.05) contrast(1.02);
}

.reel-toggle {
    position: absolute;
    left: 14px;
    bottom: 14px;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: 1px solid var(--line);
    background: rgba(8, 8, 11, .82);
    color: var(--text);
    cursor: pointer;
    backdrop-filter: blur(6px);
    transition: border-color .2s ease, color .2s ease, background .2s ease;
}

.reel-toggle:hover {
    border-color: var(--purple);
    background: rgba(17, 16, 21, .95);
    color: var(--purple);
}

.reel-status {
    position: absolute;
    right: 14px;
    bottom: 18px;
    z-index: 2;
    padding: 5px 8px;
    border: 1px solid var(--line);
    background: rgba(8, 8, 11, .72);
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: .13em;
    text-transform: uppercase;
    pointer-events: none;
}

.service-reel figcaption {
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 11px;
    line-height: 1.6;
    letter-spacing: .02em;
}

/* ---------- Services ---------- */

.services-block {
    display: flex;
    flex-direction: column;
    gap: clamp(24px, 3vw, 40px);
    width: 100%;
    padding-top: clamp(36px, 4vw, 56px);
    border-top: 1px solid var(--line);
}

.services-head {
    display: grid;
    grid-template-columns: minmax(0, .92fr) minmax(0, 1.08fr);
    align-items: end;
    gap: clamp(20px, 4vw, 64px);
}

.services-heading {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.services-title {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: clamp(2rem, 3.4vw, 3.25rem);
    line-height: .98;
    letter-spacing: .06em;
    text-transform: uppercase;
    text-wrap: balance;
}

.services-lead {
    max-width: 74ch;
    color: var(--muted);
    font-size: .95rem;
    line-height: 1.7;
}

.service-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1px;
    width: 100%;
    border: 1px solid var(--line);
    background: var(--line);
    list-style: none;
}

.service-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: clamp(20px, 2.4vw, 30px);
    background: var(--bg-panel);
    overflow: hidden;
    transition: background .25s ease, transform .25s ease;
}

.service-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--purple);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform .3s ease;
}

.service-card:hover {
    background: var(--bg-panel-2);
    transform: translateY(-4px);
}

.service-card:hover::before {
    transform: scaleX(1);
}

.card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.card-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: 1px solid var(--line);
    background: rgba(192, 57, 249, .06);
    color: var(--purple);
    transition: border-color .25s ease, box-shadow .25s ease;
}

.service-card:hover .card-icon {
    border-color: var(--purple);
    box-shadow: 0 0 22px -8px var(--purple);
}

.card-index {
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: .13em;
}

.service-card h4 {
    font-family: var(--font-display);
    font-weight: 500;
    font-size: clamp(1.25rem, 1.6vw, 1.55rem);
    line-height: 1.05;
    letter-spacing: .06em;
    text-transform: uppercase;
}

.service-card>p {
    color: var(--muted);
    font-size: 12px;
    line-height: 1.65;
    letter-spacing: .01em;
}

.card-tags {
    gap: 6px;
    margin-top: auto;
    padding-top: 8px;
}

.card-tags .tag {
    padding: 3px 7px;
    font-size: 10px;
}

.center {
    display: flex;
    flex-direction: column;

    gap: 20px;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.tune-in-form {
    display: flex;
    flex-direction: row;
    width: 55%;
}

.contact-container {
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 6vw;

    width: 100%;
}

.contact-form {
    display: flex;
    flex-direction: column;
    width: 70%;

    gap: 24px;
}

.contact-label {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.email-contact {
    padding-left: 40px;
    border-left: 1px solid var(--line);
    height: 100%;
}

.contact-pending {
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
    letter-spacing: 0.12em;
    color: var(--muted);
}

@keyframes hero-in {
    from {
        opacity: 0;
        transform: translateY(18px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes hero-chroma {

    0%,
    88%,
    100% {
        text-shadow: none;
        transform: translateX(0);
    }

    89% {
        text-shadow: -4px 0 var(--red), 4px 0 var(--cyan);
        transform: translateX(1px);
    }

    90% {
        text-shadow: 4px 0 var(--red), -4px 0 var(--cyan);
        transform: translateX(-1px);
    }

    91% {
        text-shadow: -2px 0 var(--red), 2px 0 var(--cyan);
        transform: translateX(0);
    }

    92% {
        text-shadow: none;
    }
}

@media (width < 1180px) {
    .hero-inner.hero-home-inner {
        grid-template-columns: 1fr;
        align-items: center;
    }

    .hero-hud {
        display: none;
    }

    .hero.hero-home {
        min-height: clamp(540px, 84svh, 820px);
    }

    .about-grid {
        grid-template-columns: 1fr;
    }

    .services-head {
        grid-template-columns: 1fr;
        align-items: start;
        gap: 16px;
    }

    .service-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (width < 810px) {
    .contact-form {
        width: 100%;
    }

    .about {
        padding: 48px 10vw;
    }

    .about-grid {
        gap: 36px;
    }

    .service-reel {
        max-width: 100%;
    }
}

@media (width < 720px) {
    .hero-inner.hero-home-inner {
        padding: 48px 10vw;
    }

    .hero.hero-home {
        min-height: clamp(520px, 78svh, 700px);
    }

    .hero-title {
        font-size: clamp(2.75rem, 13vw, 4rem);
    }

    .hero-lead {
        max-width: 46ch;
        font-size: .95rem;
    }

    .hero-signal {
        padding-left: 0;
        border-left: 0;
        font-size: .72rem;
    }

    .hero-actions {
        flex-direction: column;
        align-items: stretch;
        width: 100%;
    }

    .hero-actions .btn {
        justify-content: center;
        width: 100%;
    }

    .services-title {
        font-size: clamp(1.85rem, 8.5vw, 2.5rem);
    }

    .recommended-head {
        align-items: flex-start;
        gap: 18px;
    }

    .recommended-head .btn {
        justify-content: center;
        width: 100%;
    }
}

@media (width < 640px) {
    .about {
        padding: 44px 10vw;
        gap: 40px;
    }

    .about-title {
        font-size: clamp(2.1rem, 10vw, 2.8rem);
    }

    .about-body {
        padding-left: 14px;
    }

    .stat {
        padding: 14px 12px;
    }

    .stat dt {
        font-size: 10px;
        letter-spacing: .07em;
    }

    .service-grid {
        grid-template-columns: 1fr;
    }

    .service-card {
        padding: 22px;
    }

    .carousel-hint>svg,
    .carousel-hint>span:not(.carousel-count) {
        display: none;
    }

    .carousel-count {
        padding-left: 0;
        border-left: 0;
    }
}

@media (width < 360px) {
    .recommended-track {
        grid-auto-columns: 78vw;
    }

    .about-stats {
        grid-template-columns: 1fr;
    }

    .stat {
        flex-direction: row;
        align-items: baseline;
        justify-content: space-between;
        gap: 12px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .hero-copy,
    .hero-hud,
    .hero-title .glitch-text {
        animation: none;
    }

    .hud-scroll:hover .hud-arrow {
        transform: none;
    }

    .service-card,
    .service-card::before,
    .card-icon,
    .carousel-btn,
    .carousel-progress-fill,
    .carousel-viewport::before,
    .carousel-viewport::after {
        transition: none;
    }

    .service-card:hover,
    .recommended-track :deep(.game-card:hover) {
        transform: none;
    }

    .recommended-track :deep(.game-card) {
        transition: none;
    }
}
</style>
