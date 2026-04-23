/** Chuyển đường dẫn Windows (dùng `\`) sang dạng dùng `/`. */
export function toPosixPath(path: string): string {
    return path.replaceAll('\\', '/')
}
