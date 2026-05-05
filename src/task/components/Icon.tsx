import { IconName } from '@task/constants/iconNames'
import { cn } from '@task/funcs/cn'
import { getFontIconGlyph } from '@task/funcs/getFontIconGlyph'
import { CSSProperties, useMemo } from 'react'

interface IconProps {
    className?: string
    style?: CSSProperties
    name?: IconName
}

const emptyGlyph: string = '!'

/** @public */
export function Icon({ className, style, name }: IconProps) {
    const glyph = useMemo<string>(() => {
        if (name === undefined) return emptyGlyph
        return getFontIconGlyph(name)
    }, [name])

    return (
        <span
            className={cn('inline-flex pl-0.5 font-[WedOS-Icons] text-2xl leading-none', className)}
            style={style}
        >
            {glyph}
        </span>
    )
}
