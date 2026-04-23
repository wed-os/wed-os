import { generateApiFiles } from '@scripts/funcs/generateApiFiles'
import { generatePathsFile } from '@scripts/funcs/generatePathsFile'
import { generateProxyFile } from '@scripts/funcs/generateProxyFile'
import { toPosixPath } from '@scripts/funcs/toPosixPath'
import { FSWatcher, watch } from 'chokidar'
import { sync } from 'fast-glob'
import { matchesGlob } from 'path'

const globs: string[] = [
    'src/{core,task}/**/*.{tsx,ts,css}', //
    'C/**'
]
let watcher: FSWatcher | undefined

export function watchFiles(): void {
    watcher?.close()

    const paths = sync(globs).map((winPath) => toPosixPath(winPath))

    for (const path of paths) {
        generateProxyFile('init', path)
    }
    const anyCoreRemotesPath = paths.find((path) => path.startsWith('src/core/remotes/'))
    const anyTaskRemotesPath = paths.find((path) => path.startsWith('src/task/remotes/'))
    if (anyCoreRemotesPath) generateProxyFile('change', anyCoreRemotesPath)
    if (anyTaskRemotesPath) generateProxyFile('change', anyTaskRemotesPath)

    for (const path of paths) {
        generateApiFiles('init', path)
    }
    const anyTaskCodePath = paths.find((path) => matchesGlob(path, 'src/task/**/*.{tsx,ts}'))
    if (anyTaskCodePath) generateApiFiles('change', anyTaskCodePath)

    generatePathsFile('init')

    watcher = watch(globs, {
        ignoreInitial: true,
        useFsEvents: true
    }).on('all', (eventName, winPath) => {
        const path = toPosixPath(winPath)
        generateProxyFile(eventName, path)
        generateApiFiles(eventName, path)
        generatePathsFile(eventName)
    })

    console.log('Đang theo dõi các thư mục để tạo code.')
}
