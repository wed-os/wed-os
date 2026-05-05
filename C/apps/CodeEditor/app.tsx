import { useAsyncEffect } from 'ahooks'
import { lazy, Workspace } from 'modern-monaco'
import { createElement } from 'react'
import { proxy, useSnapshot } from 'valtio'
import {
    createDir,
    getEnt,
    readDir,
    readFile,
    ref,
    uint8ArrayToArrayBuffer,
    writeFile
} from 'wedos'

indexedDB.deleteDatabase('modern-monaco-workspace(default)')

interface App {
    wsDir: string | undefined
    ws: Workspace | null
}

const app = proxy<App>({
    wsDir: '/C/apps/CodeEditor',
    ws: null
})

export function App() {
    const { wsDir } = useSnapshot(app)

    useAsyncEffect(async () => {
        if (!wsDir) return
        app.ws = ref(
            new Workspace({
                initialFiles: {},
                customFS: {
                    async readFile(path) {
                        path = path.replace('file://', '')
                        const buffer = await readFile(path, 'buffer')
                        return new Uint8Array(buffer)
                    },
                    readTextFile(path) {
                        path = path.replace('file://', '')
                        return readFile(path)
                    },
                    async writeFile(path, data) {
                        path = path.replace('file://', '')
                        if (data instanceof Uint8Array) {
                            const buffer = uint8ArrayToArrayBuffer(data)
                            writeFile(path, buffer)
                        } else {
                            writeFile(path, data)
                        }
                    },
                    async createDirectory(path) {
                        path = path.replace('file://', '')
                        createDir(path)
                    },
                    async readDirectory(path) {
                        path = path.replace('file://', '')
                        const ents = await readDir(path)
                        return ents.map((ent) => {
                            return [ent.path, ent.isFile ? 1 : ent.isDir ? 2 : 0]
                        })
                    },
                    async stat(path) {
                        path = path.replace('file://', '')
                        const ent = await getEnt(path)
                        return {
                            type: ent.isFile ? 1 : ent.isDir ? 2 : 0,
                            mtime: ent.mtime,
                            ctime: ent.mtime,
                            size: ent.size,
                            version: ent.mtime
                        }
                    },
                    watch() {
                        return () => {}
                    }
                }
            })
        )
        lazy({
            workspace: app.ws,
            defaultTheme: 'github-dark-default'
        })
        app.ws.openTextDocument('/C/apps/CodeEditor/app.html')
    }, [wsDir])

    return (
        <div className="flex h-full flex-col">
            <div className="flex min-h-0 flex-1">
                <div className="w-80 border-r">Explorer</div>

                <div className="min-h-0 min-w-0 flex-1">
                    {/* Code editor */}
                    {createElement('monaco-editor')}
                </div>
            </div>

            {/* Status bar */}
            <div className="border-t">Status bar</div>
        </div>
    )
}
