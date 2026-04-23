import { getNonOSTasks } from '@core/funcs/getNonOSTasks'
import { minimize } from '@core/remotes/minimize'
import { Button } from '@task/components/Button'
import { Task } from '@task/constants/task'
import { useOS } from '@task/hooks/useOS'
import { useCallback, useMemo } from 'react'

export function TaskbarTasks() {
    const { tasks } = useOS()

    const nonOSTasks = useMemo(getNonOSTasks, [tasks])

    const taskbarTaskClick = useCallback((task: Task) => {
        minimize.call(task)
    }, [])

    return (
        <div className="flex flex-1 items-center justify-center">
            {nonOSTasks.map((task) => (
                <Button
                    key={task.id}
                    variant="minimal"
                    data-wed-taskbar-task-id={task.id}
                    icon={task.icon}
                    onClick={() => taskbarTaskClick(task)}
                >
                    {task.title}
                </Button>
            ))}
        </div>
    )
}
