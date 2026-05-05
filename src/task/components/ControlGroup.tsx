import { Size } from '@task/constants/size'
import { cn } from '@task/funcs/cn'
import { FillContext } from '@task/hooks/useFillContext'
import { SizeContext, useSizeContext } from '@task/hooks/useSizeContext'
import { Props } from '@task/types/attributes'
import { ReactNode } from 'react'

export interface ControlGroupProps extends Props {
    size?: Size
    fill?: boolean
    children?: ReactNode
}

/** @public */
export function ControlGroup({ className, size, fill, children }: ControlGroupProps) {
    size = useSizeContext(size)

    return (
        <div
            className={cn(
                'inline-flex items-center *:rounded-none *:not-last:-mr-px *:first:rounded-l-md *:last:rounded-r-md',
                fill && 'w-full flex-1',
                className
            )}
        >
            <SizeContext.Provider value={size}>
                <FillContext.Provider value={fill}>{children}</FillContext.Provider>
            </SizeContext.Provider>
        </div>
    )
}
