import { sync } from 'fast-glob'
import { writeFileSync } from 'fs'

export function generatePathsFile(): void {
    const globs = {
        codes: '/src/{shared,system,core,bridge,task}/**/*.{tsx,ts}',
        sharedCss: '/src/shared/**/*.css',
        systemCss: '/src/system/**/*.css',
        coreCss: '/src/core/**/*.css',
        bridgeCss: '/src/bridge/**/*.css',
        taskCss: '/src/task/**/*.css',
        apps: '/C/apps/*',
        excludedApps: '/C/!(apps)/**'
    }
    const entries: [string, string, string[]][] = []
    for (const name in globs) {
        const glob = globs[name as keyof typeof globs]
        entries.push([
            glob,
            name,
            sync(glob.slice(1), {
                onlyFiles: false
            }).map((path) => '/' + path)
        ])
    }
    const codes = [
        'export const paths = {',
        entries.map(([glob, name, paths]) => {
            return [
                `/** ${glob.replace(/\*\//g, '*\\/')} */`, //
                `${name}: ${JSON.stringify(paths, null, 4)},`
            ]
        }),
        '}'
    ]
    const code = codes.flat(2).join('\n')
    writeFileSync('paths.ts', code)
}
