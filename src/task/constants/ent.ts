import { array, boolean, int, object, output, string } from 'zod'

/** @public */
export const entSchema = object({
    /** Đường dẫn tập tin/thư mục. */
    path: string(),

    /** Tên tập tin/thư mục. */
    name: string(),

    /** Có phải thư mục không. */
    isDir: boolean(),

    /** Có phải tập tin không. */
    isFile: boolean(),

    /** Thời gian sửa đổi lần cuối (Unix timestamp, mili-giây). */
    mtime: int(),

    /** Kích thước tập tin, tính bằng byte. Bằng 0 nếu là thư mục. */
    size: int(),

    /** Các mục con của thư mục này khi đọc thư mục với deep. */
    get children() {
        return array(entSchema).optional()
    }
})

/**
 * Một đối tượng đại diện cho tập tin hoặc thư mục.
 *
 * @public
 */
export interface Ent extends output<typeof entSchema> {}
