import Chart from "./chart";
import { RoundChartType, ValueColorType, RoundChartInputType } from "../types/charts.types";
import Circle from "./circle";
import CirclePoint from "./circle-point";
import { LabelType } from "../types/grids.types";
import Line from "./line";

class RoundChart extends Chart implements RoundChartType {
    
    content: ValueColorType[];
    centerValue: string | null;
    changingSize: boolean;
    blankCenter: boolean;
    itemsMargin: number;
    
    constructor({centerValue, values, changingSize, blankCenter, itemsMargin}: RoundChartInputType) {
        super();
        this.content = values || [];
        this.centerValue = centerValue ? centerValue.toString() : null;
        this.changingSize = changingSize || false;
        this.blankCenter = blankCenter || false;
        this.itemsMargin = itemsMargin || 0;
    }

    draw() {
        if(this.parent && this.ctx) {
            const {centerX, centerY} = this.parent.drawArea;
            const {ctx} = this;
            let offset = 0 - Math.PI / 2;
            let radius = centerX;
            let changingStep = radius / 2 / this.content.length;
            ctx.globalAlpha = this.opacity;
            let i = 0;
            for(let item of this.content) {
                ctx.lineWidth = this.lineWidth;
                let angle = 2 * Math.PI * (item.values / 100);
                //offset
                let offsetAngle = offset + angle / 2;
                let cPoint = new CirclePoint(this.itemsMargin + this.lineWidth - 1, offsetAngle, 0);
                let [x, y] = cPoint.next();
                ctx.translate(x, y);
                //values
                new Circle(ctx, centerX, centerY, radius, {
                    offset,
                    angle: angle + offset,
                    color: item.color,
                    noEnd: true
                }).draw();
                ctx.fillStyle = item.color;
                ctx.lineTo(centerX, centerY);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
                //labels
                let label = (<string[]>(<LabelType>this.parent.labels).values)[i];
                ctx.lineWidth = 1;
                let [x2, y2] = new CirclePoint(radius, offsetAngle, 0, centerX, centerY).next();
                let [x3, y3] = new CirclePoint(radius + this.parent.labelPadding * 7.5, offsetAngle, 0, centerX, centerY).next();
                let left = offsetAngle > Math.PI / 2;
                let x4 = x3 - 100 * (left ? 1 : -1);
                new Line(ctx, [[x2, y2], [x3, y3], [x4, y3]]).draw();
                this.parent.setFont(left ? 'left' : 'right');
                ctx.fillText(label, x4, y3 - 5);
                
                offset += angle;
                if(this.changingSize) {
                    radius -= changingStep;
                }
                ctx.translate(-x, -y);
                i++;
            }

            if(this.blankCenter) {
                ctx.globalAlpha = 1;
                new Circle(ctx, centerX, centerY, centerX / 2, {noEnd: true}).draw();
                ctx.fillStyle = '#fff';
                ctx.fill();
                
                if(this.centerValue) {
                    this.parent.setFont('center');
                    ctx.font = `35px ${this.parent.font.family}`;
                    ctx.textBaseline = 'middle';
                    ctx.fillText(this.centerValue, centerX, centerY);
                }
            }
        }
    }

}

export default RoundChart;