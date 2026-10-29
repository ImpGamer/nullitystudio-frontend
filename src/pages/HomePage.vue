<template>
    <section class="hero" id="home">
        <img src="/src/assets/images/static/Banner.png" class="hero-bg" />

        <div class="hero-inner">
            <p class="eyebrow">//nullity_studio.exe</p>
            <h2><span class="glitch-text" data-text="We Build, You Play">
                    We Build, You <br /> Play.</span></h2>

            <p>
                <strong>An independent studio focused on developing horror <br>
                    and action experiences for all types of players and communities.</strong>
            </p>
            <div class="h-container">
                <router-link to="/games" class="btn btn-solid">
                    See Our Games
                </router-link>
                <a href="#tune-in" class="btn">
                    Establish connection
                </a>
            </div>
        </div>
    </section>

    <section class="hero">
        <div class="hero-inner">
            <div class="space-between">
                <h2>Some of our Games</h2>
                <router-link class="btn btn-solid" to="/games">See all</router-link>
            </div>

            <p class="eyebrow">Recommended</p>
            <AppLoader v-if="!firstPage" label="// Fetching recommended games" />
            <Carrusel v-else :games="firstPage" />
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
    <section class="hero-min" id="about-us">
        <div class="about-us">
            <div class="v-container">
                <p class="eyebrow">//What should be written</p>
                <div class="v-container">
                    <p>
                        <strong>Nullity Studio</strong>
                        it is an independent studio that was born in 2024 with the aim of promoting the genre of horror
                        and action united in a single installment.
                    </p>
                    <p>It starts with one person but we try to implement new talents to enhance the quality of each game
                        we make.</p>
                    <p>We take design very seriously, both visually and in game aspects, so we can guarantee you a
                        unique experience in each title of the genre or a different one.</p>
                </div>
            </div>
            <div class="grid">
                <div class="grid-element">
                    <h2 class="no-signal">{{ countGames }}</h2>
                    <p>Current proyects</p>
                </div>
                <div class="grid-element">
                    <h2 class="no-signal">100%</h2>
                    <p>Independient</p>
                </div>
            </div>
        </div>
        <video loop autoplay muted preload="auto">
            <source src="/src/assets/videos/nullity-services (online-video-cutter.com).mp4">
            <p class="no-signal">Your browser does not support videos</p>
        </video>
    </section>
    <section class="hero" style="background-color: var(--bg-panel-2);" id="tune-in">
        <div class="hero-inner center">
            <p class="eyebrow"><span class="no-signal">//Establish the connection</span></p>
            <h2>Find out before everyone else</h2>

            <p>Previews, development notes, and first access to closed tests — straight to your inbox, no noise
                involved.</p>
            <form class="tune-in-form">
                <input placeholder="email@address.com" required type="email" />
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
                    <div>
                        <button class="btn btn-solid">Send Message</button>
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
import NewsCard from '@/components/NewsCard.vue';
import Carrusel from '@/components/Carrusel.vue';
import { useGamesStore } from '@stores/games';
import { onMounted, ref } from 'vue';
import { Game } from '@/types/game';
import AppLoader from '@/components/AppLoader.vue';
import type { News } from '@/types/news';
import { useNewsStore } from '@/stores/news';
import { useConfigStore } from '@stores/config';
import { useRetriableRequest } from '@/composables/useRetriableRequest';
import api, { ResponseState } from '@/api/axios';
import { useToast } from 'vue-toastification';
import axios, { HttpStatusCode } from 'axios';

const gameStore = useGamesStore();
const newsStore = useNewsStore();
const configStore = useConfigStore();

const publishersEmail = ref('')
const supportEmail = ref('')

const firstPage = ref<Game[] | null>(null)
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
let messageStatus = ResponseState.SUCCESS

const toast = useToast();

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
    // Todas arrancan a la vez; cada una gestiona sus propios reintentos.
    await Promise.all([
        loadGamesPage(),
        loadGamesCount(),
        loadLatestNews(),
        loadMailConfig(),
    ])
})

async function sendMessage() {
    if(messageStatus === ResponseState.LOADING) return;

    messageStatus = ResponseState.LOADING;
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
        await api.post('comments/send', formBody.value);

        toast.dismiss(toastId);
        messageStatus = ResponseState.SUCCESS;
        toast.success(
            'The message has been send, you\'ll receive a response soon :D'
        )

    } catch (e: unknown) {
        toast.dismiss(toastId);
        messageStatus = ResponseState.ERROR;

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
    }
}
</script>

<style scoped>
.cards {
    display: flex;
    gap: 32px;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 8px 0;
}

.cards>.game-card {
    width: clamp(360px, 75vw, 440px);
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

.about-us {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    width: 100%;
    gap: 20px;
    padding: 4vw, 10vw;
}

.about-us p {
    max-width: 70ch;
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

.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);
}

.grid-element {
    background: var(--bg);
    padding: clamp(30px, 20vw, 46px) 32px;
}

@media (width < 810px) {
    .contact-form {
        width: 100%;
    }
}
</style>
