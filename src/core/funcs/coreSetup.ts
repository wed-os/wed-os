import { installApp } from '@core/remotes/installApp'
import { runTask } from '@core/remotes/runTask'
import { paths } from '@root/paths'
import { AppInstallMode } from '@task/constants/appInstallModes'

export async function coreSetup(): Promise<void> {
    for (const path of paths['apps']) {
        if (path === '/C/apps/WedOS') continue
        await installApp(AppInstallMode.Boot, path, path)
    }
    runTask('/C/apps/FileManager')
}
