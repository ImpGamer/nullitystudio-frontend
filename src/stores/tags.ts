import { defineStore } from "pinia";

export const useTagsStore = defineStore('tags', () => {
    const tags: string[] = [
        'development',
        'studio',
        'internal',
        'announcement',
    ]

    return {
        tags,
        count: tags.length
    }
})