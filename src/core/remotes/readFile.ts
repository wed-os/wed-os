import { fs } from '@core/constants/fs'
import { entToPath } from '@core/funcs/entToPath'
import { Ent } from '@task/types/Ent'

type ResultMap = {
    dataUrl: string
    buffer: ArrayBuffer
    blob: Blob
    file: File
    text: string
}
const fsTypesMap: Record<keyof ResultMap, string> = {
    dataUrl: 'DataURL',
    buffer: 'ArrayBuffer',
    blob: 'Blob',
    file: 'File',
    text: 'Text'
}

/**
 * Đọc dữ liệu file.
 *
 * @param path Đường dẫn hoặc {@linkcode Ent}
 * @param type Kiểu dữ liệu trả về.
 */
export async function readFile<T extends keyof ResultMap = 'text'>(
    path: string | Ent,
    type = 'text' as T
): Promise<ResultMap[T]> {
    path = entToPath(path)

    const fsType = fsTypesMap[type]
    const result = await fs.readFile(path, { type: fsType as any })

    return result as ResultMap[T]
}
