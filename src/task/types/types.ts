/** @public */
export type Obj<T = unknown> = Record<string, T>

/** @public */
export type Asyncify<F> = F extends (...args: infer A) => infer R
    ? (...args: A) => Promise<Awaited<R>>
    : never

/** @public */
export type Loose<T extends string, L = string> = T | (L & {})

/** @public */
export type ReturnAwaitedType<T extends (...args: any) => any> = Awaited<ReturnType<T>>
