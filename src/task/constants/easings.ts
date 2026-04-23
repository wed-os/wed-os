export function easeInQuart(x: number): number {
    return x ** 4
}

export function easeOutQuart(x: number): number {
    return 1 - (1 - x) ** 4
}

export function easeInQuint(x: number): number {
    return x ** 5
}

export function easeOutQuint(x: number): number {
    return 1 - (1 - x) ** 5
}
