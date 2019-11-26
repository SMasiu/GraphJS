import Chart from "./chart";
import { PolygonCharType, MultipleValuesItem, PolygonChartInputType } from "../types/charts.types";
import CirclePoint from "../shapes/circle-point";
import Circle from "../shapes/circle";
import Line from "../shapes/line";
import { POLYGON_CHART } from "../types/chart-names";
import { createLineGradient } from "../functions/gradient";

class PolygonChart extends Chart implements PolygonCharType {

    content: MultipleValuesItem[];
    fill: boolean;
    dots: boolean;
    identifier = POLYGON_CHART;

    constructor({values, fill, dots, factor}: PolygonChartInputType = {}) {
        super(factor);
        this.content = values || [];
        this.fill = fill === false ? false : true;
        this.dots = dots || false;
    }

    createGradient(x: number, xE: number, colors: string[]) {
        return createLineGradient(<CanvasRenderingContext2D>this.ctx, x, xE, colors);
    }

    drawChart() {
        const {parent, ctx, lineWidth, opacity, dots, dotBorder, dotRadius, fill } = this;
        if(parent && ctx) {
            const {centerX, centerY, width} = parent.drawArea;
            for(let {values, color} of this.content) {
                let angle = Math.PI * 2 / values.length;
                let offset = 0 - Math.PI * .5;
                let points = [];
                for(let value of values) {
                    let radius = centerY * (value / 100)
                    let [x, y] = new CirclePoint(radius, offset, angle + offset, centerX, centerY).next();
                    points.push([x, y]);
                    offset += angle;
                }
                ctx.lineWidth = lineWidth;
                let col = this.getColor(color, 0, width)
                new Line(ctx, points, {color: col, close: true}).draw();
                ctx.globalAlpha = opacity;
                ctx.fillStyle = col;
                if(fill) {
                    ctx.fill();
                }
                if(dots) {
                    for(let [x, y] of points) {

                        if(dotBorder) {
                            ctx.lineWidth = dotRadius * 2 ;
                        }
                        new Circle(ctx, x, y, dotRadius, {color: dotBorder ? '#fff' : col}).draw();
                        ctx.globalAlpha = 1;
                        ctx.fill();
                    }
                }
            }
        }

    }

}

export default PolygonChart;