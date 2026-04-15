import { writeFile } from '@core/remotes/writeFile'
import { AppInstallMode } from '@task/constants/appInstallModes'
import { appSchema } from '@task/constants/appSchema'
import { AppType } from '@task/constants/appTypes'
import { isObject } from '@task/funcs/isObject'
import { joinPath } from '@task/funcs/joinPath'
import { nanoId } from '@task/funcs/nanoId'
import { parseYaml } from '@task/funcs/parseYaml'
import { apps } from '@task/stores/apps'
import { App } from '@task/types/App'
import { isString } from 'lodash-es'

export async function installApp(
    mode: AppInstallMode,
    srcPath: string,
    destPath: string
): Promise<App> {
    const srcWedPath = joinPath(srcPath, 'app.wed')
    const srcTsxPath = joinPath(srcPath, 'app.tsx')
    const srcCssPath = joinPath(srcPath, 'app.css')

    const destWedPath = joinPath(destPath, 'app.wed')
    const destTsxPath = joinPath(destPath, 'app.tsx')
    const destCssPath = joinPath(destPath, 'app.css')

    const wedRes = await fetch(srcWedPath)
    if (!wedRes.ok) {
        throw Error('Không tìm thấy tập tin khai báo.')
    }
    const wedText = await wedRes.text()
    const wed = parseYaml(wedText)

    if (!isObject(wed)) {
        throw Error('Khai báo ứng dụng không hợp lệ.')
    }
    if (!isString(wed.name)) {
        throw Error('Tên ứng dụng không hợp lệ.')
    }

    const appInput: App = {
        type: AppType.User,
        ...wed,
        id: nanoId(),
        path: destPath,
        name: wed.name
    }
    const app = appSchema.parse(appInput)

    const tsxRes = await fetch(srcTsxPath)
    if (!tsxRes.ok) {
        throw Error('Không tìm thấy tập tin code.')
    }
    const tsx = await tsxRes.text()

    const cssRes = await fetch(srcCssPath)
    const css = cssRes.ok ? await cssRes.text() : null

    await writeFile(destWedPath, wedText)
    await writeFile(destTsxPath, tsx)
    if (css !== null) {
        await writeFile(destCssPath, css)
    }
    apps.push(app)

    return app
}
