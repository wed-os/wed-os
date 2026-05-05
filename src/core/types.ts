import { Obj } from '@task/types/types'
import { BuildResult } from 'esbuild-wasm'

declare global {
    /**
     * Build code TS.
     *
     * @param entryPoints Đường dẫn file index trong {@link codesMap}.
     * @param isCoreSide Code này được build cho core hay task. Mặc định là task (false).
     * @param codesMap Danh sách file được sử dụng để import trong code, key là đường dẫn
     *   file, value là nội dung file.
     */
    function buildCode(
        entryPoints: string | string[],
        isCoreSide: boolean,
        codesMap: Record<string, string>
    ): Promise<BuildResult>

    /**
     * Thu nhỏ kích thước code CSS.
     *
     * @param css Code CSS cần thu nhỏ.
     */
    function minifyCss(css: string): Promise<string>

    var taskCss: string
    var taskTempl: string
    var codesMap: Obj<string>
}
