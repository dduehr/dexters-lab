export function init<T>(array: T[]): [T[], T | undefined] {
    return [array.slice(0, array.length - 1), array.slice(-1)[0]]
}

export function range(openBound: number): number[] {
    return [...Array(openBound).keys()];
}