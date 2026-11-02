<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';

interface TurnstileAPI {
  render: (
    container: HTMLElement,
    options: Record<string, unknown>
  ) => string;

  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileAPI;
  }
}

const emit = defineEmits<{
  verify: [token: string | null];
}>();

const container = ref<HTMLElement | null>(null);
let widgetId: string | null = null;

function reset() {
  emit('verify', null);

  if (widgetId) {
    window.turnstile?.reset(widgetId);
  }
}

onMounted(() => {
  if (!window.turnstile || !container.value) {
    console.error('Cloudflare Turnstile is not available.');
    emit('verify', null);
    return;
  }

  widgetId = window.turnstile.render(container.value, {
    sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
    theme: 'auto',
    language: 'es',
    action: 'contact',

    callback: (token: string) => {
      emit('verify', token);
    },

    'expired-callback': () => {
      emit('verify', null);
    },

    'error-callback': () => {
      emit('verify', null);
    }
  });
});

onBeforeUnmount(() => {
  if (widgetId) {
    window.turnstile?.remove(widgetId);
    widgetId = null;
  }
});

defineExpose({ reset });
</script>

<template>
  <div ref="container"></div>
</template>
