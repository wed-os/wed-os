import { project } from '@scripts/constants/project'
import { Side, SideItem } from '@scripts/constants/sides'
import { getJsDocs } from '@scripts/funcs/getJsDocs'
import { getSideItem } from '@scripts/funcs/getSideItem'
import { Code, GenerateEventName } from '@scripts/types/types'
import { writeFileSync } from 'fs'
import { flatMap, map, upperFirst } from 'lodash-es'
import { basename, matchesGlob } from 'path'

interface FuncCache {
    funcName: string
    upperFuncName: string
    jsdoc: string
    isAsync: boolean
}
type SideCache = Record<string, FuncCache>

const funcsCache: Record<Side, SideCache> = {
    core: {},
    task: {}
}

export function generateProxyFile(eventName: GenerateEventName, path: string): void {
    if (!matchesGlob(path, 'src/{core,task}/remotes/*.{tsx,ts}')) return

    const side = path.startsWith('src/core/') ? Side.Core : Side.Task
    const sideItem = getSideItem(side)
    const funcName = basename(path).replace(/\.tsx?$/, '')

    const file = project.addSourceFileAtPathIfExists(path)
    file?.refreshFromFileSystemSync()
    const func = file?.getFunction(funcName)

    if (file && func) {
        const jsdocs = getJsDocs(func)
        const jsdoc = jsdocs.at(-1)?.getFullText() ?? ''
        const isAsync = func.isAsync()
        const cache: FuncCache = {
            funcName,
            upperFuncName: upperFirst(funcName),
            jsdoc,
            isAsync
        }
        funcsCache[side][funcName] = cache
    } else {
        delete funcsCache[side][funcName]
    }

    if (file) project.removeSourceFile(file)

    if (eventName === 'init') return

    generateRemoteNamesFile(sideItem)
    generateRemotesFile(sideItem)
    generateRemoteTypesFile(sideItem)
    generateProxiesFile(sideItem)

    console.log('Đã tạo các code file. Path thay đổi: %s', path)
}

function generateRemoteNamesFile({ side }: SideItem): void {
    const codes: Code = [
        `export const ${side}RemoteNames = `,
        JSON.stringify(Object.keys(funcsCache[side])),
        ' as const\n'
    ]
    const code = codes.join('')
    const path = `src/${side}/constants/${side}RemoteNames.ts`
    writeFileSync(path, code)
}

function generateRemotesFile({ side }: SideItem): void {
    const codes: Code = [
        map(funcsCache[side], ({ funcName }) => {
            return `import { ${funcName} } from '@${side}/remotes/${funcName}'\n`
        }),
        `export const ${side}Remotes = { `,
        Object.keys(funcsCache[side]).join(', '),
        ' }\n'
    ]
    const code = codes.flat(2).join('')
    const path = `src/${side}/constants/${side}Remotes.ts`
    writeFileSync(path, code)
}

function generateRemoteTypesFile({ side }: SideItem): void {
    const codes: Code = [
        'import { Asyncify } from "@task/types/types"\n',
        map(funcsCache[side], ({ funcName }) => {
            return `import { ${funcName} } from '@${side}/remotes/${funcName}'\n`
        }),
        flatMap(funcsCache[side], ({ funcName, upperFuncName, isAsync }) => [
            `export type ${upperFuncName}Remote = `,
            isAsync ? `typeof ${funcName}` : `Asyncify<typeof ${funcName}>`,
            '\n'
        ])
    ]
    const code = codes.flat(2).join('')
    const path = `src/${side}/types/${side}RemoteTypes.d.ts`
    writeFileSync(path, code)
}

function generateProxiesFile({ side, oppositeSide }: SideItem): void {
    const codes: Code = [
        'import type { ',
        map(funcsCache[side], ({ upperFuncName }) => `${upperFuncName}Remote`).join(', '),
        ` } from '@${side}/types/${side}RemoteTypes'\n`,
        flatMap(funcsCache[side], ({ funcName, upperFuncName, jsdoc }) => [
            `\n${jsdoc}\n`,
            `export const ${funcName}: ${upperFuncName}Remote = async (...args) => {\n`,
            '}\n'
        ])
    ]
    const code = codes.flat(2).join('')
    const path = `src/${oppositeSide}/proxies/proxies.ts`
    writeFileSync(path, code)
}
