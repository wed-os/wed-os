import { Asyncify } from "@task/types/types"
import { taskRemotes } from '@task/constants/taskRemotes'
export type TaskRemotes = typeof taskRemotes
export type RequestCloseAsyncRemote = Asyncify<typeof taskRemotes.requestClose>
export type SyncAsyncRemote = Asyncify<typeof taskRemotes.sync>
