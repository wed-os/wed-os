import { PartialApp } from '@task/types/App'

export type Obj<T = unknown> = Record<string, T>

export type CreateState<T> = (app?: PartialApp) => T
