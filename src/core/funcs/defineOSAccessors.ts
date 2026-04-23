import { os, Store } from '@task/constants/os'
import { Task } from '@task/constants/task'

/**
 * Đổi các thuộc tính xác định trong os thành getter/setter.
 *
 * Khi chạy task os WedOS, ta có os.name là tên hđh, chạy một task nữa, vd FileManager, ta
 * có task.name là tên task đó, đồng bộ task.name từ core sang os.name phía task. Bây giờ
 * muốn lấy tên hđh thì phải thêm osName như alias làm getter/setter trỏ đến os.name, để
 * không bị trùng tên với name.
 */
export function defineOSAccessors() {
    const accessors: Partial<Record<keyof Store, keyof Task>> = {
        osName: 'name'
    }

    for (const [prop, alias] of Object.entries(accessors)) {
        Object.defineProperty(os, prop, {
            enumerable: true,
            get: () => os[alias],
            set: (val: never) => (os[alias] = val)
        })
    }
}
