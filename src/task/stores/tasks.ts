import { Task } from '@task/types/Task'
import { proxy } from 'valtio'

export const tasks = proxy<Task[]>([])
