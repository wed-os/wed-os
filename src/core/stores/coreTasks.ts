import { CoreTask } from '@core/types/CoreTask'
import { proxy } from 'valtio'

export const coreTasks = proxy<CoreTask[]>([])
