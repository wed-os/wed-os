import { os } from '@task/constants/os'
import { MaybeTask } from '@task/constants/task'

/** @public */
export function maximize(this: MaybeTask, maximized?: boolean) {
    const task = this ?? os

    task.maximized = Boolean(maximized ?? !task.maximized)
}
