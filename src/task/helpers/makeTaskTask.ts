import {
    taskFuncs,
    taskHelpers,
    taskRemotes,
    taskStates,
    taskStores
} from '@task/constants/taskMembers'
import { App } from '@task/types/App'
import { TaskTask } from '@task/types/TaskTask'
import { proxy } from 'valtio'

export function makeTaskTask(app: App): TaskTask {
    const task = proxy<TaskTask>({
        ...taskFuncs,
        ...taskHelpers,
        ...taskRemotes,
        ...taskStates,
        ...taskStores
    })
    return task
}
