import { upperFirst } from 'lodash-es'

export const enum Side {
    Core = 'core',
    Task = 'task'
}

export interface SideItem {
    side: Side
    oppositeSide: Side
    upperSide: Capitalize<Side>
    upperOppositeSide: Capitalize<Side>
}

export const sideItems: SideItem[] = [
    {
        side: Side.Core,
        oppositeSide: Side.Task,
        upperSide: upperFirst(Side.Core),
        upperOppositeSide: upperFirst(Side.Task)
    },
    {
        side: Side.Task,
        oppositeSide: Side.Core,
        upperSide: upperFirst(Side.Task),
        upperOppositeSide: upperFirst(Side.Core)
    }
]
