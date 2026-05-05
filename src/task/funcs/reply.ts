import { Message, ReplyMessage } from '@task/constants/message'
import { Task } from '@task/constants/task'
import { cloneDeep } from 'lodash-es'

export function reply(
    task: Task,
    messageId: Message['messageId'],
    result: unknown,
    isError: boolean
): void {
    if (!task.postMessage) return

    const message: ReplyMessage = {
        isWedOS: true,
        isInvoke: false,
        messageId,
        result: cloneDeep(result),
        isError
    }
    task.postMessage(message, '*')
}
