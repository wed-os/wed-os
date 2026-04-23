let nextId: number = 0

/** @public */
export function getNextId(): number {
    return ++nextId
}
