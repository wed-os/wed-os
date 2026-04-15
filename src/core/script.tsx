import '@tailwindcss/browser'

import { Window } from '@core/components/Window'
import { fs } from '@core/constants/fs'
import { os } from '@core/constants/os'
import { runCoreTask } from '@core/funcs/runCoreTask'
import { installApp } from '@core/remotes/installApp'
import { AppInstallMode } from '@task/constants/appInstallModes'
import { createRoot } from 'react-dom/client'

await fs.init({ bytes: 1024 * 1024 * 512 })

const app = await installApp(AppInstallMode.OS, '/C/apps/WedOS', '/C/apps/WedOS')

const task = runCoreTask(app.path)
Object.assign(os, task)
console.log(os)

const rootEl = document.querySelector('#wed-root')!
const root = createRoot(rootEl)
root.render(<Window />)
