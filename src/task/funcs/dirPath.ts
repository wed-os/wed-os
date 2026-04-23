import { splitPath } from '@task/funcs/splitPath'

/** @public */
export function dirPath(path: string): string {
    const [nodes, root] = splitPath(path)
    return root + nodes.slice(0, -1).join('/')
}
