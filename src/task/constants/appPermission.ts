import {
    PermissionName,
    permissionNames,
    permissions,
    permissionStates
} from '@task/constants/permission'
import { enum_ } from '@task/constants/zod'
import { proxy } from 'valtio'
import { object, output } from 'zod'

export const appPermissionSchema = object({
    name: enum_(permissionNames),
    state: enum_(permissionStates)
})

export type AppPermission = output<typeof appPermissionSchema>
export type AppPermissions = Record<PermissionName, AppPermission>

export function makeAppPermissions(): AppPermissions {
    const appPerms = {} as AppPermissions

    for (const perm of permissions) {
        const appPerm: AppPermission = {
            name: perm.name,
            state: perm.defaultState
        }
        appPerms[perm.name] = appPerm
    }
    return proxy(appPerms)
}
