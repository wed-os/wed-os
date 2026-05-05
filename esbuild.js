import { default as esbuild } from 'esbuild-wasm'

const wasmURL = 'https://esm.sh/esbuild-wasm@0.28.0/esbuild.wasm'
await esbuild.initialize({ wasmURL })

/**
 * @param {boolean} isCoreSide
 * @param {Record<string, string>} codesMap
 * @returns {import('esbuild-wasm').Plugin}
 */
function esbuildWedOSPlugin(isCoreSide, codesMap) {
    return {
        name: 'wedos',
        setup(build) {
            build.onResolve({ filter: /.*/ }, ({ path, resolveDir, importer }) => {
                const isAppImporter = importer === '/src/task/components/App' && !isCoreSide
                let namespace = ''
                if (path[0] === '.') {
                    path = new URL(path, `file://${resolveDir}/`).pathname
                }
                if (isAppImporter) {
                    if (path === 'wedos') {
                        path = '/api/api'
                    } else {
                        namespace = '/app:'
                    }
                } else {
                    if (/^@(core|task|root)\//.test(path)) {
                        path = path //
                            .replace(/^@(core|task)\//, '/src/$1/')
                            .replace(/^@root\//, '/')
                    }
                }
                if (path[0] === '/') {
                    return { path, namespace }
                }
                return { path, external: true }
            })
            build.onLoad({ filter: /.*/ }, ({ path, namespace }) => {
                if (namespace === 'file') namespace = ''
                let code = codesMap[namespace + path]
                // if (!isCoreSide) {
                //     const isCoreSidePath = path.startsWith('/src/core/')
                //     if (isCoreSidePath) code = ''
                // }
                return { contents: code, loader: 'tsx' }
            })
        }
    }
}

/**
 * @param {string | string[]} entryPoints
 * @param {boolean} [isCoreSide]
 * @param {Record<string, string>} codesMap
 * @returns {import('esbuild-wasm').BuildResult}
 */
export async function buildCode(entryPoints, isCoreSide, codesMap) {
    if (typeof entryPoints === 'string') {
        entryPoints = [entryPoints]
    }
    return esbuild.build({
        entryPoints,
        bundle: true,
        minify: true,
        treeShaking: true,
        write: false,
        format: 'esm',
        target: ['esnext'],
        jsx: 'automatic',
        // sourcemap: true,
        plugins: [esbuildWedOSPlugin(isCoreSide, codesMap)]
    })
}

/**
 * @param {string} css
 * @returns {string}
 */
export async function minifyCss(css) {
    const result = await esbuild.transform(css, {
        loader: 'css',
        minify: true
    })
    return result.code
}

window.buildCode = buildCode
window.minifyCss = minifyCss
