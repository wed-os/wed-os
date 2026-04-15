import { normPath } from '@task/funcs/normPath'

export function joinPath(...paths: string[]): string {
    return normPath(paths.join('/'))
}
