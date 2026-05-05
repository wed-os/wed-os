import { useResponsive as useAhooksResponsive } from 'ahooks'

/** @public */
export type Responsive = {
    sm: boolean
    md: boolean
    lg: boolean
    xl: boolean
    xxl: boolean
}

/** @public */
export function useResponsives(): Responsive {
    return useAhooksResponsive() as Responsive
}
