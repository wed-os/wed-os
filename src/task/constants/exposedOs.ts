import { os, OS, storeSchema } from '@task/constants/os'
import { taskSchema } from '@task/constants/task'

const privateOsProps = ['secretId'] as const satisfies (keyof OS)[]

type PrivateOSProp = (typeof privateOsProps)[number]

/** @public OS */
export type ExposedOS = Omit<OS, PrivateOSProp>

const omitEntries = privateOsProps.map((prop) => [prop, true])

/** @public osSchema */
export const exposedOsSchema = storeSchema
    .extend(taskSchema.shape)
    .omit(Object.fromEntries(omitEntries) as Record<PrivateOSProp, true>)

/** @public os */
export const exposedOS = new Proxy<ExposedOS>(os, {
    get(target: OS, prop: PrivateOSProp) {
        if (privateOsProps.includes(prop)) return
        return target[prop]
    },
    set() {
        return false
    },
    deleteProperty() {
        return false
    }
})
