<template>
    <div class="app-loader" role="status" aria-live="polite">
        <span class="app-loader__spinner" aria-hidden="true"></span>
        <p class="app-loader__label">{{ label }}</p>
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        label?: string
    }>(),
    {
        label: '// Loading',
    }
)
</script>

<style scoped>
.app-loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;

    width: 100%;
    padding: clamp(36px, 6vw, 72px) 20px;
}

.app-loader__spinner {
    width: 46px;
    height: 46px;

    border: 2px solid var(--line);
    border-top-color: var(--purple);
    border-radius: 50%;

    box-shadow: 0 0 18px -6px var(--purple);
    animation: loader-spin 0.75s linear infinite;
}

.app-loader__label {
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
    font-weight: 300;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);

    animation: loader-blink 1.5s ease-in-out infinite;
}

@keyframes loader-spin {
    to {
        transform: rotate(360deg);
    }
}

@keyframes loader-blink {
    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.35;
    }
}

@media (prefers-reduced-motion: reduce) {
    .app-loader__spinner {
        animation-duration: 2.4s;
    }

    .app-loader__label {
        animation: none;
    }
}
</style>
