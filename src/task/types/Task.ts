import { TaskFuncs, TaskStates, TaskStores } from '@task/types/taskMembers'

export interface Task extends TaskFuncs, TaskStates, TaskStores {}
