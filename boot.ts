import { paths } from './paths'

async function fetchText(paths: string | string[]): Promise<string> {
    if (!Array.isArray(paths)) paths = [paths]
    const texts = await Promise.all(
        paths.map((path) => {
            return fetch(path).then((res) => res.text())
        })
    )
    return texts.join('\n')
}

const [coreCss = '', taskCss = ''] = await Promise.all([
    fetchText(paths.coreCss),
    fetchText(paths.taskCss)
])
const css = coreCss + taskCss
const style = document.querySelector<HTMLStyleElement>('#wed-css')!
style.textContent = css
window.taskCss = taskCss

const html = await fetchText('src/task/templ.html')
const taskTempl = html.replace(/<!-- Code injected by live-server -->.+<\/script>/s, '')
window.taskTempl = taskTempl

const codesMap: Record<string, string> = Object.fromEntries(
    await Promise.all(
        paths.codes.map(async (path) => {
            return [path.replace(/\.tsx?$/g, ''), await fetchText(path)]
        })
    )
)
window.codesMap = codesMap
const result = await buildCode('@core/script', codesMap, true)
const code = result.outputFiles?.[0]?.text
if (code === undefined) {
    throw Error('Build code lỗi.')
}
const script = document.querySelector<HTMLScriptElement>('#wed-js')!
script.text = code
