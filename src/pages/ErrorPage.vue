<template>
    <div class="hero">
        <div class="hero-inner">
            <Logo />
            <p class="eyebrow no-signal">Lost Signal</p>

            <h3 class="glitch-text" :data-text="statusCode">{{ statusCode }}</h3>
            <strong>This channel does not transmit anything</strong>
            <p>{{ message }}</p>

            <div class="btn-container">
                <router-link class="btn btn-solid" to="/home">
                    Return to Home
                </router-link>
                <router-link class="btn" :to="{ path: '/games', hash: '#catalog' }">
                    See our Catalog
                </router-link>
            </div>
            <span>[ NO SIGNAL // CH {{ statusCode }} ]</span>
        </div>
    </div>
</template>

<script setup>
import { clamp } from '@/utils/functions';
import Logo from '@components/Logo.vue';
import { useRoute } from 'vue-router';
const route = useRoute()

const intentCode = parseInt(route.query.code)
const statusCode = !isNaN(intentCode) ? clamp(intentCode, 400, 504) : 404;
const message = route.query.message ?? `The page you are looking for does not exist, has been moved, or has never been here. Check the address or
                return to a known channel.`

</script>
<style scoped>
.hero-inner {
    position: relative;
    z-index: 1;
    width: 100%;
    padding: 7vw 18vw;

    display: flex;
    flex-direction: column;
    gap: 12px;
    flex-wrap: wrap;

    align-items: center;
    justify-content: center;
    text-align: center;
}

h3 {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: clamp(10.5rem, 18vw, 16rem);
    line-height: .95;
    letter-spacing: .08em;
    text-transform: uppercase;
}

span {
    font-family: var(--font-mono);
    font-size: .75rem;
    color: var(--muted);
}

p {
    max-width: 65ch;
    font-size: .9rem;
    line-height: 1.7;
}

strong {
    font-size: clamp(1.4rem, 3vw, 2rem);
}
.btn-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
    gap: 1rem;

    margin-top: 20px;
}
</style>