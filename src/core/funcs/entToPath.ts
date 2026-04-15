import { Ent } from '@task/types/Ent'

export function entToPath(ent: Ent | string): string {
    if (typeof ent == 'string') return ent
    return ent.path
}
