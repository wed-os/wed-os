import { project } from '@scripts/constants/project'
import { getJsDocs } from '@scripts/funcs/getJsDocs'
import { getJsDocTag } from '@scripts/funcs/getJsDocTag'
import { isTypeDeclaration } from '@scripts/funcs/isTypeDeclaration'
import { Code, GenerateEventName } from '@scripts/types/types'
import { writeFileSync } from 'fs'
import { matchesGlob } from 'path'

interface CachedDeclaration {
    declarationName: string
    isType: boolean
    aliasName: string
}

const cachedDeclarationsMap: Record<string, CachedDeclaration[]> = {}

export function generateApiFiles(eventName: GenerateEventName, path: string): void {
    if (!matchesGlob(path, 'src/task/**/*.{tsx,ts}')) return

    const file = project.addSourceFileAtPathIfExists(path)
    const aliasPath = path.replace('src/', '@').split('.')[0]
    if (!aliasPath) return

    if (file) {
        const cachedDeclarations: CachedDeclaration[] = []
        const declarationsMap = file.getExportedDeclarations()

        for (const [declarationName, declarations] of declarationsMap) {
            for (const decl of declarations) {
                const jsdocs = getJsDocs(decl)
                if (jsdocs.length === 0) continue

                const publicTag = getJsDocTag(jsdocs, 'public')
                if (!publicTag) continue

                const isType = isTypeDeclaration(decl)
                const publicTagText = publicTag.getCommentText() ?? ''
                const aliasName = publicTagText !== declarationName ? publicTagText : ''

                cachedDeclarations.push({
                    declarationName,
                    isType,
                    aliasName
                })
            }
        }
        if (cachedDeclarations.length > 0) {
            cachedDeclarationsMap[aliasPath] = cachedDeclarations
        } else {
            delete cachedDeclarationsMap[aliasPath]
        }
    } else {
        delete cachedDeclarationsMap[aliasPath]
    }

    if (file) project.removeSourceFile(file)

    if (eventName === 'init') return

    let codes: Code = []
    for (const [aliasPath, cachedDeclarations] of Object.entries(cachedDeclarationsMap)) {
        codes.push(
            'export {',
            cachedDeclarations
                .map(({ declarationName, isType, aliasName }) => {
                    return [
                        isType ? 'type ' : '',
                        declarationName,
                        aliasName ? ` as ${aliasName}` : ''
                    ].join('')
                })
                .join(','),
            `} from '${aliasPath}'\n`
        )
    }
    const code = codes.join('')
    writeFileSync('api/api.ts', code)

    console.log('Đã tạo API. Path thay đổi: %s', path)
}
