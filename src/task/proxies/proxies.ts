import { invoke } from "@task/funcs/invoke"
import { os } from "@task/constants/os"
import type {
CreateDirAsyncRemote,
GetEntAsyncRemote,
HandshakeAsyncRemote,
InstallAppAsyncRemote,
MaximizeAsyncRemote,
MinimizeAsyncRemote,
ReadDirAsyncRemote,
ReadFileAsyncRemote,
RunTaskAsyncRemote,
WaitTaskReadyAsyncRemote,
WriteFileAsyncRemote
} from '@core/types/coreRemoteTypes'

/** @public */
export const createDir = async function(...args) {
return invoke(os, 'createDir', args)
} as CreateDirAsyncRemote

/** @public */
export const getEnt = async function(...args) {
return invoke(os, 'getEnt', args)
} as GetEntAsyncRemote


export const handshake = async function(...args) {
return invoke(os, 'handshake', args)
} as HandshakeAsyncRemote

/** @public */
export const installApp = async function(...args) {
return invoke(os, 'installApp', args)
} as InstallAppAsyncRemote

/** @public */
export const maximize = async function(...args) {
return invoke(os, 'maximize', args)
} as MaximizeAsyncRemote

/** @public */
export const minimize = async function(...args) {
return invoke(os, 'minimize', args)
} as MinimizeAsyncRemote

/** @public */
export const readDir = async function(...args) {
return invoke(os, 'readDir', args)
} as ReadDirAsyncRemote

/**
 * Đọc dữ liệu file.
 *
 * @param path Đường dẫn hoặc {@linkcode Ent}
 * @param type Kiểu dữ liệu trả về.
 * @public
 */
export const readFile = async function(...args) {
return invoke(os, 'readFile', args)
} as ReadFileAsyncRemote

/** @public */
export const runTask = async function(...args) {
return invoke(os, 'runTask', args)
} as RunTaskAsyncRemote

/** @public */
export const waitTaskReady = async function(...args) {
return invoke(os, 'waitTaskReady', args)
} as WaitTaskReadyAsyncRemote

/**
 * Ghi dữ liệu vào file.
 *
 * @param path Đường dẫn hoặc {@linkcode Ent}
 * @param data Dữ liệu cần ghi.
 * @returns Trả về một {@linkcode Ent}
 * @public
 */
export const writeFile = async function(...args) {
return invoke(os, 'writeFile', args)
} as WriteFileAsyncRemote
