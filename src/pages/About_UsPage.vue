<template>
    <div class="main-container b-padding">
        <section class="vertical-container m-separator mid-aligner">
            <h3 class="title-font">¿What is Nullity Studio?</h3>
            <p class="text">
                We are an independent game development studio founded in Mexico in 2026 by David Romero.
                Our work is driven by a passion for horror, adventure, and psychological terror,
                focusing on creating immersive experiences, memorable stories, and impactful moments
                that stay with players long after they finish playing. While our core focus lies in dark
                and atmospheric genres, we are not limited by them. We enjoy experimenting with
                different styles and mechanics, including puzzle games, FPS, multiplayer experiences,
                and party games, always seeking new ways to surprise and engage players—whether playing
                solo or with others.
            </p>
            <img class="general-img" src="https://res.cloudinary.com/dtohisibj/image/upload/ths_1_sticker_nyph4w.png"
                alt="about-us" />
        </section>
    </div>
</template>

<script setup>
defineProps({
    isMobile: {
        Type: Boolean,
        required: true,
    },
})
</script>
