import { getTaskOrOSState } from '@core/funcs/getTaskOrOSState'
import { sync } from '@core/proxies/proxies'
import { os } from '@task/constants/os'
import { permissions } from '@task/constants/permission'
import { Task, TaskProp, taskPropsMap } from '@task/constants/task'
import { isOSTask } from '@task/funcs/isOSTask'
import { SyncOps } from '@task/types/sync'
import { isString, zipObject } from 'lodash-es'
import { INTERNAL_Op, subscribe } from 'valtio'

const allSyncProps = permissions.flatMap((perm) => perm.syncProps)

const propToPermissionMap = zipObject(
    allSyncProps,
    allSyncProps.map((prop) => {
        return permissions.find((permission) => {
            return permission.syncProps.includes(prop)
        })
    })
)

export function subscribeTask(task: Task): () => void {
    const isOS = isOSTask(task)
    let unsubscribe: () => void

    if (isOS) {
        unsubscribe = subscribe(task, handleOSChange)
    } else {
        unsubscribe = subscribe(task, handleTaskChange.bind(null, task))
    }
    return unsubscribe
}

function handleOSChange(ops: INTERNAL_Op[]): void {
    const osPropOps = ops.filter(([_, path]) => {
        const prop = path[0]
        return !taskPropsMap[prop as TaskProp]
    })
    if (osPropOps.length === 0) return

    for (const task of os.tasks) {
        if (isOSTask(task)) continue

        handleTaskChange(task, osPropOps)
    }
}

function handleTaskChange(task: Task, ops: INTERNAL_Op[]): void {
    if (!task.postMessage) return

    const syncOps: SyncOps = new Map()

    for (const [action, path, value] of ops) {
        const isStringPath = path.every(isString)
        if (!isStringPath) {
            throw Error(`Thuộc tính "${path.join('.')}" không phải kiểu string.`)
        }
        const prop = path[0]
        if (!prop) continue

        // Bỏ qua nếu prop này không có trong permission.
        const permission = propToPermissionMap[prop]
        if (!permission) continue

        const perm = task.perms[permission.name]
        const granted = perm.state === 'granted'
        if (!granted) continue

        if (!perm.resolved) {
            for (const otherProp of permission.syncProps) {
                const otherValue = getTaskOrOSState(task, otherProp)
                syncOps.set(otherProp, [otherValue])
            }
            perm.resolved = true
        } else {
            syncOps.set(path, [value, action === 'delete'])
        }
    }
    sync.call(task, syncOps)
}
