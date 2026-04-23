import { splitPath } from '@task/funcs/splitPath'

/**
 * Chuẩn hóa một đường dẫn.
 *
 * @param path Đường dẫn cần chuẩn hóa.
 * @public
 */
export function normPath(path: string): string {
    const [nodes, root] = splitPath(path, true)
    const result = root + nodes.join('/')
    return result || '.'
}
