import '@tailwindcss/browser'

import { Window } from '@core/components/Window'
import { fs } from '@core/constants/fs'
import { installApp } from '@core/remotes/installApp'
import { runTask } from '@core/remotes/runTask'
import { AppInstallMode } from '@task/constants/appInstallModes'
import { os } from '@task/constants/os'
import { createRoot } from 'react-dom/client'

await fs.init({ bytes: 1024 * 1024 * 512 })

const app = await installApp(AppInstallMode.OS, '/C/apps/WedOS', '/C/apps/WedOS')

runTask(app.path)

const rootEl = document.querySelector('#wed-root')!
createRoot(rootEl).render(<Window task={os} />)
