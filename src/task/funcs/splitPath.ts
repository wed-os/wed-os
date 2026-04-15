/**
 * Tách đường dẫn thành các thư mục phân tách bởi dấu `/`.
 *
 * @param path Đường dẫn cần tách.
 * @param resolveDots Giải quyết các thư mục `.`, `..`.
 */
export function splitPath(path: string, resolveDots?: boolean): [string[], string] {
    const nodes: string[] = []
    const root = path[0] === '/' ? '/' : ''

    const rawNodes = path.slice(root ? 1 : 0).split(/\/+/)
    rawNodes.forEach((node) => {
        switch (node) {
            case '':
                return
            case '.':
                if (resolveDots) return
                break
            case '..':
                if (resolveDots) {
                    nodes.pop()
                    return
                }
                break
        }
        nodes.push(node)
    })

    return [nodes, root]
}
