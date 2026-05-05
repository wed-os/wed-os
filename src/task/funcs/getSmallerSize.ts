import { Size } from '@task/constants/size'

/** @public */
export function getSmallerSize(size: Size): Size {
    if (size === 'large') return 'medium'
    if (size === 'medium') return 'small'
    return 'small'
}
