import { ExportedDeclarations, JSDoc, Node, SyntaxKind } from 'ts-morph'

export function getJsDocs(decl: ExportedDeclarations): JSDoc[] {
    if ('getJsDocs' in decl) return decl.getJsDocs()

    if (Node.isVariableDeclaration(decl)) {
        const statement = decl.getFirstAncestorByKind(SyntaxKind.VariableStatement)
        if (statement) return statement.getJsDocs()
    }
    return []
}
