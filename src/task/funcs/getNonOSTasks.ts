import { os } from '@task/constants/os'
import { Task } from '@task/constants/task'
import { isOSTask } from '@task/funcs/isOSTask'

/** @public */
export function getNonOSTasks(): Task[] {
    return os.tasks.filter((task) => !isOSTask(task))
}
