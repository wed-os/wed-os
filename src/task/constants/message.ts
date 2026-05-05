import { nanoid_ } from '@task/constants/zod'
import { array, boolean, literal, object, output, string, union, unknown } from 'zod'

export const baseMessageSchema = object({
    /** Xác định đây là tin nhắn của hệ điều hành. */
    isWedOS: literal(true),

    /** ID của tin nhắn. */
    messageId: nanoid_()
})

export const invokeMessageSchema = baseMessageSchema.extend({
    /** Đây là tin nhắn gọi hàm. */
    isInvoke: literal(true),

    /** Tên hàm cần gọi khi là tin nhắn yêu cầu. */
    funcName: string(),

    /** Một mảng các tham số truyền vào hàm cần gọi. */
    funcArgs: array(unknown()).readonly(),

    /** ID bí mật dùng để xác định task gọi hàm. */
    secretId: nanoid_()
})

export const replyMessageSchema = baseMessageSchema.extend({
    /** Đây là tin nhắn hồi đáp. */
    isInvoke: literal(false),

    /** Kết quả phản hồi trả về từ hàm đã gọi. */
    result: unknown(),

    /** Kết quả trả về có phải là một lỗi hay không. */
    isError: boolean()
})

export const messageSchema = union([invokeMessageSchema, replyMessageSchema])

/** Tin nhắn gọi hàm. */
export type InvokeMessage = output<typeof invokeMessageSchema>

/** Tin nhắn hồi đáp. */
export type ReplyMessage = output<typeof replyMessageSchema>

/** Tin nhắn gọi hàm hoặc hồi đáp. */
export type Message = InvokeMessage | ReplyMessage
