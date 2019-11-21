import Chart from "./chart";
import { PolygonCharType, MultipleValuesItem, PolygonChartInputType, MultipleValuesItemUpdate } from "../types/charts.types";
import CirclePoint from "../shapes/circle-point";
import Circle from "../shapes/circle";
import Line from "../shapes/line";

class PolygonChart extends Chart implements PolygonCharType {

    content: MultipleValuesItem[];
    fill: boolean;
    dots: boolean;

    constructor({values, fill, dots, factor}: PolygonChartInputType = {}) {
        super(factor);
        this.content = values || [];
        this.fill = fill === false ? false : true;
        this.dots = dots || false;
    }

    draw() {
        const {parent, ctx, lineWidth, opacity, dots, dotBorder, dotRadius, fill } = this;
        if(parent && ctx) {
            const {centerX, centerY} = parent.drawArea;
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
                new Line(ctx, points, {color, close: true}).draw();
                ctx.globalAlpha = opacity;
                ctx.fillStyle = color;
                if(fill) {
                    ctx.fill();
                }
                if(dots) {
                    for(let [x, y] of points) {

                        if(dotBorder) {
                            ctx.lineWidth = dotRadius * 2 ;
                        }
                        new Circle(ctx, x, y, dotRadius, {color: dotBorder ? '#fff' : color}).draw();
                        ctx.globalAlpha = 1;
                        ctx.fill();
                    }
                }
            }
        }

    }

}

export default PolygonChart;