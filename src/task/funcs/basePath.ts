import { splitPath } from '@task/funcs/splitPath'

/** @public */
export function basePath(path: string): string {
    const [nodes] = splitPath(path)
    return nodes.at(-1) ?? ''
}
