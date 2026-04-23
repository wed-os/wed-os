import { OS, os } from '@task/constants/os'
import { Snapshot, useSnapshot } from 'valtio'

export function useOS(sync?: boolean): Snapshot<OS> {
    return useSnapshot(os, { sync })
}
