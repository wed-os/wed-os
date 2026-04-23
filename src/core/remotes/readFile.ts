import { fs } from '@core/constants/fs'
import { entToPath } from '@core/funcs/entToPath'
import { Ent } from '@task/constants/ent'

type ResultMap = {
    dataUrl: string
    buffer: ArrayBuffer
    blob: Blob
    file: File
    text: string
}
const fsTypesMap = {
    dataUrl: 'DataURL',
    buffer: 'ArrayBuffer',
    blob: 'Blob',
    file: 'File',
    text: 'Text'
} as const satisfies Record<keyof ResultMap, string>

/**
 * Đọc dữ liệu file.
 *
 * @param path Đường dẫn hoặc {@linkcode Ent}
 * @param type Kiểu dữ liệu trả về.
 * @public
 */
export async function readFile<T extends keyof ResultMap = 'text'>(
    path: string | Ent,
    type: keyof ResultMap = 'text'
): Promise<ResultMap[T]> {
    path = entToPath(path)

    const fsType = fsTypesMap[type] ?? 'Text'
    const result = await fs.readFile(path, { type: fsType as any })

    return result as ResultMap[T]
}
