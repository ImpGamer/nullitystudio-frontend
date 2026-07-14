<template>
    <div class="horizontal-container mid-aligner use-all-width s-padding">
        <Logo margin="0"/>
        <div class="burger-btn animation-hover" @click="show(true)">
            <img src="/images/icons/options_icon.png" class="icon invert" />
        </div>
    </div>
    <transition name="scale-fade">
        <div v-if="isActive" class="options-container">
            <div class="close-btn animation-hover" @click="show(false)">
                <img src="/images/icons/delete_icon.svg" class="sm-icon" />
            </div>

            <div v-for="opt in options" :key="opt" class="s-padding animation-hover" @click="show(false)">
                <router-link :to="opt.to" class="title-font nav-link" exact-active-class="selected">
                    {{ opt.label }}
                </router-link>
            </div>
            <div class="media-container">
                <div v-for="media in socialMedias" :key="media" class="s-padding animation-hover">
                    <a :href="media.to" target="_blank" rel="noopener noreferrer">
                        <img :src="media.img" :alt="media.label" class="icon" />
                    </a>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { socialMedias } from '@config/lists.config';
import { ref } from 'vue';
import Logo from './Logo.vue';

const isActive = ref(false)
const show = show => isActive.value = show;

defineProps({
    options: {
        type: Array,
        required: true,
        validator(value) {
            return value.every(
                item =>
                    typeof item.label === 'string' &&
                    typeof item.to === 'string'
            )
        }
    }
})
</script>

<style scoped>
.horizontal-container {
    justify-content: space-between;
}

.close-btn {
    position: absolute;
    top: 3.5rem;
    right: 2rem;

    width: 35px;
    height: 30px;

    background-color: var(--secondary-color);
    border: 3.5px solid black;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.options-container {
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: rgba(255, 255, 255, 0.6);
    z-index: 9999;
    transition: transform 0.3s ease-in;
}

.burger-btn {
    width: 25vw;
    height: 65px;
    max-width: 100px;

    background-color: transparent;
    border: 2px solid white;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
}

.media-container {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;

    gap: 15px;
}

.scale-fade-enter-active,
.scale-fade-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.scale-fade-enter-from,
.scale-fade-leave-to {
    transform: scale(0);
    opacity: 0;
}

.scale-fade-enter-to,
.scale-fade-leave-from {
    transform: scale(1);
    opacity: 1;
}

.nav-link {
    color: black;
}

.nav-link.selected {
    color: var(--selected-color);
}
</style>