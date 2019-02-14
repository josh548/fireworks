import {
    PARTICLE_FRICTION,
    PARTICLE_GRAVITY,
    PARTICLE_PATH_LENGTH,
} from "./constants";
import { getRandomValueBetween } from "./utils";

type Point = [number, number];

export class Particle {
    private readonly context: CanvasRenderingContext2D;
    public currentFrame: number = 0;
    public x: number;
    public y: number;
    public radius: number;
    private vx: number;
    private vy: number;
    private path: Point[] = [];
    private readonly hue: number;
    public readonly lifeSpan: number;

    public constructor(context: CanvasRenderingContext2D, initialX: number, initialY: number,
                       radius: number, initialVelocity: number, angle: number, hue: number,
                       lifeSpan: number) {
        this.context = context;
        this.x = initialX;
        this.y = initialY;
        this.radius = radius;
        this.vx = initialVelocity * Math.cos(angle);
        this.vy = -initialVelocity * Math.sin(angle);
        this.hue = hue;
        this.lifeSpan = lifeSpan;
        for (let i: number = 0; i < PARTICLE_PATH_LENGTH; i++) {
            this.path.unshift([this.x, this.y]);
        }
    }

    public update(): void {
        this.currentFrame++;
        if (this.currentFrame > 1) {
            this.path.unshift([this.x, this.y]);
            this.path.pop();
            this.vy += PARTICLE_GRAVITY;
            this.vx *= PARTICLE_FRICTION;
            this.vy *= PARTICLE_FRICTION;
            this.x += this.vx;
            this.y += this.vy;
        }
    }

    public draw(): void {
        this.context.beginPath();
        const glowAlpha: number = ((this.lifeSpan - this.currentFrame) / this.lifeSpan) * 0.05;
        this.context.fillStyle = `hsla(${this.hue}, 100%, 70%, ${glowAlpha})`;
        this.context.arc(Math.floor(this.x), Math.floor(this.y), this.radius * 5, 0, Math.PI * 2);
        this.context.fill();

        const randomIndex: number = Math.round(getRandomValueBetween(0, PARTICLE_PATH_LENGTH - 1));
        const randomPoint: [number, number] = this.path[randomIndex];
        this.context.beginPath();
        this.context.moveTo(Math.round(randomPoint[0]), Math.round(randomPoint[1]));
        this.context.lineTo(Math.round(this.x), Math.round(this.y));
        this.context.closePath();
        this.context.strokeStyle = `hsla(${this.hue}, 100%, 70%, ${glowAlpha * 20})`;
        this.context.stroke();
    }
}
