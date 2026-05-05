import { Desktop } from '@core/components/Desktop'
import { Taskbar } from '@core/components/Taskbar'

export function CoreApp() {
    return (
        <div className="flex h-full flex-col">
            <Desktop />
            <Taskbar />
        </div>
    )
}
