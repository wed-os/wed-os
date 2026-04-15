import { apps } from '@task/stores/apps'
import { App } from '@task/types/App'
import { find } from 'lodash-es'

export function getApp(path: string): App | undefined {
    return find(apps, { path })
}
