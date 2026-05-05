import { Window } from '@core/components/Window'
import { useNonOSTasks } from '@core/hooks/useNonOSTasks'

export function Desktop() {
    const nonOSTasks = useNonOSTasks()

    return (
        <div className="relative flex-1">
            {nonOSTasks.map((task) => (
                <Window key={task.id} task={task} />
            ))}
        </div>
    )
}
