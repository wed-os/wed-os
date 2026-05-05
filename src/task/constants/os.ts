import { App } from '@task/constants/app'
import { DesktopBgType } from '@task/constants/desktopBgTypes'
import { isCoreSide } from '@task/constants/isCoreSide'
import { Message } from '@task/constants/message'
import { Resolver } from '@task/constants/resolver'
import { makeTask, Task } from '@task/constants/task'
import { enum_ } from '@task/constants/zod'
import { ref } from '@task/funcs/ref'
import { FunctionComponent } from 'react'
import { proxy } from 'valtio'
import { boolean, int, object, output, string, transform } from 'zod'

export const storeSchema = object({
    /** Chiều cao thanh taskbar. */
    taskbarHeight: int(),

    /** Chiều rộng màn hình desktop. */
    desktopWidth: int().gt(0),

    /** Chiều cao màn hình desktop. */
    desktopHeight: int().gt(0),

    /** Tọa độ x màn hình desktop. */
    desktopX: int(),

    /** Tọa độ y màn hình desktop. */
    desktopY: int(),

    /** Kiểu hình nền hiện tại. */
    desktopBgType: enum_(DesktopBgType),

    /** Đường dẫn hình ảnh nền desktop. */
    desktopBgImagePath: string(),

    /** Màu nền desktop. */
    desktopBgColor: string(),

    /** Tên hệ điều hành. */
    osName: string(),

    /** Môi trường chạy hiện tại là core (true) hay task (false). */
    isCoreSide: boolean(),

    /** Danh sách ứng dụng đã cài đặt. */
    apps: transform((v) => v as App[]),

    /** Danh sách các task đang chạy. */
    tasks: transform((v) => v as Task[]),

    /** Đối tượng chứa các hàm giải quyết khi nhận được tin nhắn trả lời. */
    resolvers: transform((v) => v as Record<Message['messageId'], Resolver>),

    /** Component App. */
    component: transform((v) => v as FunctionComponent)
})

export interface Store extends output<typeof storeSchema> {}
export type StoreProp = keyof Store

export interface OS extends Store, Task {}
export type OSProp = keyof OS

export const os = proxy<OS>({
    ...makeTask(),
    taskbarHeight: 37,
    desktopWidth: innerWidth,
    desktopHeight: innerHeight,
    desktopX: 0,
    desktopY: 0,
    desktopBgType: DesktopBgType.Image,
    desktopBgImagePath: '/C/images/wallpapers/white-cliffs-coastline.jpg',
    desktopBgColor: '#312e81',
    osName: '',
    isCoreSide,
    apps: [],
    tasks: [],
    resolvers: ref({}),
    component: ref(() => null)
})
