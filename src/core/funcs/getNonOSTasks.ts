import { AppType } from '@task/constants/appTypes'
import { os } from '@task/constants/os'
import { Task } from '@task/constants/task'

export function getNonOSTasks(): Task[] {
    return os.tasks.filter((task) => task.type !== AppType.OS)
}
