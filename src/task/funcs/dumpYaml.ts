import { dump } from 'js-yaml'

/** @public */
export function dumpYaml(data: unknown): string {
    return dump(data)
}
