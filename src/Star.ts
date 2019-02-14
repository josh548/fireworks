import { STAR_COLOR } from "./constants";

export class Star {
    private readonly context: CanvasRenderingContext2D;
    public readonly x: number;
    public readonly y: number;
    public readonly radius: number;

    public constructor(context: CanvasRenderingContext2D, x: number, y: number, radius: number) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    public draw(): void {
        this.context.beginPath();
        this.context.fillStyle = STAR_COLOR;
        this.context.shadowBlur = Math.ceil(this.radius * ((Math.random() * 2)));
        this.context.shadowColor = this.context.fillStyle;
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.context.fill();
    }
}
