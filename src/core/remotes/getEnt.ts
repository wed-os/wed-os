import { fs } from '@core/constants/fs'
import { entToPath } from '@core/funcs/entToPath'
import { makeEnt } from '@core/funcs/makeEnt'
import { Ent } from '@task/constants/ent'

/** @public */
export async function getEnt(path: string | Ent): Promise<Ent> {
    path = entToPath(path)

    const fsEnt = await fs.getEntry(path)
    return makeEnt(fsEnt)
}
