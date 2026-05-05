import { OS, os } from '@task/constants/os'
import { SafeSnapshot } from '@task/types/SafeSnapshot'
import { useSnapshot } from 'valtio'

export function useOS(sync?: boolean): SafeSnapshot<OS> {
    return useSnapshot(os, { sync }) as SafeSnapshot<OS>
}
