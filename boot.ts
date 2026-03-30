import { paths } from './paths'

const codesMap: Record<string, string> = Object.fromEntries(
    await Promise.all(
        paths.codes.map(async (path) => {
            return [
                path.replace(/\.tsx?$/g, ''), //
                await fetch(path).then((res) => res.text())
            ]
        })
    )
)

const result = await buildCode('@core/script', codesMap, true)
const code = result.outputFiles?.[0].text
if (code === undefined) {
    throw Error('Build code lỗi')
}
const script = document.createElement('script')
script.type = 'module'
script.text = code
document.head.append(script)
