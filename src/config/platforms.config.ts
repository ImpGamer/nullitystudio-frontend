import {
    IconBrandWindows, IconBrandDebian, IconBrandXbox, IconPlaystationTriangle,
    IconBrandGooglePlay, IconCubeOff, IconBrandSteam, IconBrandItch, IconDeviceNintendo,
    IconWorldWww, IconBrandApple, IconBrandAndroid, IconSquareLetterE, IconBrandYoutube,
    IconBrandX, IconBrandInstagram,
    IconBrandFacebook,
    IconBrandTiktok,
    IconBrandDiscord,
    IconBrandTwitch,
    IconBrandReddit,
    IconBrandLinkedin,
    IconBrandBluesky,
    IconBrandGithub,
    IconBrandGitlab,
    IconBrandKick,
    IconBrandMastodon,
    IconBrandPatreon,
    IconBrandPinterest,
    IconBrandSnapchat,
    IconBrandSoundcloud,
    IconBrandSpotify,
    IconBrandTelegram,
    IconBrandThreads,
    IconBrandWhatsapp,
    IconBrandPaypal
} from "@tabler/icons-vue";

export const iconsPlatforms = {
  // Sistemas operativos y plataformas
  windows: IconBrandWindows,
  linux: IconBrandDebian,
  xbox: IconBrandXbox,
  playstation: IconPlaystationTriangle,
  googleplay: IconBrandGooglePlay,
  nintendo: IconDeviceNintendo,
  web: IconWorldWww,
  steam: IconBrandSteam,
  itchio: IconBrandItch,
  ios: IconBrandApple,
  android: IconBrandAndroid,
  epicgames: IconSquareLetterE,

  // Redes sociales y comunidades
  youtube: IconBrandYoutube,
  x: IconBrandX,
  instagram: IconBrandInstagram,
  facebook: IconBrandFacebook,
  tiktok: IconBrandTiktok,
  discord: IconBrandDiscord,
  twitch: IconBrandTwitch,
  reddit: IconBrandReddit,
  linkedin: IconBrandLinkedin,
  whatsapp: IconBrandWhatsapp,
  telegram: IconBrandTelegram,
  pinterest: IconBrandPinterest,
  snapchat: IconBrandSnapchat,
  threads: IconBrandThreads,
  mastodon: IconBrandMastodon,
  bluesky: IconBrandBluesky,

  // Desarrollo y tecnología
  github: IconBrandGithub,
  gitlab: IconBrandGitlab,

  // Música y streaming
  spotify: IconBrandSpotify,
  soundcloud: IconBrandSoundcloud,
  kick: IconBrandKick,

  // Creadores y pagos
  patreon: IconBrandPatreon,
  paypal: IconBrandPaypal,
} as const;

export type PlatformKey = keyof typeof iconsPlatforms;

export function getIconPlatform(p: string) {
  const platform = p
    .trim()
    .replace(/[- _]/g, '')
    .toLowerCase() as PlatformKey;

  return iconsPlatforms[platform] ?? IconCubeOff;
}