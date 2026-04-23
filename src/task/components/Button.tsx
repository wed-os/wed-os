import { Icon } from '@task/components/Icon'
import { IconName } from '@task/constants/iconNames'
import { cn } from '@task/funcs/cn'
import { Props } from '@task/types/attributes'
import { Color } from '@task/types/Color'
import { Size } from '@task/types/Size'
import { Variant } from '@task/types/Variant'
import { CSSProperties, MouseEventHandler, ReactNode } from 'react'

interface ButtonProps extends Props {
    style?: CSSProperties
    color?: Color
    size?: Size
    variant?: Variant
    type?: HTMLButtonElement['type']
    onClick?: MouseEventHandler<HTMLButtonElement>
    icon?: IconName
    children?: ReactNode
}

/** @public */
export function Button({
    className,
    style,
    color = 'default',
    size = 'medium',
    variant = 'solid',
    type,
    onClick,
    icon,
    children,
    ...props
}: ButtonProps) {
    const isDefaultButton = color === 'default' && variant === 'solid'

    const colorClassName = buttonColorClassNames[color]
    const sizeClassName = buttonSizeClassNames[size]
    const variantClassName = buttonVariantClassNames[variant]

    return (
        <button
            className={cn(
                'flex items-center justify-center rounded-md border active:scale-95',
                colorClassName,
                sizeClassName,
                variantClassName,
                isDefaultButton && 'border-neutral-600',
                className
            )}
            style={style}
            type={type}
            onClick={onClick}
            {...props}
        >
            {icon && <Icon name={icon} />}
            {children}
        </button>
    )
}

const buttonColorClassNames = {
    default: cn('border-neutral-600 bg-neutral-800 text-neutral-200 hover:bg-neutral-500/20'),
    primary: cn('border-blue-400 bg-blue-500 text-blue-400 hover:bg-blue-500/20'),
    danger: cn('border-red-400 bg-red-500 text-red-400 hover:bg-red-500/20')
} as const satisfies Record<Color, string>

const buttonSizeClassNames = {
    small: cn('h-5.5 gap-1.5 px-1.5'),
    medium: cn('h-7 gap-2 px-2'),
    large: cn('h-9 gap-2 px-2')
} as const satisfies Record<Size, string>

const buttonVariantClassNames = {
    solid: cn('hover:bg-unset border-transparent text-white'),
    outlined: cn('bg-transparent'),
    minimal: cn('border-transparent bg-transparent')
} as const satisfies Record<Variant, string>
