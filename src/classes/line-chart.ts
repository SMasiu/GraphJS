import Chart from "./chart";
import { LineChartInputType, LineValueType, LineChartType, ValueColorType } from "../types/charts.types";
import CoordinateSystem1dGrid from "./coordinate-system-1d-grid";
import Circle from "./circle";
import Line from "./line";

class LineChart extends Chart implements LineChartType {

    content: LineValueType[]
    min: number;
    max: number;
    width: number;
    x0position: number;
    radius: number;

    constructor({values}: LineChartInputType = {}) {
        super();
        this.content = values || [];
        this.max = 0;
        this.min = 0;
        this.width = 0;
        this.x0position = 0;
        this.radius = 3;
    }

    draw() {
        if(this.parent && this.ctx) {
            const { centerY, width } = this.parent.drawArea;
            const { x0position, labels } = <CoordinateSystem1dGrid>this.parent;
            this.min = labels.values[0];
            this.max = labels.values[labels.values.length - 1];
            this.width = width;
            this.x0position = x0position;
            let posY = -15;
            this.ctx.globalAlpha = this.opacity;
            for(let item of this.content) {

                let decrement = false;

                for(let value of item.values) {
                    if(typeof value === 'number') {
                        let posX = this.getPos(value);
                        new Circle(this.ctx, posX, centerY, this.radius, {color: item.color}).draw();
                        this.ctx.fillStyle = item.color;
                        this.ctx.fill();
                        decrement = false;
                    } else {
                        const [x1, x2] = value;
                        let x1I = Math.abs(x1) === Infinity;
                        let x2I = Math.abs(x2) === Infinity;
                        this.ctx.fillStyle = item.color;
                        if( !x1I && !x2I ) {
                            let posX1 = this.getPos(x1);
                            let posX2 = this.getPos(x2);

                            new Circle(this.ctx, posX1, centerY, this.radius, {color: item.color}).draw();
                            this.ctx.fill();

                            new Circle(this.ctx, posX2, centerY, this.radius, {color: item.color}).draw();
                            this.ctx.fill();

                            new Line(this.ctx, [
                                [posX1, centerY - this.radius],
                                [posX1, centerY + posY],
                                [posX2, centerY + posY],
                                [posX2, centerY - this.radius]],
                                {color: item.color}).draw();
                            } else {

                                let start = [0, centerY + posY]
                                let end = [width, centerY + posY]

                                if(x1I && x2I) {
                                    new Line(this.ctx, [
                                            start, 
                                            end
                                        ],
                                        {color: item.color}).draw();
                                }
                                
                                else if(x1I) {
                                    this.drawInfinity(x2, item.color, start, posY, centerY);
                                } else {
                                    this.drawInfinity(x1, item.color, end, posY, centerY, true);
                                }

                            }
                        decrement = true;
                    }
                }
                if(decrement) {
                    posY -= 15;
                }

            }

        }
    }

    drawInfinity(val: number, color: string, inf: number[], posY :number, centerY: number, rev: boolean = false) {
        if(this.ctx) {
            let posX = this.getPos(val);
            new Circle(this.ctx, posX, centerY, this.radius, {color: color}).draw();
            this.ctx.fill();
            let points = [
                inf, 
                [posX, centerY + posY], 
                [posX, centerY + this.radius]
            ];
            if(rev) {
                points.reverse();
            }
            new Line(this.ctx, points, {color: color}).draw();
        }
    }

    getPos(value: number) {
        const {x0position, width, max, min} = this;
        if(value === 0) {
            return x0position;
        }

        else if(value < 0) {
            let lWidth = x0position;
            let w = lWidth * (Math.abs(value) / Math.abs(min));
            return x0position - w;
        }

        else {
            let rWidth = width - x0position;
            let w = rWidth * (value / max);
            return w + x0position;
        }

    }

}

export default LineChart;