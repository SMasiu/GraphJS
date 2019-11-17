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
        if(this.ctx && this.parent) {
            const { centerX, centerY } = this.parent.drawArea;
            let originRadius = this.parent.drawArea.width / 2;
            let radius = originRadius;
            let margin = this.itemMargin + this.itemSize;
            
            for(let item of this.content) {
                let angle = 2 * Math.PI * (item.values / 100);
                new LinePiece(this.ctx, centerX, centerY, radius, {
                    opcaity: this.opacity,
                    angle,
                    color: item.color,
                    lineWidth: this.lineWidth,
                    size: this.itemSize
                }).draw();
                radius -= margin;
            }
            this.ctx.textBaseline = 'middle';
            if(this.centerValue) {
                this.parent.setFont('center');
                this.ctx.font = `35px ${this.parent.font.family}`;
                this.ctx.fillText(this.centerValue, centerX, centerY);
            }
            if(this.labels) {
            let labels = this.labels.values;
            let posY = centerY - originRadius;
            this.parent.setFont('right');
            for(let label of labels) {
                let posX = centerX - this.parent.labelPadding * 2;
                this.ctx.fillText(label.toString(), posX, posY);
                posY += this.itemSize + this.itemMargin;
            }
            }

        }
    }
}

export default SameDirectionRoundChart;