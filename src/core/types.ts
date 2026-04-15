import { BuildResult } from 'esbuild-wasm'

declare global {
    /**
     * Build code TS.
     *
     * @param entryPoints Đường dẫn file index trong {@link codesMap}.
     * @param codesMap Danh sách file được sử dụng để import trong code, key là đường dẫn
     *   file, value là nội dung file.
     * @param isCoreSide Code này được build cho core hay task.
     */
    function buildCode(
        entryPoints: string | string[],
        codesMap: Record<string, string>,
        isCoreSide: boolean
    ): Promise<BuildResult>
}
