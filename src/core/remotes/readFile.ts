import { fs } from '@core/constants/fs'
import { entToPath } from '@core/funcs/entToPath'
import { Ent } from '@task/constants/ent'

export function readFile(path: string | Ent, type?: 'text'): Promise<string>
export function readFile(path: string | Ent, type: 'buffer'): Promise<ArrayBuffer>
export function readFile(path: string | Ent, type: 'dataUrl'): Promise<string>
export function readFile(path: string | Ent, type: 'blob'): Promise<Blob>
export function readFile(path: string | Ent, type: 'file'): Promise<File>

/**
 * Đọc dữ liệu file.
 *
 * @param path Đường dẫn hoặc {@linkcode Ent}
 * @param type Kiểu dữ liệu trả về.
 * @public
 */
export async function readFile(
    path: string | Ent,
    type: 'text' | 'buffer' | 'dataUrl' | 'blob' | 'file' = 'text'
): Promise<string | ArrayBuffer | Blob | File> {
    path = entToPath(path)

    switch (type) {
        case 'text':
            return fs.readFile(path, { type: 'Text' })
        case 'buffer':
            return fs.readFile(path, { type: 'ArrayBuffer' })
        case 'dataUrl':
            return fs.readFile(path, { type: 'DataURL' })
        case 'blob':
            return fs.readFile(path, { type: 'Blob' })
        case 'file':
            return fs.readFile(path, { type: 'File' })
    }
}
