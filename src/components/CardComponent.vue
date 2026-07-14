<template>
    <div class="card vertical-container">
        <div class="content">
            <slot/>
        </div>
    </div>
</template>

<style scoped>
.card {
    border: 3.5px solid black;
    border-radius: 10px;
    box-shadow: 10px 5px 5px var(--secondary-color);

    width: clamp(300px, 25vw, 470px);
    min-height: 0;
}

/* Sección de contenido: ocupa la mitad inferior */
.content {
    min-height: 0;
    padding: 10px;

    box-sizing: border-box;

    overflow-y: auto;
    overflow-x: hidden;

    background-color: var(--primary-color);
    scrollbar-width: thin;
    scrollbar-color: var(--semi-transparent) var(--primary-color);
    scroll-behavior: smooth;
}

/* ─── Media query: pantallas < 970px ────────────────────────────────── */
@media (width < 970px) {
    .card {
        min-width: unset;
        max-width: 100%;
        width: 85vw;

        min-height: unset;
        max-height: unset;
        height: auto;
    }

    .multimedia-wrapper {
        flex: 0 0 200px;
        height: 200px;
    }
}
</style>