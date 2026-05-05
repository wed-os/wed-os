import { os, OS, OSProp } from '@task/constants/os'
import { omit } from 'lodash-es'
import { proxy, subscribe } from 'valtio'

const privateOSProps = [
    'secretId',
    'iframe',
    'postMessage',
    'ready',
    'isCoreSide',
    'resolvers',
    'component'
] as const satisfies OSProp[]

type PrivateOSProp = (typeof privateOSProps)[number]

const exposedOSProps = Object.keys(os).filter((prop) => {
    return !privateOSProps.includes(prop as PrivateOSProp)
})

/** @public OS */
export interface ExposedOS extends Omit<OS, PrivateOSProp> {}

/** @public os */
export const exposedOS = proxy<ExposedOS>({ ...(omit(os, privateOSProps) as ExposedOS) })

subscribe(os, () => {
    for (const prop of exposedOSProps) {
        const val = (os as any)[prop]
        if ((exposedOS as any)[prop] === val) continue
        ;(exposedOS as any)[prop] = val
    }
})
