<template>
  <router-link to="/home">
    <img src="/images/static/studio_logo.webp" class="logo" :style="{ margin: margin }"/>
  </router-link>
</template>

<script setup>
defineProps({
    margin: {
        type: String,
        default: '1rem'
    }
})
</script>

<style>
.logo {
  width: 45vw;
  height: auto;

  max-width: 450px;
  max-height: 350px;

  object-fit: contain;
}

@media (width < 970px) {
  .logo {
    width: 65vw;
    max-width: 280px;
  }
}
</style>
