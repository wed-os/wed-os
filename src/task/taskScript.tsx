import '@task/script'

import { TaskApp } from '@task/components/TaskApp'
import { rootEl } from '@task/constants/rootEl'
import { taskSetup } from '@task/funcs/taskSetup'
import { createRoot } from 'react-dom/client'

await taskSetup()

createRoot(rootEl).render(<TaskApp />)
