/** @public */
export const sizes = ['medium', 'small', 'large'] as const

/** @public */
export type Size = (typeof sizes)[number]
