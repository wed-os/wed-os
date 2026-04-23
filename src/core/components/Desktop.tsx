import { Window } from '@core/components/Window'
import { getNonOSTasks } from '@core/funcs/getNonOSTasks'
import { useOS } from '@task/hooks/useOS'
import { useMemo } from 'react'

export function Desktop() {
    const { tasks } = useOS()

    const nonOSTasks = useMemo(getNonOSTasks, [tasks])

    return (
        <div className="relative flex-1">
            {nonOSTasks.map((task) => (
                <Window key={task.id} task={task} />
            ))}
        </div>
    )
}
