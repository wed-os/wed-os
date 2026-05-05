import { getTask } from '@task/funcs/getTask'

/** @public */
export async function waitTaskReady(taskId: number): Promise<void> {
    const task = getTask(taskId)
    if (!task?.ready) {
        throw Error('Không tìm thấy tác vụ cần đợi.')
    }
    return await task.ready.promise
}
