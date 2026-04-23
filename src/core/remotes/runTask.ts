import { defineOSAccessors } from '@core/funcs/defineOSAccessors'
import { AppType } from '@task/constants/appTypes'
import { os } from '@task/constants/os'
import { makeTask, Task } from '@task/constants/task'
import { getApp } from '@task/funcs/getApp'
import { nanoId } from '@task/funcs/nanoId'
import { clamp } from 'lodash-es'

let taskId = 0

/** @public */
export function runTask(appPath: string): Task {
    const app = getApp(appPath)
    if (app === undefined) throw Error('Không tìm thấy ứng dụng.')

    const isOSApp = app.type === AppType.OS
    const task = isOSApp ? os : makeTask()

    task.id = ++taskId
    task.name = app.name
    task.path = app.path
    task.type = app.type
    task.icon = app.icon
    task.title = app.title || task.name
    task.maximized = app.maximized ?? false
    task.minimized = app.minimized ?? false
    task.fullscreen = app.fullscreen ?? false
    task.width = clamp(app.width || 800, 200, os.desktopWidth)
    task.height = clamp(app.height || 600, 80, os.desktopHeight)
    task.x = Math.floor(app.x ?? (os.desktopWidth - task.width) / 2)
    task.y = Math.floor(app.y ?? (os.desktopHeight - task.height) / 2)
    task.noHeader = app.noHeader ?? false
    task.secretId = nanoId()

    if (isOSApp) defineOSAccessors()

    os.tasks.push(task)

    return task
}
