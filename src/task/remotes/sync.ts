import { os } from '@task/constants/os'
import { SyncOps } from '@task/types/sync'
import { set, unset } from 'lodash-es'

export function sync(ops: SyncOps): void {
    ops.forEach(([value, isDelete], path) => {
        if (isDelete) {
            unset(os, path)
        } else {
            set(os, path, value)
        }
    })
}
