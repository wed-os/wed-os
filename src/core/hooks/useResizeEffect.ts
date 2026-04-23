import { os } from '@task/constants/os'
import { useEventListener } from 'ahooks'
import { useEffect } from 'react'

export function useResizeEffect(): void {
    const windowResize = () => {
        os.desktopWidth = innerWidth
        os.desktopHeight = innerHeight - os.taskbarHeight
    }

    useEventListener('resize', windowResize)
    useEffect(windowResize, [])
}
