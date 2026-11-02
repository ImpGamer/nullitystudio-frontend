import {
    IconBrandWindows, IconBrandDebian, IconBrandFinder, IconBrandAndroid, IconBrandApple,
    IconWorldWww, IconBrandXbox, IconPlaystationTriangle, IconDeviceNintendo, IconBrandSteam,
    IconBrandItch, IconBrandFortnite, IconHexagonLetterG, IconBrandGooglePlay, IconBrandAppstore,
    IconDownload, IconBrandGithub,
    IconCubeOff
} from "@tabler/icons-vue";
import type { Component } from "vue";

const IconsPlatforms: Record<string, Component> = {
    'Windows': IconBrandWindows,
    'Linux': IconBrandDebian,
    'MacOS': IconBrandFinder,
    'Android': IconBrandAndroid,
    'IOS': IconBrandApple,
    'Web': IconWorldWww,
    'Xbox': IconBrandXbox,
    'PlayStation': IconPlaystationTriangle,
    'Nintendo': IconDeviceNintendo,
    'Steam': IconBrandSteam,
    'Itchio': IconBrandItch,
    'Epic-Games': IconBrandFortnite,
    'GOG': IconHexagonLetterG,
    'PlayStore': IconBrandGooglePlay,
    'AppStore': IconBrandAppstore,
    'Downloable': IconDownload,
    'Github': IconBrandGithub,
}

export const getIconPlatform = (platform: string) => {
    return IconsPlatforms[platform] ??
        IconCubeOff
}