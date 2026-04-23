import { AppType } from '@task/constants/appTypes'
import { FontIconName } from '@task/constants/iconNames'
import { enum_, nanoid_ } from '@task/constants/zod'
import { boolean, int, object, output, string } from 'zod'

/** @public */
export const appSchema = object({
    /** ID của ứng dụng. */
    id: nanoid_(),

    /** Đường dẫn thư mục chứa mã nguồn ứng dụng. */
    path: string(),

    /** Tên ứng dụng. */
    name: string(),

    /** Kiểu ứng dụng. */
    type: enum_(AppType),

    /** Icon ứng dụng. */
    icon: string(),

    /** Tiêu đề hiển thị. */
    title: string().optional(),

    /** Mở rộng cửa sổ. */
    maximized: boolean().optional(),

    /** Thu nhỏ cửa sổ. */
    minimized: boolean().optional(),

    /** Toàn màn hình. */
    fullscreen: boolean().optional(),

    width: int().optional(),
    height: int().optional(),
    x: int().gt(0).optional(),
    y: int().gt(0).optional(),

    /** Ẩn thanh tiêu đề trên cửa sổ. */
    noHeader: boolean().optional()
})

/**
 * Một ứng dụng.
 *
 * @public
 */
export interface App extends output<typeof appSchema> {}

export const defaultAppIcon: FontIconName = 'window'
