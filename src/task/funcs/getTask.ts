import { os } from '@task/constants/os'
import { Task } from '@task/constants/task'

export function getTask(taskId: number): Task | undefined {
    return os.tasks.find((task) => task.id === taskId)
}
