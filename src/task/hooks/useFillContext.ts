import { createContext, useContext } from 'react'

export const FillContext = createContext<boolean | undefined>(undefined)

export function useFillContext(defaultFill: boolean = false): boolean {
    const fill = useContext(FillContext)

    return fill ?? defaultFill
}
