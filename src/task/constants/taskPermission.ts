import { App } from '@task/constants/app'
import { appPermissionSchema } from '@task/constants/appPermission'
import { PermissionName } from '@task/constants/permission'
import { proxy } from 'valtio'
import { boolean, object, output } from 'zod'

export const taskPermissionSchema = object({
    name: appPermissionSchema.shape.name,
    state: appPermissionSchema.shape.state,

    /** Đây là quyền tạm thời cho đến khi đóng tác vụ. */
    session: boolean(),

    /** Cho biết dữ liệu đã được đồng bộ ít nhất một lần. */
    resolved: boolean()
})

export type TaskPermission = output<typeof taskPermissionSchema>
export type TaskPermissions = Record<PermissionName, TaskPermission>

export function makeTaskPermissions(app?: App): TaskPermissions {
    if (!app) return {} as TaskPermissions

    const taskPerms = {} as TaskPermissions

    for (const appPerm of Object.values(app.perms)) {
        const taskPerm: TaskPermission = {
            name: appPerm.name,
            state: appPerm.state,
            session: false,
            resolved: false
        }
        taskPerms[appPerm.name] = taskPerm
    }
    return proxy(taskPerms)
}
