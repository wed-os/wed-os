import { FontIconName, fontIconNames } from '@task/constants/iconNames'

/** @public */
export const blankGlyph = '!'

/** @public */
export function getFontIconGlyph(iconName: string): string {
    if (typeof iconName !== 'string') return blankGlyph

    const charCode = fontIconNames.indexOf(iconName as FontIconName)
    if (charCode === -1) return blankGlyph

    return String.fromCharCode(charCode)
}
