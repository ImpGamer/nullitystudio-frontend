import api from './axios'
import type { ConfigArea, ConfigByArea } from '@/types/config'

const base = '/config'

/** Configuración de un área (`games`, `news`, `mail`, `socials`). */
export async function getConfig<A extends ConfigArea>(area: A): Promise<ConfigByArea[A]> {
  const response = await api.get<ConfigByArea[A]>(`${base}/${area}`)
  return response.data
}
