import { Side, SideItem, sideItems } from '@scripts/constants/sides'
import { find } from 'lodash-es'

export function getSideItem(side: Side): SideItem
export function getSideItem(side: any): SideItem | undefined

export function getSideItem(side: any) {
    return find(sideItems, { side: side })
}
