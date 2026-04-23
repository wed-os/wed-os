import { AppType } from '@task/constants/appTypes'
import { Task } from '@task/constants/task'

export function isOSOrCoreTask(task: Task): boolean {
    return task.type === AppType.OS || task.type === AppType.Core
}
