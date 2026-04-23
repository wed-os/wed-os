import { os } from '@task/constants/os'
import { MaybeTask } from '@task/constants/task'

/** @public */
export function minimize(this: MaybeTask, minimized?: boolean): void {
    const task = this ?? os

    task.minimized = Boolean(minimized ?? !task.minimized)
}
