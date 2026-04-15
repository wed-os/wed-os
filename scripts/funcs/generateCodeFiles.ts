import { sync } from 'fast-glob'
import { writeFileSync } from 'fs'
import { basename } from 'path'

export function generateCodeFiles(): void {
    const sides = ['core', 'task'] as const
    const folders = ['funcs', 'helpers', 'remotes', 'states', 'stores'] as const

    for (const side of sides) {
        const generatedDir = `src/${side}/generated`

        for (const folder of folders) {
            const stems = getStemNames(`src/${side}/${folder}/*.{tsx,ts}`)

            const code = stems
                .map((stem) => `export { ${stem} } from '@${side}/${folder}/${stem}'`)
                .join('\n')
            writeFileSync(`${generatedDir}/${folder}.ts`, code)

            switch (folder) {
                case 'remotes': {
                    const code = `const remoteNames: string[] = ${JSON.stringify(stems)}`
                    writeFileSync(`${generatedDir}/remoteNames.ts`, code)
                    break
                }
                // case 'states': {
                //     const code = stems
                //         .map((stem) => {
                //             return `export { create${upperFirst(stem)} } from '@${side}/states/${stem}'`
                //         })
                //         .join('\n')
                //     writeFileSync(`${generatedDir}/stateCreators.ts`, code)
                //     break
                // }
            }
        }
    }
}

function getStemNames(glob: string | string[]): string[] {
    return sync(glob).map((path) => {
        return basename(path).split('.')[0]
    })
}
