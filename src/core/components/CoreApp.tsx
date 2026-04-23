import { Desktop } from '@core/components/Desktop'
import { Taskbar } from '@core/components/Taskbar'
import { coreSetup } from '@core/funcs/coreSetup'
import { handleWindowResize } from '@core/funcs/handleWindowResize'
import { useAsyncEffect, useEventListener } from 'ahooks'
import { useEffect } from 'react'

export function CoreApp() {
    useAsyncEffect(coreSetup, [])

    useEventListener('resize', handleWindowResize)
    useEffect(handleWindowResize, [])

    return (
        <div className="flex h-full flex-col">
            <Desktop />
            <Taskbar />
        </div>
    )
}
