import { basePath } from '@task/funcs/basePath'

export function stemPath(path: string): string {
    const base = basePath(path)

    const lastDotIndex = base.lastIndexOf('.')
    if (lastDotIndex === -1) return base

    return base.slice(0, lastDotIndex)
}
