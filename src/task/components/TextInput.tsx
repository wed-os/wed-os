import { Icon } from '@task/components/Icon'
import { IconName } from '@task/constants/iconNames'
import { Size } from '@task/constants/size'
import { cn } from '@task/funcs/cn'
import { useFillContext } from '@task/hooks/useFillContext'
import { SizeContext, useSizeContext } from '@task/hooks/useSizeContext'
import { Props } from '@task/types/attributes'
import { ChangeEventHandler, createContext, ReactNode } from 'react'

/** @public */
export const TextInputElementPlacementContext = createContext<'left' | 'right' | undefined>(
    undefined
)

export interface TextInputProps extends Props {
    type?: 'text' | 'email'
    size?: Size
    fill?: boolean
    maxLength?: number
    minLength?: number
    value?: string | number
    placeholder?: string
    icon?: IconName
    rightElement?: ReactNode
    onChange?: ChangeEventHandler
}

/** @public */
export function TextInput({
    className,
    type = 'text',
    size,
    fill,
    maxLength,
    minLength,
    value,
    placeholder,
    icon,
    rightElement,
    onChange,
    ...props
}: TextInputProps) {
    size = useSizeContext(size)
    fill ??= useFillContext(false)
    const sizeClassName = textInputSizeClassNames[size]

    return (
        <div
            className={cn(
                'relative inline-flex w-60 items-center rounded-md border border-neutral-600 bg-neutral-900 has-[input:focus]:z-2 has-[input:focus]:border-transparent has-[input:focus]:outline-2 has-[input:focus]:outline-blue-400',
                sizeClassName,
                fill && 'w-full flex-1',
                className
            )}
            {...props}
        >
            <SizeContext value={size}>
                {icon && <Icon className="pl-2" name={icon} />}
                <input
                    className="h-full min-w-0 flex-1 rounded-md px-2 outline-0"
                    type={type}
                    maxLength={maxLength}
                    minLength={minLength}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                />
                {rightElement && (
                    <div className="flex items-center gap-0.5 self-stretch py-0.5 pr-0.5 *:h-full *:min-h-5 *:rounded">
                        <TextInputElementPlacementContext value="right">
                            {rightElement}
                        </TextInputElementPlacementContext>
                    </div>
                )}
            </SizeContext>
        </div>
    )
}

const textInputSizeClassNames = {
    small: cn('h-5.5'),
    medium: cn('h-7'),
    large: cn('h-9')
} as const satisfies Record<Size, string>
