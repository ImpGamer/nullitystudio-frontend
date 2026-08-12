import { computed } from 'vue'
import { defineStore } from 'pinia'
import type { FilterResult, Game } from '@utils/interfaces'
import { Pagination } from '@utils/classes'

export const useGamesStore = defineStore('games', () => {
    const games: Record<number, Game> = {
        0: {
            id: 0,
            title: 'The Foundation Survive',
            description: `
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Amet iste mollitia minima cum facilis dignissimos.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure libero modi nisi dignissimos labore quod reprehenderit, unde dolor ipsam debitis ut optio nihil laudantium vero maxime architecto sequi. Dolores, facilis.
            `,
            short_description: 'A survival horror game set inside a mysterious facility.',
            status: 1,
            trailer: 'e96tSAS0R6c',
            cover: 'https://res.cloudinary.com/dtohisibj/image/upload/v1767559690/Dise%C3%B1o_sin_t%C3%ADtulo_1_iwkb4m.png',
            gallery: [
                'https://res.cloudinary.com/dtohisibj/image/upload/v1767559690/Dise%C3%B1o_sin_t%C3%ADtulo_1_iwkb4m.png',
                'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80'
            ],
            tags: [
                'Horror',
                'Action',
                'SinglePlayer'
            ],
            history: {
                title: 'A foundation in the shadows',
                description: 'No one can survive here.'
            },
            date: undefined,
            studio: 'Nullity Studio',
            platforms: [
                'Windows',
                'Linux'
            ],
            links: {
                Steam: 'https://store.steampowered.com/app/4087840/The_Foundation_Survive_Artificial_Home/',
                Itchio: 'https://nullity-studio.itch.io/foundation-survive'
            }
        },
        1: {
            id: 1,
            title: 'Jade Signal',
            description: 'An exploration adventure about decoding a forgotten transmission from a jungle observatory. Players restore antennas, catalog strange wildlife, and uncover why the signal keeps repeating their own voice.',
            short_description: 'Decode a looping transmission from a lost jungle observatory.',
            status: 2,
            trailer: 'dQw4w9WgXcQ',
            cover: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80'
            ],
            tags: [
                'Adventure',
                'Mystery',
                'Exploration'
            ],
            history: {
                title: 'The signal under the canopy',
                description: 'A research team vanished after reporting a voice hidden inside the storm noise.'
            },
            date: '2026-04-18',
            studio: 'Nullity Studio',
            platforms: [
                'Windows',
                'Linux'
            ],
            links: {
                Steam: 'https://store.steampowered.com/',
                Itchio: 'https://itch.io/'
            }
        },
        2: {
            id: 2,
            title: 'The Red Meridian',
            description: 'A tactical horror prototype set in an abandoned polar relay station. Manage heat, route power through failing systems, and choose which rooms stay lit while something moves outside the windows.',
            short_description: 'Keep a polar relay station alive while the dark pushes back.',
            status: 2,
            trailer: 'aqz-KE-bpKQ',
            cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=1200&q=80'
            ],
            tags: [
                'Horror',
                'Strategy',
                'Survival'
            ],
            history: {
                title: 'A line across the ice',
                description: 'The meridian was drawn to measure the world, but something else used it as a door.'
            },
            date: '2026-09-12',
            studio: 'Nullity Studio',
            platforms: [
                'Windows',
                'MacOS'
            ],
            links: {
                Steam: 'https://store.steampowered.com/',
                GOG: 'https://www.gog.com/'
            }
        },
        3: {
            id: 3,
            title: 'Null Harbor',
            description: 'A narrative investigation game in a rain-soaked port city where every ship manifest has been altered overnight. Interrogate crews, compare evidence, and follow the missing cargo into the old tunnels.',
            short_description: 'Investigate altered ship records in a haunted industrial harbor.',
            status: 1,
            trailer: 'ScMzIvxBSi4',
            cover: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
            ],
            tags: [
                'Detective',
                'Narrative',
                'Noir'
            ],
            history: {
                title: 'The city edits itself',
                description: 'By sunrise, the harbor records no longer matched the harbor itself.'
            },
            date: '2025-11-07',
            studio: 'Nullity Studio',
            platforms: [
                'Windows',
                'Linux',
                'MacOS'
            ],
            links: {
                Steam: 'https://store.steampowered.com/',
                Itchio: 'https://itch.io/'
            }
        },
        4: {
            id: 4,
            title: 'Orbital Janitor',
            description: 'A cozy systems game about cleaning derelict satellites before they fall into populated worlds. Salvage panels, repair orbit paths, and discover personal logs left in the machinery.',
            short_description: 'Clean and repair derelict satellites before orbital decay wins.',
            status: 9,
            trailer: 'ysz5S6PUM-U',
            cover: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1200&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80'
            ],
            tags: [
                'Simulation',
                'Cozy',
                'Sci-Fi'
            ],
            history: {
                title: 'Small jobs above a loud planet',
                description: 'A maintenance worker finds old messages hidden inside obsolete orbital hardware.'
            },
            date: '2027-02-20',
            studio: 'Nullity Studio',
            platforms: [
                'Windows',
                'Linux'
            ],
            links: {
                Steam: 'https://store.steampowered.com/',
                Epic_Games: 'https://store.epicgames.com/'
            }
        },
        5: {
            id: 5,
            title: 'Ashen Choir',
            description: 'A rhythm-action roguelite where spells are sung through corrupted cathedral organs. Each run changes the choir, the key, and the enemies that answer your melody.',
            short_description: 'Fight with corrupted music inside a burning cathedral.',
            status: 3,
            trailer: 'M7lc1UVf-VE',
            cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1200&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
            ],
            tags: [
                'Rhythm',
                'Action',
                'Roguelite'
            ],
            history: {
                title: 'The last note never ended',
                description: 'A choir sang during the fire, and the city still hears it under the streets.'
            },
            date: '2026-12-03',
            studio: 'Nullity Studio',
            platforms: [
                'Windows'
            ],
            links: {
                Steam: 'https://store.steampowered.com/',
                Itchio: 'https://itch.io/'
            }
        },
        6: {
            id: 6,
            title: 'Circuit Garden',
            description: 'A puzzle sandbox where plants grow through broken circuit boards. Redirect roots, light, and water to rebuild tiny machine ecosystems.',
            short_description: 'Grow living circuits in a quiet puzzle sandbox.',
            status: 1,
            trailer: 'jNQXAC9IVRw',
            cover: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80'
            ],
            tags: [
                'Puzzle',
                'Sandbox',
                'Relaxing'
            ],
            history: {
                title: 'Where machines learned to bloom',
                description: 'An abandoned laboratory starts producing flowers from old silicon.'
            },
            date: '2025-08-29',
            studio: 'Nullity Studio',
            platforms: [
                'Windows',
                'MacOS'
            ],
            links: {
                Steam: 'https://store.steampowered.com/',
                GOG: 'https://www.gog.com/'
            }
        },
        7: {
            id: 7,
            title: 'Blackbox Courier',
            description: 'A stealth delivery game about crossing a surveillance-heavy megacity with one package you are never allowed to open.',
            short_description: 'Deliver one sealed package across a watched megacity.',
            status: 2,
            trailer: 'kJQP7kiw5Fk',
            cover: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80'
            ],
            tags: [
                'Stealth',
                'Cyberpunk',
                'SinglePlayer'
            ],
            history: {
                title: 'Never open the case',
                description: 'Every camera in the city turns toward a courier carrying unknown cargo.'
            },
            date: '2026-05-24',
            studio: 'Nullity Studio',
            platforms: [
                'Windows',
                'Linux'
            ],
            links: {
                Steam: 'https://store.steampowered.com/',
                Epic_Games: 'https://store.epicgames.com/'
            }
        },
        8: {
            id: 8,
            title: 'Pale Tide Protocol',
            description: 'A cooperative extraction game set on floating research platforms during a permanent eclipse. Recover samples, seal breaches, and leave before the tide changes color.',
            short_description: 'Extract samples from ocean labs under a permanent eclipse.',
            status: 3,
            trailer: '9bZkp7q19f0',
            cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80'
            ],
            tags: [
                'Cooperative',
                'Extraction',
                'Horror'
            ],
            history: {
                title: 'The water turned white',
                description: 'The first team returned with sealed samples and no memory of the sea.'
            },
            date: '2027-06-06',
            studio: 'Nullity Studio',
            platforms: [
                'Windows'
            ],
            links: {
                Steam: 'https://store.steampowered.com/',
                Itchio: 'https://itch.io/'
            }
        },
        9: {
            id: 9,
            title: 'Static Bloom',
            description: 'A short first-person mystery about photographing impossible flowers that only appear in analog camera noise.',
            short_description: 'Photograph impossible flowers hidden inside analog static.',
            status: 1,
            trailer: 'aqz-KE-bpKQ',
            cover: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80'
            ],
            tags: [
                'Mystery',
                'Short',
                'Experimental'
            ],
            history: {
                title: 'A garden recorded on tape',
                description: 'An old camera reveals a place no one can reach directly.'
            },
            date: '2025-03-14',
            studio: 'Nullity Studio',
            platforms: [
                'Windows',
                'Linux',
                'MacOS'
            ],
            links: {
                Itchio: 'https://itch.io/',
                Steam: 'https://store.steampowered.com/'
            }
        },
        10: {
            id: 10,
            title: 'Iron Lullaby',
            description: 'A side-scrolling action game where an old combat automaton protects a sleeping city from machines that remember the war.',
            short_description: 'Protect a sleeping city as a forgotten combat automaton.',
            status: 2,
            trailer: 'M7lc1UVf-VE',
            cover: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1200&q=80'
            ],
            tags: [
                'Action',
                'Platformer',
                'Sci-Fi'
            ],
            history: {
                title: 'A weapon learns silence',
                description: 'The last machine built for war becomes the first guardian of peace.'
            },
            date: '2026-10-30',
            studio: 'Nullity Studio',
            platforms: [
                'Windows'
            ],
            links: {
                Steam: 'https://store.steampowered.com/',
                GOG: 'https://www.gog.com/'
            }
        },
        11: {
            id: 11,
            title: 'The Last Campfire Route',
            description: 'A resource-management road game about guiding a small caravan across a cold country where campfires are also memory checkpoints.',
            short_description: 'Guide a caravan through cold roads and fading memories.',
            status: 9,
            trailer: 'jNQXAC9IVRw',
            cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80'
            ],
            tags: [
                'Management',
                'Narrative',
                'Survival'
            ],
            history: {
                title: 'Fire as a map',
                description: 'Every campfire restores warmth, but takes one memory from the road behind.'
            },
            date: '2027-01-16',
            studio: 'Nullity Studio',
            platforms: [
                'Windows',
                'Linux'
            ],
            links: {
                Steam: 'https://store.steampowered.com/',
                Itchio: 'https://itch.io/'
            }
        }
    }

    const gamesList = computed(() => Object.values(games))
    const gameCount = computed(() => gamesList.value.length)
    const featured = computed(() => gamesList.value[0].id)

    const publishedGames = computed(() => {
        return gamesList.value.filter(game => game.status === 1)
    })

    function getGameById(id: number): Game | undefined {
        return games[id]
    }

    function escapeRegex(value: string): string {
        return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    }

    function filterGamesByTitle(search: string, page: number, size: number): FilterResult {
        const query = search.trim()
        let filtered = gamesList.value

        if (query && /[*?]/.test(query)) {
            const globRegex = new RegExp(
                escapeRegex(query)
                    .replace(/\\\*/g, '.*')
                    .replace(/\\\?/g, '.'),
                'i'
            )
            filtered = gamesList.value.filter(game => globRegex.test(game.title))
        } else if (query) {
            try {
                const regex = new RegExp(query, 'i')
                filtered = gamesList.value.filter(game => regex.test(game.title))
            } catch {
                const normalizedQuery = query.toLowerCase()
                filtered = gamesList.value.filter(game =>
                    game.title.toLowerCase().includes(normalizedQuery)
                )
            }
        }

        return {
            result: new Pagination(filtered).of(page, size),
            count: filtered.length
        }
    }

    return {
        games: gamesList.value,
        gameCount,
        publishedGames,
        getGameById,
        filterGamesByTitle,
        featured: () => getGameById(featured.value)
    }
})
