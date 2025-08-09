export type Brand<T, B> = T & { __brand: B }

export const objectKeys = <T extends object>(obj: T) => Object.keys(obj) as (keyof T)[]
