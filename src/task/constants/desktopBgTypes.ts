/**
 * Kiểu hình nền desktop.
 *
 * @public
 */
export enum DesktopBgType {
    Image = 'image',
    Solid = 'solid',
    None = 'none'
}

/** @public */
export interface DesktopBgTypeItem {
    value: DesktopBgType
    label: string
    description: string
}

/** @public */
export const desktopBgTypeItems: DesktopBgTypeItem[] = [
    {
        value: DesktopBgType.Image,
        label: 'Hình ảnh',
        description: 'Đặt hình ảnh làm hình nền desktop.'
    },
    {
        value: DesktopBgType.Solid,
        label: 'Màu trơn',
        description: 'Sử dụng màu duy nhất làm hình nền desktop.'
    },
    {
        value: DesktopBgType.None,
        label: 'Trống',
        description: 'Không đặt hình nền desktop.'
    }
]
