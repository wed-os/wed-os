import { fs } from '@core/constants/fs'
import { entToPath } from '@core/funcs/entToPath'
import { makeEnt } from '@core/funcs/makeEnt'
import { Ent } from '@task/constants/ent'

/** @public */
export async function readDir(path: string | Ent, deep: boolean = false): Promise<Ent[]> {
    path = entToPath(path)

    const fsEnts = await fs.readdir(path, { deep })
    const ents = await Promise.all(fsEnts.map((fsEnt) => makeEnt(fsEnt)))

    return ents
}
