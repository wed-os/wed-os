import { OSProp, os } from '@task/constants/os'
import { Task, TaskProp, taskPropsMap } from '@task/constants/task'

export function getTaskOrOSState(task: Task, prop: OSProp) {
    if (taskPropsMap[prop as TaskProp]) {
        return task[prop as TaskProp]
    }
    return os[prop]
}
