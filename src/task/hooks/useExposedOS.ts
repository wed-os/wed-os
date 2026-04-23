import { ExposedOS, exposedOS } from '@task/constants/exposedOs'
import { Snapshot, useSnapshot } from 'valtio'

/** @public useOS */
export function useExposedOS(sync?: boolean): Snapshot<ExposedOS> {
    return useSnapshot(exposedOS, { sync })
}
