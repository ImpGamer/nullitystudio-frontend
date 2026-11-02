export type Page = {
    page: number,
    size: number,
}

export type PageResult<T> = {
    total: number,
    page: T[]
}