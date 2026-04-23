import { CoreApp } from '@core/components/CoreApp'
import { maximize } from '@core/remotes/maximize'
import { minimize } from '@core/remotes/minimize'
import { Button } from '@task/components/Button'
import { Icon } from '@task/components/Icon'
import { easeOutQuint } from '@task/constants/easings'
import { minimizedTaskHeight, minimizedTaskWidth, Task } from '@task/constants/task'
import { clamp } from '@task/funcs/clamp'
import { cn } from '@task/funcs/cn'
import { isOSOrCoreTask } from '@task/funcs/isOSOrCoreTask'
import { isSelfEvent } from '@task/funcs/isSelfEvent'
import { useOS } from '@task/hooks/useOS'
import { motion, TargetAndTransition, useDragControls } from 'motion/react'
import { createElement, PointerEvent, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { useSnapshot } from 'valtio'

interface WindowProps {
    task: Task
}

export function Window({ task }: WindowProps) {
    const { desktopX, desktopY, desktopWidth, desktopHeight } = useOS()
    const { fullscreen, maximized, minimized, noHeader, width, height, x, y } = useSnapshot(task)

    const isOSOrCore = isOSOrCoreTask(task)
    const isHeaderVisible = !noHeader && !fullscreen
    const isFullSize = (fullscreen || maximized) && !minimized

    const dragControl = useDragControls()
    const [dragging, setDragging] = useState(false)
    const startDragEvent = useRef<PointerEvent>(null)
    const mounter = useRef<HTMLDivElement | null>(null)
    const iframer = useRef<HTMLIFrameElement | null>(null)

    const taskbarTaskRect = useMemo(() => {
        const taskbarTaskEl = document.querySelector(`[data-wed-taskbar-task-id="${task.id}"]`)
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

    useEffect(() => {
        if (!isOSOrCore || !mounter.current) return
        const root = createRoot(mounter.current)
        root.render(<CoreApp />)
        return root.unmount
    }, [])

    return (
        <motion.div
            className="absolute flex flex-col bg-neutral-900 shadow-lg outline"
            initial={{
                ...rect,
                borderRadius: 12,
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
            {isHeaderVisible && (
                <motion.div
                    className="flex items-center p-1 *:pointer-events-none"
                    onPointerDown={headerPointerDown}
                    onPointerMove={headerPointerMove}
                    onLostPointerCapture={headerLostPointerCapture}
                >
                    <div className="w-30" />
                    <div className="flex min-w-0 flex-auto items-center justify-center gap-2">
                        <Icon name={task.icon} />
                        <div className="truncate">{task.title}</div>
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
                        <Button
                            className={isFullSize ? '' : 'rounded-tr-lg'}
                            size="small"
                            variant="minimal"
                            color="danger"
                            icon="xmark"
                        />
                    </div>
                </motion.div>
            )}
            <motion.div
                className="flex-1"
                initial={{
                    padding: 4,
                    borderRadius: 10
                }}
                animate={{
                    padding: isFullSize ? 0 : undefined,
                    paddingTop: isHeaderVisible ? 0 : undefined,
                    borderRadius: isFullSize ? 0 : undefined
                }}
            >
                {createElement(isOSOrCore ? motion.div : motion.iframe, {
                    ref: isOSOrCore ? mounter : (iframer as any),
                    className: cn('size-full bg-neutral-900'),
                    initial: {
                        borderRadius: 8
                    },
                    animate: {
                        borderRadius: isFullSize ? 0 : undefined
                    }
                })}
            </motion.div>
        </motion.div>
    )
}
