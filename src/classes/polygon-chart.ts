import Chart from "./chart";
import { PolygonCharType, MultipleValuesItem, PolygonChartInputType, MultipleValuesItemUpdate } from "../types/charts.types";
import CirclePoint from "./circle-point";
import Circle from "./circle";
import Line from "./line";

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
        if(this.parent && this.ctx) {
            const {centerX, centerY} = this.parent.drawArea;
            const {ctx} = this;
            for(let item of this.content) {
                let angle = Math.PI * 2 / item.values.length;
                let offset = 0 - Math.PI * .5;
                let points = [];
                for(let value of item.values) {
                    let radius = centerY * (value / 100)
                    let [x, y] = new CirclePoint(radius, offset, angle + offset, centerX, centerY).next();
                    points.push([x, y]);
                    offset += angle;
                }
                ctx.lineWidth = this.lineWidth;
                new Line(this.ctx, points, {color: item.color, close: true}).draw();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = item.color;
                if(this.fill) {
                    ctx.fill();
                }
                if(this.dots) {
                    for(let [x, y] of points) {

                        if(this.dotBorder) {
                            ctx.lineWidth = this.dotRadius * 2 ;
                        }
                        new Circle(ctx, x, y, this.dotRadius, {color: this.dotBorder ? '#fff' : item.color}).draw();
                        ctx.globalAlpha = 1;
                        ctx.fill();
                    }
                }
            }
        }

    }

}

export default PolygonChart;