import { desktopRect } from '@task/stores/desktopRect'
import { useEventListener } from 'ahooks'

export function useDesktopRectEffect(): void {
    useEventListener('resize', () => {
        desktopRect.width = innerWidth
        desktopRect.height = innerHeight
    })
}
