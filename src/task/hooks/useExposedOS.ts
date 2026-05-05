import { ExposedOS, exposedOS } from '@task/constants/exposedOS'
import { SafeSnapshot } from '@task/types/SafeSnapshot'
import { useSnapshot } from 'valtio'

/** @public useOS */
export function useExposedOS(sync?: boolean): SafeSnapshot<ExposedOS> {
    return useSnapshot(exposedOS, { sync }) as SafeSnapshot<ExposedOS>
}
