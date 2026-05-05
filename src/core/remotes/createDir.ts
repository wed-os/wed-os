import { fs } from '@core/constants/fs'
import { makeEnt } from '@core/funcs/makeEnt'
import { Ent } from '@task/constants/ent'

/** @public */
export async function createDir(path: string): Promise<Ent> {
    const fsDir = await fs.mkdir(path)
    return makeEnt(fsDir)
}
