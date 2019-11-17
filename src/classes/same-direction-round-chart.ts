import Chart from "./chart";
import { SameDirectionRoundChartInputType, SameDirectionRoundChartType, ValueColorType, ValueColorUpdateType } from "../types/charts.types";
import LinePiece from "./line-piece";
import { StringLabelType } from "../types/grids.types";
import NoGrid from "./no-grid";

class SameDirectionRoundChart extends Chart implements SameDirectionRoundChartType {
    content: ValueColorType[];
    centerValue: string | null;
    labels: StringLabelType | null;
    itemMargin: number;
    constructor({labels, values, centerValue, canvas, itemMargin}: SameDirectionRoundChartInputType = {}) {
        super();
        if(canvas) {
            this.parent = new NoGrid(canvas);
            this.ctx = this.parent.ctx;
            this.parent.setUpDrawArea();
            this.ctx.translate(.5, .5);
        }
        this.itemMargin = itemMargin === 0 || itemMargin ? itemMargin : 10;
        this.content = values || [];
        this.centerValue = centerValue ? centerValue.toString() : null;
        if(labels) {
            this.labels = {
                type: labels.identifier,
                values: labels.values
            }
        } else {
            this.labels = null
        }
    }
    
    draw() {
        const {ctx, parent, itemSize, opacity, itemMargin, lineWidth, centerValue} = this;
        if(ctx && parent) {
            const { centerX, centerY } = parent.drawArea;
            let originRadius = parent.drawArea.width / 2;
            let radius = originRadius;
            let margin = itemMargin + itemSize;
            
            for(let item of this.content) {
                let angle = 2 * Math.PI * (item.values / 100);
                new LinePiece(ctx, centerX, centerY, radius, {
                    opacity,
                    angle,
                    color: item.color,
                    lineWidth,
                    size: itemSize
                }).draw();
                radius -= margin;
            }
            ctx.textBaseline = 'middle';
            if(centerValue) {
                parent.setFont('center');
                ctx.font = `35px ${parent.font.family}`;
                ctx.fillText(centerValue, centerX, centerY);
            }
            if(this.labels) {
            let labels = this.labels.values;
            let posY = centerY - originRadius;
            parent.setFont('right');
            for(let label of labels) {
                let posX = centerX - parent.labelPadding * 2;
                ctx.fillText(label.toString(), posX, posY);
                posY += itemSize + itemMargin;
            }
            }

        }
    }
}

export default SameDirectionRoundChart;