import * as funcs from '@task/generated/funcs'
import * as helpers from '@task/generated/helpers'
import * as remotes from '@task/generated/remotes'
import * as states from '@task/generated/states'
import * as stores from '@task/generated/stores'

export type ReturnStatesType<T> = { [K in keyof T]: ReturnType<T[K]> }

export type TaskFuncs = typeof funcs
export type TaskHelpers = typeof helpers
export type TaskRemotes = typeof remotes
export type TaskStates = typeof states
export type TaskStores = typeof stores

export type TaskMembers = TaskFuncs & TaskHelpers & TaskRemotes & TaskStates & TaskStores
