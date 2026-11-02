import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getConfig } from '@/api/config.api'
import type { ConfigArea, ConfigByArea } from '@/types/config'

type ConfigValue = ConfigByArea[ConfigArea]

export const useConfigStore = defineStore('config', () => {
  // Mapa área -> data. Vive en memoria durante toda la sesión y se comparte
  // entre todas las páginas que usen el store.
  const configs = ref(new Map<ConfigArea, ConfigValue>())

  // Peticiones en vuelo por área: dos componentes pidiendo `mail` a la vez
  // comparten la misma promesa en lugar de duplicar la llamada.
  const pending = new Map<ConfigArea, Promise<ConfigValue>>()

  async function get<A extends ConfigArea>(area: A): Promise<ConfigByArea[A]> {
    const cached = configs.value.get(area)
    if (cached !== undefined) return Promise.resolve(cached as ConfigByArea[A]);

    const inFlight = pending.get(area)
    if (inFlight) return inFlight as Promise<ConfigByArea[A]>

    const request = getConfig(area)
      .then((data) => {
        configs.value.set(area, data)
        return data
      })
      .finally(() => {
        pending.delete(area)
      })

    pending.set(area, request)
    return request
  }

  return {
    get,
  }
})
