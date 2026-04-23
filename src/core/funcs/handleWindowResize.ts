import { os } from '@task/constants/os'

export function handleWindowResize(): void {
    os.desktopWidth = innerWidth
    os.desktopHeight = innerHeight - os.taskbarHeight
}
