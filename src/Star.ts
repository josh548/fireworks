export class Star {
    private readonly context: CanvasRenderingContext2D;
    public x: number;
    public y: number;
    public radius: number;

    public constructor(context: CanvasRenderingContext2D, x: number, y: number, radius: number) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    public draw(): void {
        this.context.beginPath();
        this.context.fillStyle = "white";
        this.context.shadowBlur = Math.round(this.radius * ((Math.random() * 2) + 1));
        this.context.shadowColor = this.context.fillStyle;
        this.context.arc(Math.floor(this.x), Math.floor(this.y), Math.floor(this.radius), 0,
                         Math.PI * 2);
        this.context.fill();
    }
}
