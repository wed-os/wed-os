import { AppType, AppTypeItem, appTypeItems } from '@task/constants/appTypes'
import { find } from 'lodash-es'

export function getAppTypeItem(type: AppType): AppTypeItem
export function getAppTypeItem(type: any): AppTypeItem | undefined

export function getAppTypeItem(value: AppType | any): AppTypeItem | undefined {
    return find(appTypeItems, { value })
}
