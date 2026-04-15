import { proxy } from 'valtio'

export interface DesktopRect {
    x: number
    y: number
    width: number
    height: number
}

export const desktopRect = proxy<DesktopRect>({
    x: 0,
    y: 0,
    width: innerWidth,
    height: innerHeight
})
