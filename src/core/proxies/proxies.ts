import { invoke } from "@task/funcs/invoke"
import { Task } from "@task/constants/task"
import type {
RequestCloseAsyncRemote,
SyncAsyncRemote
} from '@task/types/taskRemoteTypes'


export const requestClose = async function(this: Task,...args) {
return invoke(this, 'requestClose', args)
} as RequestCloseAsyncRemote


export const sync = async function(this: Task,...args) {
return invoke(this, 'sync', args)
} as SyncAsyncRemote
