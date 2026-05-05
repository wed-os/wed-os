import { getTaskOrOSState } from '@core/funcs/getTaskOrOSState'
import { os } from '@task/constants/os'
import { PermissionName, permissionsMap } from '@task/constants/permission'
import { MaybeTask } from '@task/constants/task'
import { ref } from '@task/funcs/ref'
import { SyncOps } from '@task/types/sync'

export function handshake(this: MaybeTask): SyncOps {
    const task = this ?? os
    const contentWindow = task.iframe?.contentWindow

    task.postMessage = ref(contentWindow?.postMessage.bind(contentWindow))
    if (!task.postMessage) {
        throw Error('Đã gọi được hàm này thì không thể không có postMessage.')
    }

    // FIXME: Tạm thời resolve để test!
    task.ready?.resolve()

    const syncOps: SyncOps = new Map()

    for (const permName in task.perms) {
        const perm = task.perms[permName as PermissionName]
        if (perm.state !== 'granted') continue

        const permission = permissionsMap[perm.name]

        for (const prop of permission.syncProps) {
            const value = getTaskOrOSState(task, prop)
            syncOps.set(prop, [value])
        }
        perm.resolved = true
    }
    return syncOps
}
