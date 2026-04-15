import { DesktopBgType } from '@task/constants/desktopBgTypes'
import { enum_ } from '@task/constants/zod'
import { proxy } from 'valtio'
import { object, output, string } from 'zod'

export const desktopBgSchema = object({
    /**
     * Kiểu hình nền hiện tại.
     */
    type: enum_(DesktopBgType),
    /**
     * Đường dẫn hình ảnh nền desktop.
     */
    imagePath: string(),
    /**
     * Màu nền desktop.
     */
    color: string()
})

/**
 * Hình nền desktop.
 */
export type DesktopBg = output<typeof desktopBgSchema>

export const desktopBg = proxy<DesktopBg>({
    type: DesktopBgType.Image,
    imagePath: '/C/images/wallpapers/cute-little-girl.jpg',
    color: '#312e81'
})
