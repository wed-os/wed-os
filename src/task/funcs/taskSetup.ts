import { os } from '@task/constants/os'
import { taskRemotes } from '@task/constants/taskRemotes'
import { handleWindowMessage } from '@task/funcs/handleWindowMessage'
import { ref } from '@task/funcs/ref'
import { handshake } from '@task/proxies/proxies'
import { sync } from '@task/remotes/sync'

export async function taskSetup(): Promise<void> {
    const secretIdEl = document.querySelector<HTMLMetaElement>('meta[name="wed:secret-id"]')!
    os.secretId = secretIdEl.content
    secretIdEl.remove()

    const { parent } = window
    os.postMessage = ref(parent.postMessage.bind(parent))

    window.addEventListener('message', handleWindowMessage.bind(null, taskRemotes))

    const syncOps = await handshake()
    sync(syncOps)
}
