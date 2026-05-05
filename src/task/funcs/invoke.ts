import { InvokeMessage } from '@task/constants/message'
import { os } from '@task/constants/os'
import { Resolver } from '@task/constants/resolver'
import { Task } from '@task/constants/task'
import { nanoId } from '@task/funcs/nanoId'
import { cloneDeep } from 'lodash-es'

export async function invoke<T>(
    task: Task,
    funcName: string,
    funcArgs: unknown[] = []
): Promise<T> {
    if (!task.postMessage) {
        throw Error('Tác vụ chưa thể nhận tin nhắn.')
    }
    const messageId = nanoId()

    const { promise, resolve, reject } = Promise.withResolvers<T>()
    const resolver: Resolver = {
        taskId: task.id,
        resolve,
        reject
    }
    os.resolvers[messageId] = resolver

    const message: InvokeMessage = {
        isWedOS: true,
        isInvoke: true,
        messageId,
        funcName,
        funcArgs: cloneDeep(funcArgs),
        secretId: task.secretId
    }
    task.postMessage(message, '*')

    return promise
}
