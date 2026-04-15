import { generatePathsFile } from '@scripts/funcs/generatePathsFile'
import { FSWatcher, watch } from 'chokidar'

let pathsFileWatcher: FSWatcher | undefined

export function watchPathsFile(): void {
    pathsFileWatcher?.close()

    const globs: string[] = [
        'src/{core,task}/**/*.{tsx,ts}', //
        'C/**'
    ]
    pathsFileWatcher = watch(globs, { ignoreInitial: true })
        .on('add', generatePathsFile)
        .on('addDir', generatePathsFile)
        .on('unlink', generatePathsFile)
        .on('unlinkDir', generatePathsFile)
    generatePathsFile()

    console.log('Đã theo dõi các thư mục để tạo paths file.')
}
