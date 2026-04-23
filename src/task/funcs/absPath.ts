import { resolvePath } from '@task/funcs/resolvePath'

/** @public */
export function absPath(...paths: string[]): string {
    return resolvePath('/', ...paths)
}
