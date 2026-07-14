<template>
    <div class="main-container">
        <video class="bg-video" autoplay loop muted playsinline>
            <source src="/videos/SCP_Survive_1_bk.mp4" />
        </video>``

        <div class="video-bg-container vertical-container mid-aligner b-padding m-separator">
            <h1 class="highlighted title-font main-color">
                Nullity Studio
                <br />
                <p class="text">Indie Game Studio</p>
            </h1>
            <div class="m-separator horizontal-container mid-aligner wrap">
                <CardComponent url="https://res.cloudinary.com/dtohisibj/image/upload/ths_1_sticker_nyph4w.png"
                    :title="{ content: 'Our Games', length: 20 }">

                    <div class="vertical-container s-separator mid-aligner">
                        <p class="text">Throughout our journey we have built different types of games of all genres
                            and
                            for all types of audiences, discover them and find your next favorite game!</p>

                        <ButtonComponent content="Games" to="/games" color="black" icon="/images/icons/games.png" />
                    </div>

                </CardComponent>
                <CardComponent v-if="gamesStore.getLatest" :url="gamesStore.getLatest.cover"
                    :title="{ content: 'Latest Release', length: 20 }">
                    <div class="vertical-container mid-aligner use-all-width">
                        <div class="highlighted use-all-width s-separator vertical-container mid-aligner">
                            <p class="title-font main-color">Play Now!</p>

                            <p class="text main-color">{{ gamesStore.getLatest.name }}</p>
                            <div class="horizontal-container s-separator">
                                <ButtonComponent v-for="platform in gamesStore.getLatest.platforms" :key="platform"
                                    :icon="platforms[platform.name].icon" :content="platforms[platform.name].name"
                                    :color="platforms[platform.name].color" :href="platform.url" />
                            </div>
                        </div>
                    </div>
                </CardComponent>
                <CardComponent v-else url="/images/static/default_img.webp"
                    :title="{ content: 'Latest Release', lenght: 20 }">
                    <LoadingSection :isLoading="gamesStore.ltGame.isLoading" :error="gamesStore.ltGame.error" />
                </CardComponent>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue'
import CardComponent from '@components/CardComponent.vue'
import ButtonComponent from '@components/ButtonComponent.vue'
import LoadingSection from '@components/LoadingSection.vue'
import { platforms } from '@config/lists.config'
import { usegamesStore } from '@stores/games'

const gamesStore = usegamesStore()

onMounted(async () => {
    await gamesStore.Load(gamesStore.ltGame.key)
})
</script>
