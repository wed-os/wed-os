import { normPath } from '@task/funcs/normPath'

/** @public */
export function joinPath(...paths: string[]): string {
    return normPath(paths.join('/'))
}
