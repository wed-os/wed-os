import { AppType } from '@task/constants/appTypes'
import { OS } from '@task/constants/os'
import { Task } from '@task/constants/task'

export function isOSTask(task: Task): task is OS {
    return task.type === AppType.OS
}
