import { coreRemotes } from '@core/constants/coreRemotes'
import { fs } from '@core/constants/fs'
import { handleWindowResize } from '@core/funcs/handleWindowResize'
import { installApp } from '@core/remotes/installApp'
import { runTask } from '@core/remotes/runTask'
import { paths } from '@root/paths'
import { AppInstallMode } from '@task/constants/appInstallModes'
import { handleWindowMessage } from '@task/funcs/handleWindowMessage'
import { unstable_enableOp } from 'valtio'

export async function coreSetup(): Promise<void> {
    unstable_enableOp(true)

    await fs.init({ bytes: 1024 * 1024 * 512 })

    window.addEventListener('message', handleWindowMessage.bind(null, coreRemotes))
    window.addEventListener('resize', handleWindowResize)

    handleWindowResize()

    const osApp = await installApp(AppInstallMode.OS, '/C/apps/WedOS', '/C/apps/WedOS')
    runTask(osApp.path)

    for (const path of paths['apps']) {
        if (path === '/C/apps/WedOS') continue
        await installApp(AppInstallMode.Boot, path, path)
    }

    runTask('/C/apps/CodeEditor')
}
