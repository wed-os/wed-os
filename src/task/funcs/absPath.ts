import { resolvePath } from '@task/funcs/resolvePath'

export function absPath(...paths: string[]): string {
    return resolvePath('/', ...paths)
}
