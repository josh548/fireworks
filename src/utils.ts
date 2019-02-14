export function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
}

export function clamp(x: number, min: number, max: number): number {
    return Math.min(Math.max(x, min), max);
}

export function getRandomValueBetween(min: number, max: number): number {
    return (Math.random() * (max - min)) + min;
}
