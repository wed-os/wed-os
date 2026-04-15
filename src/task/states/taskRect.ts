import { proxy } from 'valtio'
import { int, object, output } from 'zod'

export const taskRectSchema = object({
    /**
     * Chiều rộng cửa sổ task.
     */
    width: int().gt(0),
    /**
     * Chiều cao cửa sổ task.
     */
    height: int().gt(0),
    /**
     * Tọa độ x của cửa sổ task.
     */
    x: int(),
    /**
     * Tọa độ y của cửa sổ task.
     */
    y: int()
})
export type TaskRect = output<typeof taskRectSchema>

export const taskRect = proxy<TaskRect>({
    width: 800,
    height: 600,
    x: 0,
    y: 0
})
