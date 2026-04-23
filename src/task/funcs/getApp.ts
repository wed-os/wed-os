import { App } from '@task/constants/app'
import { os } from '@task/constants/os'
import { find } from 'lodash-es'

/** @public */
export function getApp(path: string): App | undefined {
    return find(os.apps, { path })
}
