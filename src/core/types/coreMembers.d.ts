import * as funcs from '@core/generated/funcs'
import * as helpers from '@core/generated/helpers'
import * as remotes from '@core/generated/remotes'
import * as states from '@core/generated/states'
import * as stores from '@core/generated/stores'

export type CoreFuncs = typeof funcs
export type CoreHelpers = typeof helpers
export type CoreRemotes = typeof remotes
export type CoreStates = typeof states
export type CoreStores = typeof stores

export type CoreMembers = CoreFuncs & CoreHelpers & CoreRemotes & CoreStates & CoreStores
