import { TaskbarTasks } from '@core/components/TaskbarTasks'
import { useOS } from '@task/hooks/useOS'

export function Taskbar() {
    const { taskbarHeight } = useOS()

    return (
        <div
            className="z-1 flex items-center border-t bg-neutral-900"
            style={{
                height: taskbarHeight
            }}
        >
            <TaskbarTasks />
        </div>
    )
}
