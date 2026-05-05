/**
 * Kiểm tra xem đối tượng có chứa key xác định hay không.
 *
 * @public
 */
export function hasKey<T extends object>(obj: T, key: PropertyKey): key is keyof T {
    return key in obj
}
