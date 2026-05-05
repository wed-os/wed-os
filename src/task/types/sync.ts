export type SyncOp = [value: unknown, isDelete?: boolean]
export type SyncOps = Map<string | string[], SyncOp>
