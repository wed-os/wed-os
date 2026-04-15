/**
 * Kiểm tra đường dẫn có phải đường dẫn tuyệt đối không.
 *
 * @param path Đường dẫn cần kiểm tra.
 */

export function isAbsPath(path: string): boolean {
    return path[0] === '/'
}
