import Chart from "./chart";
import { RangeChartType, RangeValueType, RangeChartInputType } from "../types/charts.types";
import CoordinateSystem1dGrid from "./coordinate-system-1d-grid";
import Circle from "./circle";
import Line from "./line";

class RangeChart extends Chart implements RangeChartType {

    content: RangeValueType[]
    min: number;
    max: number;
    width: number;
    x0position: number;
    radius: number;

    constructor({values}: RangeChartInputType = {}) {
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
            this.ctx.translate(.5,.5);
            const { centerY, width } = this.parent.drawArea;
            const { x0position, labels } = <CoordinateSystem1dGrid>this.parent;
            this.min = labels.values[0];
            this.max = labels.values[labels.values.length - 1];
            this.width = width;
            this.x0position = x0position;
            let posY = -15;
            const {radius, ctx, lineWidth} = this;
            for(let item of this.content) {

                let decrement = false;

                
                for(let value of item.values) {
                    if(typeof value === 'number') {
                        let posX = this.getPos(value);
                        ctx.lineWidth = radius + 2;
                        new Circle(ctx, posX, centerY, radius, {color: '#fff'}).draw();
                        ctx.fillStyle = item.color;
                        ctx.fill();
                        decrement = false;
                    } else {
                        const [x1, x2] = value;
                        let x1I = Math.abs(x1) === Infinity;
                        let x2I = Math.abs(x2) === Infinity;
                        this.ctx.fillStyle = item.color;
                        if( !x1I && !x2I ) {
                            let posX1 = this.getPos(x1);
                            let posX2 = this.getPos(x2);

                            ctx.lineWidth = radius + 2;
                            new Circle(ctx, posX1, centerY, radius, {color: '#fff'}).draw();
                            ctx.fill();

                            new Circle(ctx, posX2, centerY, radius, {color: '#fff'}).draw();
                            ctx.fill();

                            ctx.lineWidth = lineWidth;
                            new Line(ctx, [
                                [posX1, centerY - radius],
                                [posX1, centerY + posY],
                                [posX2, centerY + posY],
                                [posX2, centerY - radius]],
                                {color: item.color}).draw();
                            } else {

                                let start = [0, centerY + posY]
                                let end = [width, centerY + posY]

                                if(x1I && x2I) {

                                    ctx.lineWidth = lineWidth;
                                    new Line(ctx, [
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
            ctx.translate(-.5,-.5);
        }
    }

    drawInfinity(val: number, color: string, inf: number[], posY :number, centerY: number, rev: boolean = false) {
        const {ctx, radius, lineWidth} = this;
        if(ctx) {
            let posX = this.getPos(val);
            let points = [
                inf, 
                [posX, centerY + posY], 
                [posX, centerY + radius]
            ];
            if(rev) {
                points.reverse();
            }
            ctx.lineWidth = lineWidth;
            new Line(ctx, points, {color: color}).draw();
            ctx.lineWidth = radius + 2;
            new Circle(ctx, posX, centerY, radius, {color: '#fff'}).draw();
            ctx.fill();
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

export default RangeChart;