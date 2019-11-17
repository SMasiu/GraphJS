import Chart from "./chart";
import { RoundChartType, ValueColorType, RoundChartInputType } from "../types/charts.types";
import Circle from "./circle";
import CirclePoint from "./circle-point";
import { StringLabelType } from "../types/grids.types";
import Line from "./line";
import NoGrid from "./no-grid";

class RoundChart extends Chart implements RoundChartType {
    
    content: ValueColorType[];
    centerValue: string | null;
    changingSize: boolean;
    blankCenter: boolean;
    itemsMargin: number;
    labels: StringLabelType | null;

    constructor({centerValue, values, changingSize, blankCenter, itemsMargin, labels, canvas}: RoundChartInputType) {
        super();
        if(canvas) {
            this.parent = new NoGrid(canvas);
            this.ctx = this.parent.ctx;
            this.ctx.translate(.5, .5);
        }
        if(labels)  {
            this.labels = {
                values: labels.values,
                type: labels.identifier
            }
        } else {
            this.labels = null;
        }
        this.content = values || [];
        this.centerValue = centerValue ? centerValue.toString() : null;
        this.changingSize = changingSize || false;
        this.blankCenter = blankCenter || false;
        this.itemsMargin = itemsMargin || 0;
    }

    draw() {
        const {parent, ctx, content, opacity ,itemsMargin, lineWidth, centerValue} = this;
        if(parent && ctx) {
            parent.margin = {
                left: 200,
                right: 200,
                top: 50,
                bottom: 50
            }
            parent.setUpDrawArea();
            const {centerX, centerY} = parent.drawArea;
            let offset = 0 - Math.PI / 2;
            let radius = centerX;
            let changingStep = radius / 2 / content.length;
            ctx.globalAlpha = opacity;
            let i = 0;
            for(let item of content) {
                ctx.lineWidth = lineWidth;
                let angle = 2 * Math.PI * (item.values / 100);
                //offset
                let offsetAngle = offset + angle / 2;
                let cPoint = new CirclePoint(itemsMargin + lineWidth - 1, offsetAngle, 0);
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
                // labels
                if(this.labels) {
                    let label = this.labels.values[i];
                    ctx.lineWidth = 1;
                    let [x2, y2] = new CirclePoint(radius, offsetAngle, 0, centerX, centerY).next();
                    let [x3, y3] = new CirclePoint(radius + parent.labelPadding * 7.5, offsetAngle, 0, centerX, centerY).next();
                    let left = offsetAngle > Math.PI / 2;
                    let x4 = x3 - 100 * (left ? 1 : -1);
                    new Line(ctx, [[x2, y2], [x3, y3], [x4, y3]]).draw();
                    parent.setFont(left ? 'left' : 'right');
                    ctx.fillText(label, x4, y3 - 5);
                }
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
                
                if(centerValue) {
                    parent.setFont('center');
                    ctx.font = `35px ${parent.font.family}`;
                    ctx.textBaseline = 'middle';
                    ctx.fillText(centerValue, centerX, centerY);
                }
            }
        }
    }

}

export default RoundChart;