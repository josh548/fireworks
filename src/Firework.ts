import { FIREWORK_RADIUS, FIREWORK_SPEED } from "./constants";

function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
}

export class Firework {
    private readonly context: CanvasRenderingContext2D;
    private readonly startX: number;
    private readonly startY: number;
    public readonly endX: number;
    public readonly endY: number;
    public readonly distanceToTravel: number;
    public distanceTraveled: number;
    public x: number;
    public y: number;
    private readonly angle: number;
    private readonly speed: number;

    public constructor(context: CanvasRenderingContext2D, startX: number, startY: number,
                       endX: number, endY: number) {
        this.context = context;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.distanceToTravel = calculateDistance(this.startX, this.startY, this.endX, this.endY);
        this.distanceTraveled = 0;
        this.x = this.startX;
        this.y = this.startY;
        this.angle = Math.atan2(this.endY - this.startY, this.endX - this.startX);
        this.speed = FIREWORK_SPEED;
    }

    public update(): void {
        const vx: number = Math.cos(this.angle) * this.speed;
        const vy: number = Math.sin(this.angle) * this.speed;
        this.x += vx;
        this.y += vy;
        this.distanceTraveled = calculateDistance(this.startX, this.startY, this.x, this.y);
    }

    public draw(): void {
        this.context.beginPath();
        this.context.arc(this.x, this.y, FIREWORK_RADIUS, 0, Math.PI * 2);
        this.context.fillStyle = "white";
        this.context.fill();
    }
}
