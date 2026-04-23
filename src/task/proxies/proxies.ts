import type { InstallAppRemote, MaximizeRemote, MinimizeRemote, ReadFileRemote, RunTaskRemote, WriteFileRemote } from '@core/types/coreRemoteTypes'

/** @public */
export const installApp: InstallAppRemote = async (...args) => {
}

/** @public */
export const maximize: MaximizeRemote = async (...args) => {
}

/** @public */
export const minimize: MinimizeRemote = async (...args) => {
}

/**
 * Đọc dữ liệu file.
 *
 * @param path Đường dẫn hoặc {@linkcode Ent}
 * @param type Kiểu dữ liệu trả về.
 * @public
 */
export const readFile: ReadFileRemote = async (...args) => {
}

/** @public */
export const runTask: RunTaskRemote = async (...args) => {
}

/**
 * Ghi dữ liệu vào file.
 *
 * @param path Đường dẫn hoặc {@linkcode Ent}
 * @param data Dữ liệu cần ghi.
 * @returns Trả về một {@linkcode Ent}
 * @public
 */
export const writeFile: WriteFileRemote = async (...args) => {
}
