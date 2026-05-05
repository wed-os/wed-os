import { load } from 'js-yaml'

/**
 * Chuyển văn bản YAML thành đối tượng.
 *
 * @param yaml Văn bản YAML hợp lệ.
 * @public
 */
export function parseYaml(yaml: string): unknown {
    return load(yaml)
}
