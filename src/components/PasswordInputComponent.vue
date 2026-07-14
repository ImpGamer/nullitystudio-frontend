<template>
  <label class="text" for="password">Password:</label>
  <div class="input-wrapper">
    <input :type="show ? 'text' : 'password'" 
      id="password" 
      placeholder="*********"
      :value="model"
      @input="model = $event.target.value"
      />
    <button type="button" @click="show = !show" tabindex="-1">
      {{ show ? '🙈' : '👁️' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const model = defineModel();
const show = ref(false)
</script>

<style>
.input-wrapper {
  position: relative;
  width: 100%;
}

.input-wrapper input {
  width: 100%;
  padding-right: 2.5rem;
}

.input-wrapper button {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);

  /* limpiar estilos de botón */
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
}
</style>
