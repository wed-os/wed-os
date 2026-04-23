/**
 * Chuyển ký tự đầu tiên thành chữ in thường.
 *
 * @public
 */
export function upperFirst(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1)
}
