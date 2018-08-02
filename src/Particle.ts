import {
    PARTICLE_FRICTION,
    PARTICLE_GRAVITY,
    PARTICLE_PATH_LENGTH,
} from "./constants";

type Point = [number, number];

export class Particle {
    private readonly context: CanvasRenderingContext2D;
    public currentFrame: number = 0;
    public cx: number;
    public cy: number;
    public radius: number;
    public vx: number;
    public vy: number;
    private path: Point[] = [];
    private readonly hue: number;
    public readonly lifeSpan: number;

    public constructor(context: CanvasRenderingContext2D, initialX: number, initialY: number,
                       radius: number, initialVelocity: number, angle: number, hue: number,
                       lifeSpan: number) {
        this.context = context;
        this.cx = initialX;
        this.cy = initialY;
        this.radius = radius;
        this.vx = initialVelocity * Math.cos(angle);
        this.vy = -initialVelocity * Math.sin(angle);
        this.hue = hue;
        this.lifeSpan = lifeSpan;
    }

    public update(): void {
        this.currentFrame++;
        if (this.currentFrame > 1) {
            this.vy += PARTICLE_GRAVITY;
            this.vx *= PARTICLE_FRICTION;
            this.vy *= PARTICLE_FRICTION;
            this.cx += this.vx;
            this.cy += this.vy;
        }
    }

    public draw(): void {
        this.path.unshift([this.cx, this.cy]);
        if (this.path.length > PARTICLE_PATH_LENGTH) {
            this.path.pop();
        }

        const baseAlpha: number = (this.lifeSpan - this.currentFrame) / this.lifeSpan;

        // Draw a glow for the first point
        this.context.beginPath();
        this.context.fillStyle = `hsla(${this.hue}, 100%, 70%, ${baseAlpha * 0.05}`;
        this.context.arc(Math.floor(this.cx), Math.floor(this.cy), Math.floor(this.radius * 10), 0,
                         Math.PI * 2);
        this.context.fill();

        // Draw all of the points
        for (let i: number = 0; i < this.path.length; i++) {
            const [x, y]: [number, number] = this.path[i];
            this.context.beginPath();
            const alpha: number = ((this.path.length - i) / this.path.length) * baseAlpha;
            this.context.fillStyle = `hsla(${this.hue}, 100%, 70%, ${alpha}`;
            this.context.arc(Math.floor(x), Math.floor(y), Math.floor(this.radius), 0, Math.PI * 2);
            this.context.fill();
        }
    }
}
