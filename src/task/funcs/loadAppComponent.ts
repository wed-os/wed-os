import { os } from '@task/constants/os'
import { ref } from '@task/funcs/ref'

export async function loadAppComponent(): Promise<void> {
    const { App } = await import('@task/components/App')
    os.component = ref(App)
}
