import { Primitive } from '@task/funcs/isPrimitive'

type Skip =
    | Primitive
    | Function
    | Date
    | RegExp
    | Promise<any>
    | Node
    | Element
    | HTMLElement
    | Document
    | Window

// prettier-ignore
export type SafeSnapshot<T, Seen = never> =
    [T] extends [Seen] ? T :
    T extends Skip ? T :
    T extends readonly (infer U)[] ? ReadonlyArray<SafeSnapshot<U, Seen | T>>:
    T extends object ? { readonly [K in keyof T]: SafeSnapshot<T[K], Seen | T> } :
    T
