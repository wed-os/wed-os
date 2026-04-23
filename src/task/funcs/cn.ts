import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Kết hợp clsx và tailwind-merge vào một hàm.
 *
 * @public
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
}
