export interface ConfigOption {
  id: string | number
  name: string
}

export interface GameStatus extends ConfigOption {
  id: number
  color: string
}

export interface GamesConfig {
  statuses: GameStatus[]
  platforms: ConfigOption[]
  stores: ConfigOption[]
  defaultStatusId: number
}

export interface NewsConfig {
  limitPreviewChars: number
}

export interface MailConfig {
  supportEmail: string
  publishersEmail: string
  timeout: number
  userRetries: number
}

export interface SocialAccount {
  key: string
  name: string
  color: string
  url: string
}

export interface SocialsConfig {
  accounts: SocialAccount[]
}

/** Cada área de configuración con el tipo de su documento `data`. */
export interface ConfigByArea {
  games: GamesConfig
  news: NewsConfig
  mail: MailConfig
  socials: SocialsConfig
}

export type ConfigArea = keyof ConfigByArea
