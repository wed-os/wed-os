import { nanoid } from 'nanoid'

/**
 * Tạo một nano ID.
 *
 * @param size Độ dài của ID. Mặc định là 21.
 * @returns Một nano ID.
 */
export function nanoId(size?: number): string {
    return nanoid(size)
}
