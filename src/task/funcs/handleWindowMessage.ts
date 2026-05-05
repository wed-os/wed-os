import { CoreRemotes } from '@core/types/coreRemoteTypes'
import { InvokeMessage, messageSchema, ReplyMessage } from '@task/constants/message'
import { os } from '@task/constants/os'
import { Task } from '@task/constants/task'
import { assertSchema } from '@task/funcs/assertSchema'
import { hasKey } from '@task/funcs/hasKey'
import { isObject } from '@task/funcs/isObject'
import { reply } from '@task/funcs/reply'
import { TaskRemotes } from '@task/types/taskRemoteTypes'

type Remotes = CoreRemotes | TaskRemotes

/** Xử lý các tin nhắn đến. */
export function handleWindowMessage(remoteFuncs: Remotes, event: MessageEvent): void {
    const { data } = event
    if (!isObject(data) || !data.isWedOS) return

    assertSchema(messageSchema, data)

    if (data.isInvoke) {
        handleInvoke(data, remoteFuncs)
    } else {
        handleReply(data)
    }
}

/** Xử lý tin nhắn yêu cầu gọi hàm. */
async function handleInvoke(data: InvokeMessage, remoteFuncs: Remotes): Promise<void> {
    const { messageId, funcName, funcArgs, secretId } = data
    let task: Task | undefined = os

    if (os.isCoreSide) {
        task = os.tasks.find((task) => task.secretId === secretId)
    }
    if (!task) {
        throw Error('Không tìm thấy tác vụ gọi hàm.')
    }
    if (!hasKey(remoteFuncs, funcName)) {
        throw Error(`Không tìm thấy hàm "${funcName}".`)
    }

    const func = remoteFuncs[funcName] as Function
    let isError = false
    let result

    try {
        result = await func.apply(task, funcArgs)
    } catch (error) {
        isError = true
        result = error
    }
    reply(task, messageId, result, isError)
}

/** Xử lý tin nhắn kết quả trả về. */
function handleReply(data: ReplyMessage): void {
    const { messageId, result, isError } = data

    const resolver = os.resolvers[messageId]
    if (!resolver) throw Error('Nhận được tin nhắn nhưng không tìm thấy resolver??')

    if (isError) {
        resolver.reject(result)
    } else {
        resolver.resolve(result)
    }
}
