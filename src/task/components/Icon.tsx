import { FontIconName, IconName, fontIconNames } from '@task/constants/iconNames'
import { cn } from '@task/funcs/cn'
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
        if (typeof name !== 'string') return emptyGlyph

        const index = fontIconNames.indexOf(name as FontIconName)
        if (index === -1) return emptyGlyph

        const charCode = index + 0x21
        return String.fromCharCode(charCode)
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
