import { CoreApp } from '@core/components/CoreApp'
import { defineOSAccessors } from '@core/funcs/defineOSAccessors'
import { AppType } from '@task/constants/appTypes'
import { os } from '@task/constants/os'
import { makeTask, Task } from '@task/constants/task'
import { makeTaskPermissions } from '@task/constants/taskPermission'
import { clamp } from '@task/funcs/clamp'
import { getApp } from '@task/funcs/getApp'
import { nanoId } from '@task/funcs/nanoId'
import { ref } from '@task/funcs/ref'

let taskId = 0

/** @public */
export function runTask(appPath: string): Task {
    const app = getApp(appPath)
    if (app === undefined) throw Error('Không tìm thấy ứng dụng.')

    const isOSApp = app.type === AppType.OS
    const task = isOSApp ? os : makeTask(app)

    task.id = ++taskId
    task.name = app.name
    task.path = app.path
    task.type = app.type
    task.icon = app.icon
    task.title = app.title || task.name
    task.maximized = app.maximized ?? false
    task.minimized = app.minimized ?? false
    task.fullscreen = app.fullscreen ?? false
    task.width = clamp(app.width || 1000, 200, os.desktopWidth)
    task.height = clamp(app.height || 640, 80, os.desktopHeight)
    task.x = Math.floor(app.x ?? (os.desktopWidth - task.width) / 2)
    task.y = Math.floor(app.y ?? (os.desktopHeight - task.height) / 2)
    task.noHeader = app.noHeader ?? false
    task.secretId = nanoId()
    task.iframe = undefined
    task.postMessage = undefined
    task.ready = ref(Promise.withResolvers())

    if (isOSApp) {
        defineOSAccessors()
        os.perms = makeTaskPermissions(app)
        os.component = ref(CoreApp)
    }

    os.tasks.push(task)

    return task
}
