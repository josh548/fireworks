import { calculateDistance, Point } from "./Point";
import { Star } from "./Star";

import {
    GROUND_COLOR,
    GROUND_HEIGHT,
    SKY_GRADIENT_END_COLOR,
    SKY_GRADIENT_START_COLOR,
    STAR_COLOR,
    STAR_COUNT,
    STAR_MAX_SIZE,
    STARS_MIN_DISTANCE_BETWEEN,
} from "./constants";

function clamp(x: number, min: number, max: number): number {
    return Math.min(Math.max(x, min), max);
}

export class Background {
    private readonly context: CanvasRenderingContext2D;
    private readonly skyGradient: CanvasGradient;
    private readonly stars: Star[] = [];

    public constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.skyGradient = this.context.createLinearGradient(0, 0, 0, this.context.canvas.height);
        this.skyGradient.addColorStop(0, SKY_GRADIENT_START_COLOR);
        this.skyGradient.addColorStop(1, SKY_GRADIENT_END_COLOR);
        this.createStars();
    }

    private generateRandomPointsForStars(): Point[] {
        const points: Point[] = [];
        while (points.length < STAR_COUNT) {
            const randomX: number = Math.floor(Math.random() * this.context.canvas.width);
            const randomY: number =
                Math.floor(Math.random() * (this.context.canvas.height - GROUND_HEIGHT));
            const randomPoint: Point = new Point(
                clamp(randomX, 20, this.context.canvas.width - 20),
                clamp(randomY, 20, this.context.canvas.height - GROUND_HEIGHT - 20),
            );
            let usePoint: boolean = true;
            for (const existingPoint of points) {
                if (calculateDistance(existingPoint, randomPoint) < STARS_MIN_DISTANCE_BETWEEN) {
                    usePoint = false;
                    break;
                }
            }
            if (usePoint) {
                points.push(randomPoint);
            }
        }

        return points;
    }

    private createStars(): void {
        const randomPoints: Point[] = this.generateRandomPointsForStars();
        for (const point of randomPoints) {
            const radius: number = Math.ceil(Math.random() * STAR_MAX_SIZE);
            this.stars.push(new Star(this.context, point.x, point.y, radius));
        }
    }

    public draw(): void {
        this.context.fillStyle = this.skyGradient;
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        this.context.fillStyle = STAR_COLOR;
        for (const star of this.stars) {
            star.draw();
        }

        this.context.fillStyle = GROUND_COLOR;
        this.context.shadowBlur = 0;
        this.context.fillRect(0, this.context.canvas.height - GROUND_HEIGHT + 1,
                              this.context.canvas.width, GROUND_HEIGHT);
    }
}
