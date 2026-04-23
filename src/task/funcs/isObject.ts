import { Obj } from '@task/types/types'

/** @public */
export function isObject(val: unknown): val is Obj {
    return val !== null && typeof val === 'object'
}
