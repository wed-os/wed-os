import { AppType } from '@task/constants/appTypes'
import { enum_, nanoid_ } from '@task/constants/zod'
import { proxy } from 'valtio'
import { boolean, int, object, output, string } from 'zod'

export const taskSchema = object({
    /** ID của task. */
    id: int(),

    /** Đường dẫn thư mục làm việc của task, là đường dẫn của app. */
    path: string(),

    /** Tên app của task. */
    name: string(),

    /** Kiểu app của task này. */
    type: enum_(AppType),

    /** Icon của task. */
    icon: string(),

    /** Tiêu đề hiển thị của task. */
    title: string(),

    /** Mở rộng cửa sổ task. */
    maximized: boolean(),

    /** Thu nhỏ cửa sổ task. */
    minimized: boolean(),

    /** Toàn màn hình task. */
    fullscreen: boolean(),

    /** Chiều rộng cửa sổ task. */
    width: int().gt(0),

    /** Chiều cao cửa sổ task. */
    height: int().gt(0),

    /** Tọa độ x của cửa sổ task. */
    x: int(),

    /** Tọa độ y của cửa sổ task. */
    y: int(),

    /** Có ẩn thanh tiêu đề không. */
    noHeader: boolean(),

    /** ID bí mật của task. Dùng để xác thực tin nhắn gọi hàm từ task đến core. */
    secretId: nanoid_()
})

/** Một tác vụ. */
export interface Task extends output<typeof taskSchema> {}

export type MaybeTask = Task | undefined | void

export const minimizedTaskWidth = 200
export const minimizedTaskHeight = 32

export function makeTask(): Task {
    const task = proxy<Task>({
        id: 0,
        name: '',
        path: '',
        type: AppType.User,
        icon: 'task',
        title: '',
        maximized: false,
        minimized: false,
        fullscreen: false,
        width: 800,
        height: 600,
        x: 0,
        y: 0,
        noHeader: false,
        secretId: ''
    })
    return task
}
