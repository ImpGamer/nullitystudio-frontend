<template>
  <main class="bg vertical-container mid-aligner">
    <div class="login-pane vertical-container mid-aligner s-separator">
      <Logo />
      <h3 class="title-font">Admin Panel Login</h3>

      <form
        class="use-all-width bv-padding vertical-container mid-aligner s-separator"
        @submit.prevent
      >
        <div class="vertical-container start-aligner s-separator use-all-width">
          <label class="text" for="username">Username:</label>
          <input v-model="credentials.username" type="text" id="username" placeholder="admin1234" />
        </div>
        <div class="vertical-container start-aligner s-separator use-all-width">
          <PasswordInputComponent v-model="credentials.password" />
        </div>
        
        <ButtonComponent
          :busy="authenticating"
          style="margin-top: 20px"
          color="white"
          content="Login"
          @click="authenticate"
        />
      </form>
    </div>
  </main>
</template>
<script setup>
import Logo from '@components/Logo.vue'
import PasswordInputComponent from '@components/PasswordInputComponent.vue'
import ButtonComponent from '@components/ButtonComponent.vue'
import { reactive, ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const authenticating = ref(false)
const credentials = reactive({
  username: '',
  password: '',
})
const authenticate = async () => {
  authenticating.value = true

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    const json = await response.json();

    if (!response.ok) {
      toast.error(json.message ?? 'Authentication failed')
      return
    }

    console.log(`Token received: ${json.access_token}`)
  } catch {
    toast.error('Connection failed')
  } finally {
    authenticating.value = false
  }
}
</script>

<style>
.login-pane {
  background-color: var(--semi-transparent);
  border: 2px white solid;
  box-shadow: 20px 12px 6px 1px var(--primary-color);

  border-radius: 10px;
  min-width: 60vw;
  min-height: 75vh;
}

@media (width < 970px) {
  .login-pane {
    min-width: 90vw;
  }
}
</style>
