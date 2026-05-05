import { fs } from '@core/constants/fs'
import { entToPath } from '@core/funcs/entToPath'
import { makeEnt } from '@core/funcs/makeEnt'
import { Ent } from '@task/constants/ent'

/**
 * Ghi dữ liệu vào file.
 *
 * @param path Đường dẫn hoặc {@linkcode Ent}
 * @param data Dữ liệu cần ghi.
 * @returns Trả về một {@linkcode Ent}
 * @public
 */
export async function writeFile(
    path: string | Ent,
    data: string | ArrayBuffer | Blob | File
): Promise<Ent> {
    path = entToPath(path)

    const fsFile = await fs.writeFile(path, data)
    return makeEnt(fsFile)
}
