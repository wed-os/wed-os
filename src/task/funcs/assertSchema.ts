import { ZodType } from 'zod'

export function assertSchema<T>(schema: ZodType<T>, data: unknown): asserts data is T {
    schema.parse(data)
}
