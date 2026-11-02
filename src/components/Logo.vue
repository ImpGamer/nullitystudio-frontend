<template>
  <div class="brand">
    <img src="/src/assets/images/static/studio_logo.webp" alt="studio_logo"/>
    <span>NULLITY STUDIO</span>
  </div>
</template>

<style>
.brand {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
}

.brand img {
    max-width: 40px;
    max-height: 40px;
}

.brand span {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 16px;
    letter-spacing: .06em;
}
</style>
