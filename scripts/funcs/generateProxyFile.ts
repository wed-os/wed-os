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

function generateRemoteTypesFile({ side, upperSide }: SideItem): void {
    const codes: Code = [
        'import { Asyncify } from "@task/types/types"\n',
        `import { ${side}Remotes } from '@${side}/constants/${side}Remotes'\n`,
        `export type ${upperSide}Remotes = typeof ${side}Remotes\n`,
        flatMap(funcsCache[side], ({ funcName, upperFuncName, isAsync }) => [
            `export type ${upperFuncName}AsyncRemote = `,
            isAsync
                ? `typeof ${side}Remotes.${funcName}`
                : `Asyncify<typeof ${side}Remotes.${funcName}>`,
            '\n'
        ])
    ]
    const code = codes.flat(2).join('')
    const path = `src/${side}/types/${side}RemoteTypes.d.ts`
    writeFileSync(path, code)
}

function generateProxiesFile({ side, oppositeSide }: SideItem): void {
    const codes: Code = [
        'import { invoke } from "@task/funcs/invoke"\n',
        side === Side.Task
            ? 'import { Task } from "@task/constants/task"\n'
            : 'import { os } from "@task/constants/os"\n',
        'import type {\n',
        map(funcsCache[side], ({ upperFuncName }) => `${upperFuncName}AsyncRemote`).join(',\n'),
        `\n} from '@${side}/types/${side}RemoteTypes'\n`,
        flatMap(funcsCache[side], ({ funcName, upperFuncName, jsdoc }) => [
            `\n${jsdoc}\n`,
            `export const ${funcName} = async function(${side === Side.Task ? 'this: Task,' : ''}...args) {\n`,
            `return invoke(${side === Side.Task ? 'this' : 'os'}, '${funcName}', args)\n`,
            `} as ${upperFuncName}AsyncRemote\n`
        ])
    ]
    const code = codes.flat(2).join('')
    const path = `src/${oppositeSide}/proxies/proxies.ts`
    writeFileSync(path, code)
}
