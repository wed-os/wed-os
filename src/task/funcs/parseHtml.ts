/**
 * Chuyển văn bản HTML thành đối tượng {@linkcode Document}.
 *
 * @param html Chuỗi HTML hợp lệ.
 * @public
 */
export function parseHtml(html: string): Document {
    return Document.parseHTMLUnsafe(html)
}
