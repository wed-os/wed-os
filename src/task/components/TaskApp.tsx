import { loadAppComponent } from '@task/funcs/loadAppComponent'
import { useOS } from '@task/hooks/useOS'
import { useAsyncEffect } from 'ahooks'
import { createElement } from 'react'

export function TaskApp() {
    const { component } = useOS()

    useAsyncEffect(loadAppComponent, [])

    return (
        <div className="h-full">
            {/* */}
            {createElement(component)}
        </div>
    )
}
