import { Ent } from '@task/constants/ent'

export function entToPath(ent: Ent | string): string {
    if (typeof ent == 'string') return ent
    return ent.path
}
