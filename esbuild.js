import { default as esbuild } from 'esbuild-wasm'

const wasmURL = 'https://esm.sh/esbuild-wasm@0.28.0/esbuild.wasm'
await esbuild.initialize({ wasmURL })

/**
 * @param {Record<string, string>} codesMap
 * @param {boolean} isCoreSide
 * @returns {import('esbuild-wasm').Plugin}
 */
function esbuildWedOSPlugin(codesMap, isCoreSide) {
    return {
        name: 'wedos',
        setup(build) {
            build.onResolve({ filter: /.*/ }, ({ path, resolveDir, importer }) => {
                if (path[0] === '.') {
                    path = new URL(path, `file://${resolveDir}/`).pathname
                } else if (/^@(core|task|root)\//.test(path)) {
                    path = path //
                        .replace(/^@(core|task)\//, '/src/$1/')
                        .replace(/^@root\//, '/')
                }
                if (importer === '/src/task/components/App') {
                }
                if (path[0] === '/') {
                    return { path, namespace: 'wedos' }
                }
                return { path, external: true }
            })
            build.onLoad({ filter: /.*/, namespace: 'wedos' }, ({ path }) => {
                const resolveDir = path.split('/').slice(0, -1).join('/') || '/'
                let code = codesMap[path]
                if (!isCoreSide) {
                    const isCoreSidePath = /^\/src\/core\b/.test(path)
                    if (isCoreSidePath) code = ''
                }
                return { contents: code, loader: 'tsx', resolveDir }
            })
        }
    }
}

/**
 * @param {string | string[]} entryPoints
 * @param {Record<string, string>} codesMap
 * @param {boolean} isCoreSide
 * @returns {import('esbuild-wasm').BuildResult}
 */
export function buildCode(entryPoints, codesMap, isCoreSide) {
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
        plugins: [esbuildWedOSPlugin(codesMap, isCoreSide)]
    })
}

window.buildCode = buildCode
