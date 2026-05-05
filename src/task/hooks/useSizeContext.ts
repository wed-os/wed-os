import { TextInputElementPlacementContext } from '@task/components/TextInput'
import { Size } from '@task/constants/size'
import { getSmallerSize } from '@task/funcs/getSmallerSize'
import { createContext, useContext } from 'react'

/** @public */
export const SizeContext = createContext<Size | undefined>(undefined)

export function useSizeContext(defaultSize: Size = 'medium'): Size {
    const size = useContext(SizeContext)
    const textInputElementPlacement = useContext(TextInputElementPlacementContext)

    if (!size) return defaultSize
    if (textInputElementPlacement) return getSmallerSize(size)
    return size
}
