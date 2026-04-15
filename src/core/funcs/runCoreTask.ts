import {
    coreFuncs,
    coreHelpers,
    coreRemotes,
    coreStates,
    coreStores
} from '@core/constants/coreMembers'
import { CoreTask } from '@core/types/CoreTask'
import { AppType } from '@task/constants/appTypes'
import { taskFuncs, taskStates, taskStores } from '@task/constants/taskMembers'
import { getApp } from '@task/funcs/getApp'
import { proxy } from 'valtio'

export function runCoreTask(appPath: string): CoreTask {
    const app = getApp(appPath)
    if (app === undefined) throw Error('Không tìm thấy ứng dụng.')

    const isOSApp = app.type === AppType.OS

    const task = proxy<CoreTask>({
        ...taskFuncs,
        ...(isOSApp ? taskStates : structuredClone(taskStates)),
        ...taskStores,
        ...coreFuncs,
        ...coreHelpers,
        ...coreRemotes,
        ...(isOSApp ? coreStates : structuredClone(coreStates)),
        ...coreStores
    })
    return task
}
