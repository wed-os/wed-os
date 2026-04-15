import { AppType } from '@task/constants/appTypes'
import { enum_ } from '@task/constants/zod'
import { proxy } from 'valtio'
import { int, object, output, string } from 'zod'

export const metaSchema = object({
    /**
     * ID của task.
     */
    id: int(),
    /**
     * Đường dẫn thư mục làm việc của task, là đường dẫn của app.
     */
    path: string(),
    /**
     * Tên app của task.
     */
    name: string(),
    /**
     * Kiểu app của task này.
     */
    type: enum_(AppType)
})
export type Meta = output<typeof metaSchema>

export const meta = proxy<Meta>({
    id: 0,
    path: '',
    name: '',
    type: AppType.User
})
