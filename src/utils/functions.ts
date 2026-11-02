export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)

export function formatNumber(value: number): string {
  return value.toString().padStart(2, '0')
}
export function formatDate(date?: string): string {
  if (!date) return '???'

  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date))
}

export function byParrafs(text: string, max: number) {
  if (!text) return []
  const parrafs = []
  const words = text.trim().split(/\s+/)

  for (let i = 0; i < words.length; i += max) {
    parrafs.push(words.slice(i, i + max).join(' '))
  }

  return parrafs
}

export function shuffleArray(a: any[]) {
  const shuffled = [...a];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
