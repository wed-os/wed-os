import { useVirtualList } from 'ahooks'
import { chunk } from 'lodash-es'
import { ReactNode, useMemo, useRef } from 'react'
import { cn, getFontIconNames, Icon, useResponsives } from 'wedos'

const isZeroWidthChar = (char: string): boolean => {
    return /\p{Mark}/u.test(char) || /[\u00ad\u200b-\u200d\ufeff]/.test(char)
}

export function App() {
    const rowsCount = 12
    const itemHeight = 80
    const iconsContainerRef = useRef<HTMLDivElement>(null)
    const iconsWrapperRef = useRef<HTMLDivElement>(null)
    const responsive = useResponsives()

    const icons = useMemo(() => {
        const fontIconNames = [...getFontIconNames(true), ...Array(rowsCount * 8).fill('?')]
        const items = []
        let unusedItem
        let charCode = -1
        for (const name of fontIconNames) {
            charCode++
            const glyph = String.fromCharCode(charCode)
            const hexCode = charCode.toString(16).padStart(4, '0')
            const isNotYetUsed = name === '?'
            if (name.startsWith('--')) {
                if (!unusedItem) {
                    unusedItem = {
                        startHexCode: hexCode,
                        endHexCode: ''
                    }
                    items.push(unusedItem)
                }
                unusedItem.endHexCode = hexCode
                continue
            }
            if (unusedItem) {
                unusedItem = undefined
            }
            items.push({
                name,
                glyph,
                charCode,
                hexCode,
                isNotYetUsed,
                isZeroWidth: isZeroWidthChar(glyph)
            })
        }
        return chunk(items, rowsCount)
    }, [])

    const [iconsList] = useVirtualList(icons, {
        containerTarget: iconsContainerRef,
        wrapperTarget: iconsWrapperRef,
        itemHeight,
        overscan: 1
    })

    const getDisplayIconName = (icon: (typeof icons)[number][number]): ReactNode => {
        if (icon.isNotYetUsed) return icon.hexCode
        if (icon.startHexCode) {
            return (
                <div className="flex gap-1 text-rose-400">
                    {icon.startHexCode === icon.endHexCode ? (
                        icon.startHexCode
                    ) : (
                        <>
                            {icon.startHexCode}
                            <div className="text-rose-300">...</div>
                            {icon.endHexCode}
                        </>
                    )}
                </div>
            )
        }
        return icon.name
    }

    return (
        <div className="flex h-full">
            <div className="flex-1 overflow-auto" ref={iconsContainerRef}>
                <div ref={iconsWrapperRef} className="m-2">
                    {iconsList.map((item) => (
                        <div key={item.index} className="flex">
                            {item.data.map((icon) => (
                                <div
                                    key={icon.hexCode}
                                    className="group relative flex flex-col items-center rounded-md p-2 text-center hover:bg-neutral-800"
                                    style={{
                                        width: `round(down, calc(1 / ${rowsCount} * 100%), 2px)`,
                                        height: itemHeight
                                    }}
                                >
                                    <Icon name={icon.name} />
                                    <div
                                        className={cn(
                                            'line-clamp-2 leading-tight text-neutral-500',
                                            icon.isZeroWidth && 'text-rose-400'
                                        )}
                                    >
                                        {getDisplayIconName(icon)}
                                    </div>
                                    <div className="invisible absolute top-2 left-2 text-xs text-neutral-500 group-hover:visible">
                                        {icon.hexCode}
                                    </div>
                                    <div className="invisible absolute top-2 right-2 text-neutral-500 group-hover:visible">
                                        {icon.glyph}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
