export function toInt(value?: string, otherwise: number = 0): number {
    const parsedInt = Number.parseInt(value || otherwise.toString());
    return Number.isNaN(parsedInt)? otherwise : parsedInt;
} 