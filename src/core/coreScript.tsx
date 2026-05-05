import '@task/script'

import { Window } from '@core/components/Window'
import { coreSetup } from '@core/funcs/coreSetup'
import { os } from '@task/constants/os'
import { rootEl } from '@task/constants/rootEl'
import { createRoot } from 'react-dom/client'

await coreSetup()

createRoot(rootEl).render(<Window task={os} />)
