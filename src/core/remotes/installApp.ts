import { writeFile } from '@core/remotes/writeFile'
import { App, appSchema, defaultAppIcon } from '@task/constants/app'
import { AppInstallMode } from '@task/constants/appInstallModes'
import { makeAppPermissions } from '@task/constants/appPermission'
import { AppType } from '@task/constants/appTypes'
import { os } from '@task/constants/os'
import { assertSchema } from '@task/funcs/assertSchema'
import { isObject } from '@task/funcs/isObject'
import { joinPath } from '@task/funcs/joinPath'
import { nanoId } from '@task/funcs/nanoId'
import { parseYaml } from '@task/funcs/parseYaml'
import { isString } from 'lodash-es'

/** @public */
export async function installApp(
    mode: AppInstallMode,
    srcPath: string,
    destPath: string
): Promise<App> {
    const srcWedPath = joinPath(srcPath, 'app.wed')
    const srcTsxPath = joinPath(srcPath, 'app.tsx')
    const srcCssPath = joinPath(srcPath, 'app.css')
    const srcHtmlPath = joinPath(srcPath, 'app.html')

    const destWedPath = joinPath(destPath, 'app.wed')
    const destTsxPath = joinPath(destPath, 'app.tsx')
    const destCssPath = joinPath(destPath, 'app.css')
    const destHtmlPath = joinPath(destPath, 'app.html')

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
    wed.icon ??= defaultAppIcon

    const app: App = {
        type: AppType.Normal,
        ...wed,
        id: nanoId(),
        path: destPath,
        name: wed.name,
        icon: String(wed.icon),
        perms: makeAppPermissions()
    }
    assertSchema(appSchema, app)

    const tsxRes = await fetch(srcTsxPath)
    if (!tsxRes.ok) {
        throw Error('Không tìm thấy tập tin code.')
    }
    const tsx = await tsxRes.text()

    const cssRes = await fetch(srcCssPath)
    const css = cssRes.ok ? await cssRes.text() : null

    const htmlRes = await fetch(srcHtmlPath)
    const html = htmlRes.ok ? await htmlRes.text() : null

    await writeFile(destWedPath, wedText)
    await writeFile(destTsxPath, tsx)
    if (css !== null) {
        await writeFile(destCssPath, css)
    }
    if (html !== null) {
        await writeFile(destHtmlPath, html)
    }
    os.apps.push(app)

    return app
}
