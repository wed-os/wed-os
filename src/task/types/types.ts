export type Obj<T = unknown> = Record<string, T>

export type Asyncify<F> = F extends (...args: infer A) => infer R
    ? (...args: A) => Promise<Awaited<R>>
    : never

export type LooseString<T extends string> = T | (string & {})
