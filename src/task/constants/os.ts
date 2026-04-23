import { appSchema } from '@task/constants/app'
import { DesktopBgType } from '@task/constants/desktopBgTypes'
import { makeTask, Task, taskSchema } from '@task/constants/task'
import { enum_ } from '@task/constants/zod'
import { proxy } from 'valtio'
import { array, int, object, output, string } from 'zod'

export const storeSchema = object({
    /** Danh sách ứng dụng đã cài đặt. */
    apps: array(appSchema),

    /** Danh sách các task đang chạy. */
    tasks: array(taskSchema),

    taskbarHeight: int(),
    desktopWidth: int().gt(0),
    desktopHeight: int().gt(0),
    desktopX: int(),
    desktopY: int(),

    /** Kiểu hình nền hiện tại. */
    desktopBgType: enum_(DesktopBgType),

    /** Đường dẫn hình ảnh nền desktop. */
    desktopBgImagePath: string(),

    /** Màu nền desktop. */
    desktopBgColor: string(),

    /** Tên hệ điều hành. */
    osName: string()
})

export interface Store extends output<typeof storeSchema> {}

export interface OS extends Store, Task {}

export const os = proxy<OS>({
    ...makeTask(),
    apps: [],
    tasks: [],
    taskbarHeight: 37,
    desktopWidth: innerWidth,
    desktopHeight: innerHeight,
    desktopX: 0,
    desktopY: 0,
    desktopBgType: DesktopBgType.Image,
    desktopBgImagePath: '/C/images/wallpapers/white-cliffs-coastline.jpg',
    desktopBgColor: '#312e81',
    osName: ''
})
