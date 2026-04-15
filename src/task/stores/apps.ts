import { App } from '@task/types/App'
import { proxy } from 'valtio'

export const apps = proxy<App[]>([])
