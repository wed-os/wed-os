import { load } from 'js-yaml'

/**
 * Chuyển chuỗi YAML thành đối tượng.
 *
 * @param text Chuỗi YAML hợp lệ.
 */
export function parseYaml(text: string): unknown {
    return load(text)
}
