import { nanoid_ } from '@task/constants/zod'
import { metaSchema } from '@task/states/meta'
import { boolean, object } from 'zod'

export const appSchema = object({
    /**
     * ID của ứng dụng.
     */
    id: nanoid_(),
    /**
     * Đường dẫn thư mục chứa mã nguồn ứng dụng.
     */
    path: metaSchema.shape.path,
    /**
     * Tên ứng dụng.
     */
    name: metaSchema.shape.name,
    /**
     * Kiểu ứng dụng.
     */
    type: metaSchema.shape.type,
    /**
     * Mở rộng cửa sổ.
     */
    maximized: boolean().optional(),
    /**
     * Toàn màn hình.
     */
    fullscreen: boolean().optional(),
    /**
     * Ẩn thanh tiêu đề trên cửa sổ.
     */
    noHeader: boolean().optional()
})
