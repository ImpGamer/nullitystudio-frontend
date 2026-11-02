import axios from "axios";

function serializeParams(params: Record<string, any>): string {
    const query: string[] = []

    const append = (key: string, value: unknown): void => {
        if (value === undefined || value === null) return
        query.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    }

    Object.entries(params).forEach(([key, value]) => {
        // clave repetida: ?tags=a&tags=b (formato que espera el backend)
        if (Array.isArray(value)) value.forEach((item) => append(key, item))
        else append(key, value)
    })

    return query.join('&')
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: {
        serialize: serializeParams
    }
})

function isEmptyValue(value: any): boolean {
    if (value === undefined || value === null) return true
    if (typeof value === 'string' && value.trim() === '') return true
    if (Array.isArray(value) && value.length === 0) return true
    if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) return true
    return false
}

export function cleanFilters(filters?: Record<string, any>): Record<string, any> | undefined {
    if (!filters) return undefined

    const cleaned = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => !isEmptyValue(value))
    )

    return Object.keys(cleaned).length > 0 ? cleaned : undefined
}

export function isThereFilters(filters?: Record<string, any>): boolean {
    return cleanFilters(filters) !== undefined
}

export enum ResponseState {
    IDLE,
    LOADING,
    SUCCESS,
    ERROR
}

/**
 * true si el fallo merece reintento: backend caído (sin respuesta), 5xx o
 * un error que ni siquiera es de axios. Los 4xx son peticiones que el
 * backend ya contestó: reintentar no cambia el resultado.
 */
export function isServerFault(error: unknown): boolean {
    if (!axios.isAxiosError(error)) return true
    if (!error.response) return true

    return (error.response.status ?? 500) >= 500
}

export default api;
