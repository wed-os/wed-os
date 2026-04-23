import { basePath } from '@task/funcs/basePath'

/** @public */
export function extPath(path: string): string {
    const base = basePath(path)

    const lastDotIndex = base.lastIndexOf('.')
    if (lastDotIndex === -1) return ''

    return base.slice(lastDotIndex + 1)
}
