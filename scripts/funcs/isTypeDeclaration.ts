import { ExportedDeclarations, Node } from 'ts-morph'

export function isTypeDeclaration(decl: ExportedDeclarations): boolean {
    return Node.isTypeAliasDeclaration(decl) || Node.isInterfaceDeclaration(decl)
}
