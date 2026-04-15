import { generateCodeFiles } from '@scripts/funcs/generateCodeFiles'
import { FSWatcher, watch } from 'chokidar'

let codeFilesWatcher: FSWatcher | undefined

export function watchCodeFiles(): void {
    codeFilesWatcher?.close()

    const globs: string[] = [
        'src/{core,task}/{funcs,helpers,remotes,states,stores}/*.{tsx,ts}' //
    ]
    codeFilesWatcher = watch(globs, { ignoreInitial: true })
        .on('add', generateCodeFiles)
        .on('addDir', generateCodeFiles)
        .on('unlink', generateCodeFiles)
        .on('unlinkDir', generateCodeFiles)
    generateCodeFiles()

    console.log('Đã theo dõi các thư mục để tạo các code file.')
}
