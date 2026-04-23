import { GenerateEventName } from '@scripts/types/types'
import { sync } from 'fast-glob'
import { writeFileSync } from 'fs'

export function generatePathsFile(eventName: GenerateEventName): void {
    if (eventName === 'change') return

    const globsMap = {
        codes: ['/src/{core,task}/**/*.{tsx,ts}', '/paths.ts'],
        coreCss: ['/src/core/**/*.css'],
        taskCss: ['/src/task/**/*.css'],
        apps: ['/C/apps/*'],
        nonApps: ['/C/!(apps|tsconfig.json)/**']
    }
    const entries: [string, string[]][] = []

    for (const name in globsMap) {
        const globs = globsMap[name as keyof typeof globsMap]
        const paths = sync(
            globs.map((glob) => glob.slice(1)),
            { onlyFiles: false }
        ).map((path) => '/' + path)
        entries.push([name, paths])
    }

    const codes = [
        'export const paths = {',
        entries.map(([name, paths]) => {
            return [`${name}: ${JSON.stringify(paths, null, 4)},`]
        }),
        '}'
    ]
    const code = codes.flat(3).join('\n')
    writeFileSync('paths.ts', code)

    console.log('Đã tạo paths file.')
}
