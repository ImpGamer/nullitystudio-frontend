<template>
    <div class="main-container vertical-container">
        <section class="section-container" style="position: relative;">
            <video v-if="gameStore.getFeatured" class="bg-video" autoplay loop muted playsinline>
                <source :src="gameStore.getFeatured.bk_video" />
            </video>

            <div class="vertical-container mid-aligner m-separator video-bg-container b-padding">
                <h3 class="title-font highlighted">Featured Game Of The Month</h3>
                <LoadingSection :isLoading="gameStore.ftGame.isLoading" :error="gameStore.ftGame.error"
                    class="horizontal-container m-separator inverse-wrap">
                    <CardComponent :title="{ content: 'Play It Here!', length: 30 }"
                        :description="{ content: gameStore.getFeatured.description, length: 150 }"
                        :url="gameStore.getFeatured.trailer">

                        <p class="text">Available Platforms:</p>

                        <ButtonComponent v-for="platform in gameStore.getFeatured.platforms" :key="platform"
                            :color="platforms[platform.name].color" :content="platform.label" :href="platform.url"
                            :icon="platforms[platform.name].icon" />
                    </CardComponent>
                    <div class="vertical-container m-separator start-aligner text-panel">
                        <h3 class="title-font">{{ gameStore.getFeatured.name }}</h3>
                        <div class="vertical-container s-separator">
                            <p class="title-font">Description:</p>
                            <p class="text">{{ gameStore.getFeatured.description }}</p>
                        </div>
                        <div class="vertical-container s-separator">
                            <p class="text">Tags:</p>
                            <div class="horizontal-container s-separator wrap">
                                <span v-for="tag in gameStore.getFeatured.tags" :key="tag" class="tag-container">
                                    <p class="text">{{ tag }}</p>
                                </span>
                            </div>
                        </div>
                    </div>
                    <img v-if="gameStore.getFeatured.sticker" class="sticker general-image"
                        :src="gameStore.getFeatured.sticker" />
                </LoadingSection>
            </div>
        </section>
        <section class="section-container b-padding vertical-container s-separator mid-aligner">
            <div>
                <h3 class="title-font">¡Discount Games!</h3>
                <p class="text">Games that are discounted on one of the available platforms</p>
            </div>

            <LoadingSection :isLoading="gameStore.onDiscount.isLoading" :error="gameStore.onDiscount.error"
                class="vertical-container mid-aligner">
                <div v-if="gameStore.getDiscounts.length > 0" class="horizontal-container wrap m-separator">
                    <CardComponent v-for="game in gameStore.getDiscounts" :key="game"
                        :title="{ content: game.name, length: 30 }"
                        :description="{ content: game.description, length: 150 }" :url="game.cover" />
                </div>
                <SignComponent v-else content="Theres no discount games in this moment." />
            </LoadingSection>
        </section>
        <section class="section-container vertical-container m-separator b-padding mid-aligner">
            <div>
                <h3 class="title-font">All Games</h3>
                <p class="text">All games published or announced by our studio.</p>
            </div>

            <LoadingSection :isLoading="gameStore.games.isLoading" :error="gameStore.games.error"
                class="horizontal-container m-separator wrap mid-aligner">
                <CardComponent v-for="game in gameStore.getGames" :key="game"
                    :title="{ content: game.name, length: 35 }"
                    :description="{ content: game.description, length: 150 }" :url="game.cover">
                    <p class="text">
                        state:
                        <span :style="{ color: gameStates[game.state].color }">
                            {{ gameStates[game.state].label }}
                        </span>
                    </p>

                    <div class="horizontal-container s-separator mid-aligner wrap">
                        <div v-for="tag in game.tags" :key="tag" class="tag-container">
                            <p class="text">{{ tag }}</p>
                        </div>
                    </div>

                    <div class="vertical-container s-separator mid-aligner" v-if="game.state === 'published'">
                        <p class="text">Available Platforms:</p>
                        <div class="horizontal-container s-separator mid-aligner wrap">
                            <ButtonComponent v-for="platform in game.platforms" :key="platform"
                                :color="platforms[platform.name].color" :content="platform.label" :href="platform.url"
                                :icon="platforms[platform.name].icon" />
                        </div>
                    </div>

                </CardComponent>
            </LoadingSection>
        </section>
    </div>
</template>

<script setup>
import CardComponent from '@components/CardComponent.vue'
import LoadingSection from '@components/LoadingSection.vue'
import { platforms, gameStates } from '@config/lists.config'
import ButtonComponent from '@components/ButtonComponent.vue'
import SignComponent from '@components/SignComponent.vue'
import { onMounted } from 'vue';
import { usegamesStore } from '@stores/games'

const gameStore = usegamesStore();

onMounted(async () => {
    await Promise.all([
        gameStore.Load(gameStore.games.key),
        gameStore.Load(gameStore.ftGame.key),
        gameStore.Load(gameStore.onDiscount.key)
    ])
})


</script>
<style scoped>
.section-container {
    width: 100%;
    border-bottom: 1px solid white;
}

.text-panel {
    min-width: 0;
    flex: 1;
}

.sticker {
    position: absolute;
    left: 85%;
    top: 55%;
}

.tag-container {
    background-color: var(--semi-transparent);
    padding: 0.5rem 1rem;

    border-radius: 10px;
}

@media (width < 970px) {
    .sticker {
        position: absolute;
        left: 65%;
        top: 70%;
        z-index: -1;

        max-width: 500px;
        max-height: 520px;
    }
}
</style>
