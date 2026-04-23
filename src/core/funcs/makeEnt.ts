import { fs } from '@core/constants/fs'
import { Ent } from '@task/constants/ent'
import { FileSystemEntryWithChildren } from 'bro-fs'

type FsEnt = FileSystemEntry | FileSystemEntryWithChildren

export async function makeEnt(fsEnt: FsEnt): Promise<Ent> {
    const stats = await fs.stat(fsEnt)

    const ent: Ent = {
        path: stats.fullPath,
        name: stats.name,
        isDir: stats.isDirectory,
        isFile: stats.isFile,
        mtime: stats.modificationTime.getTime(),
        size: stats.size
    }
    if ('children' in fsEnt) {
        ent.children = await Promise.all(
            fsEnt.children.map((childFsEnt) => {
                return makeEnt(childFsEnt)
            })
        )
    }
    return ent
}
