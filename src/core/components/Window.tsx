import { subscribeTask } from '@core/funcs/subscribeTask'
import { maximize } from '@core/remotes/maximize'
import { minimize } from '@core/remotes/minimize'
import { readFile } from '@core/remotes/readFile'
import { Button } from '@task/components/Button'
import { Icon } from '@task/components/Icon'
import { easeOutQuint } from '@task/constants/easings'
import { minimizedTaskHeight, minimizedTaskWidth, Task } from '@task/constants/task'
import { clamp } from '@task/funcs/clamp'
import { cn } from '@task/funcs/cn'
import { isOSTask } from '@task/funcs/isOSTask'
import { isSelfEvent } from '@task/funcs/isSelfEvent'
import { parseHtml } from '@task/funcs/parseHtml'
import { ref } from '@task/funcs/ref'
import { useOS } from '@task/hooks/useOS'
import { useAsyncEffect } from 'ahooks'
import { motion, TargetAndTransition, useDragControls } from 'motion/react'
import { createElement, PointerEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useSnapshot } from 'valtio'

interface WindowProps {
    task: Task
}

export function Window({ task }: WindowProps) {
    const { desktopX, desktopY, desktopWidth, desktopHeight, component } = useOS()
    const {
        id,
        path,
        icon,
        title,
        fullscreen,
        maximized,
        minimized,
        noHeader,
        width,
        height,
        x,
        y,
        secretId
    } = useSnapshot(task)

    const isOS = isOSTask(task)
    const isHeaderVisible = !noHeader && !fullscreen
    const isFullSize = (fullscreen || maximized) && !minimized

    const dragControl = useDragControls()
    const [dragging, setDragging] = useState(false)
    const startDragEvent = useRef<PointerEvent>(null)
    const iframeRef = useRef<HTMLIFrameElement>(null)

    const taskbarTaskRect = useMemo(() => {
        const taskbarTaskEl = document.querySelector(`[data-wed-taskbar-task-id="${id}"]`)
        const fallbackRect = {
            width: minimizedTaskWidth,
            height: minimizedTaskHeight,
            x: Math.floor((desktopWidth - minimizedTaskWidth) / 2),
            y: desktopHeight + 4
        }
        return taskbarTaskEl?.getBoundingClientRect() ?? fallbackRect
    }, [minimized])

    const rect = useMemo<TargetAndTransition>(() => {
        if (minimized) {
            return {
                width: minimizedTaskWidth,
                height: minimizedTaskHeight,
                x: Math.floor(taskbarTaskRect.x - (minimizedTaskWidth - taskbarTaskRect.width) / 2),
                y: Math.floor(taskbarTaskRect.y)
            }
        }
        if (isFullSize) {
            return {
                width: '100%',
                height: '100%',
                x: 0,
                y: 0
            }
        }
        return { width, height, x, y }
    }, [isFullSize, minimized, width, height, x, y])

    const headerPointerDown = (event: PointerEvent): void => {
        if (!isSelfEvent(event)) return
        event.currentTarget.setPointerCapture(event.pointerId)
        startDragEvent.current = event
        setDragging(false)
    }

    const headerPointerMove = (event: PointerEvent): void => {
        if (!startDragEvent.current || dragging) return
        const dx = event.clientX - startDragEvent.current.clientX
        const dy = event.clientY - startDragEvent.current.clientY
        const threshold = Math.hypot(dx, dy)
        if (threshold < 8) return
        setDragging(true)
        if (maximized) {
            task.x = Math.floor(startDragEvent.current.clientX - width / 2)
            task.y = 0
            maximize.call(task, false)
        }
        task.x += dx
        task.y += dy
        dragControl.start(event)
    }

    const headerLostPointerCapture = (): void => {
        setDragging(false)
        startDragEvent.current = null
    }

    useEffect(() => {
        if (width < desktopWidth) {
            task.x = Math.floor(clamp(x, desktopX, desktopWidth - width))
        } else {
            task.x = 0
        }
    }, [x, width, desktopX, desktopWidth])

    useEffect(() => {
        if (height < desktopHeight) {
            task.y = Math.floor(clamp(y, desktopY, desktopHeight - height))
        } else {
            task.y = 0
        }
    }, [y, height, desktopY, desktopHeight])

    useAsyncEffect(async () => {
        const iframe = iframeRef.current
        if (!iframe) return

        task.iframe = ref(iframe)
        const tsx = await readFile(`${path}/app.tsx`)
        let css
        try {
            css = await readFile(`${path}/app.css`)
        } catch {
            css = ''
        }
        let html
        try {
            html = await readFile(`${path}/app.html`)
        } catch {
            html = ''
        }
        const doc = parseHtml(taskTempl)

        css = taskCss + css
        const cssEl = doc.querySelector<HTMLStyleElement>('#wed-css')!
        cssEl.textContent = css

        if (html) {
            const importmapEl = doc.querySelector<HTMLScriptElement>('script#wed-importmap')!
            const htmlDoc = parseHtml(html)
            const htmlImportmapEl = htmlDoc.querySelector<HTMLScriptElement>(
                'script[type="importmap"]'
            )
            if (htmlImportmapEl) {
                importmapEl.text = htmlImportmapEl.text
            }
        }

        const { outputFiles, errors } = await buildCode('@task/taskScript', false, {
            ...codesMap,
            '/src/task/components/App': tsx
        })
        if (errors[0]) throw Error(errors[0].text)
        if (!outputFiles?.[0]) throw Error('Không thấy file output.')
        const js = outputFiles[0].text
        const jsEl = doc.querySelector<HTMLScriptElement>('#wed-js')!
        jsEl.text = js

        const secretIdEl = doc.querySelector<HTMLMetaElement>('meta[name="wed:secret-id"]')!
        secretIdEl.content = secretId

        const srcdoc = doc.documentElement.outerHTML
        iframe.allow = ['storage-access'].join(',')
        iframe.sandbox.add(
            'allow-downloads',
            'allow-forms',
            'allow-orientation-lock',
            'allow-pointer-lock',
            'allow-popups',
            'allow-popups-to-escape-sandbox',
            'allow-presentation',
            'allow-same-origin',
            'allow-scripts',
            'allow-storage-access-by-user-activation'
        )
        iframe.srcdoc = srcdoc
    }, [])

    useEffect(() => {
        const unsubscribe = subscribeTask(task)
        return unsubscribe
    }, [])

    return (
        <motion.div
            className="absolute flex flex-col bg-neutral-900 shadow-lg outline"
            initial={{
                ...rect,
                borderRadius: 10,
                scale: 0.95
            }}
            animate={{
                ...rect,
                borderRadius: isFullSize ? 0 : undefined,
                scale: 1
            }}
            transition={{
                type: minimized ? 'tween' : 'spring',
                duration: dragging ? 0 : 0.5,
                ease: easeOutQuint,
                stiffness: 400,
                damping: 25
            }}
            drag
            dragControls={dragControl}
            dragListener={false}
            dragMomentum={false}
            dragConstraints={{
                left: desktopX,
                top: desktopY,
                right: desktopWidth - width,
                bottom: desktopHeight - height
            }}
            dragTransition={{
                bounceStiffness: 1200
            }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
                task.x += info.offset.x
                task.y += info.offset.y
            }}
        >
            {/** Thanh tiêu đề. */}
            {isHeaderVisible && (
                <motion.div
                    className="flex items-center p-1 *:pointer-events-none"
                    onPointerDown={headerPointerDown}
                    onPointerMove={headerPointerMove}
                    onLostPointerCapture={headerLostPointerCapture}
                >
                    <div className="w-30" />
                    <div className="flex min-w-0 flex-auto items-center justify-center gap-2">
                        <Icon name={icon} />
                        <div className="truncate">{title}</div>
                    </div>
                    <div className="flex items-center *:pointer-events-auto">
                        <Button
                            size="small"
                            variant="minimal"
                            icon="minus"
                            onClick={() => minimize.call(task)}
                        />
                        <Button
                            size="small"
                            variant="minimal"
                            icon="plus"
                            onClick={() => maximize.call(task)}
                        />
                        <Button size="small" variant="minimal" color="danger" icon="xmark" />
                    </div>
                </motion.div>
            )}

            {/** Thân cửa sổ. */}
            <motion.div
                className="flex-1"
                initial={{
                    padding: 4,
                    borderRadius: 8
                }}
                animate={{
                    padding: isFullSize ? 0 : undefined,
                    paddingTop: isHeaderVisible ? 0 : undefined,
                    borderRadius: isFullSize ? 0 : undefined
                }}
            >
                {isOS && createElement(component)}
                {!isOS && (
                    <motion.iframe
                        ref={iframeRef}
                        className={cn('size-full bg-neutral-900')}
                        initial={{
                            borderRadius: 6
                        }}
                        animate={{
                            borderRadius: isFullSize ? 0 : undefined
                        }}
                    />
                )}
            </motion.div>
        </motion.div>
    )
}
