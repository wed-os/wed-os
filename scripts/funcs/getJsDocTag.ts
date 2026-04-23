import { JSDoc, JSDocTag } from 'ts-morph'

export function getJsDocTag(jsdocs: JSDoc[], tagName: string): JSDocTag | undefined {
    for (const jsdoc of jsdocs) {
        for (const tag of jsdoc.getTags()) {
            if (tag.getTagName() === tagName) return tag
        }
    }
}
