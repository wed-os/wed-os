import { isAbsPath } from '@task/funcs/isAbsPath'
import { joinPath } from '@task/funcs/joinPath'

export function resolvePath(...paths: string[]): string {
    const start = paths.findLastIndex((path) => isAbsPath(path))
    if (start > 0) {
        paths = paths.slice(start)
    }
    return joinPath(...paths)
}
