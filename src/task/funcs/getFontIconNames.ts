import {
    FontIconName,
    FontIconNameIncludeUnusedGlyphs,
    fontIconNames
} from '@task/constants/iconNames'

export function getFontIconNames(includeUnusedGlyphs: true): FontIconNameIncludeUnusedGlyphs[]
export function getFontIconNames(includeUnusedGlyphs?: false): FontIconName[]

/** @public */
export function getFontIconNames(
    includeUnusedGlyphs?: boolean
): (FontIconNameIncludeUnusedGlyphs | FontIconName)[] {
    if (includeUnusedGlyphs) return [...fontIconNames]

    return fontIconNames.filter(Boolean)
}
