import Chart from "./chart";
import { SameDirectionRoundChartInputType, SameDirectionRoundChartType, ValueColorType } from "../types/charts.types";
import LinePiece from "./line-piece";
import { LabelType } from "../types/grids.types";

class SameDirectionRoundChart extends Chart implements SameDirectionRoundChartType {
    content: ValueColorType[];
    centerValue: string | null;
    constructor({values, centerValue}: SameDirectionRoundChartInputType = {}) {
        super();
        this.content = values || [];
        this.centerValue = centerValue ? centerValue.toString() : null;
    }

    draw() {
        if(this.ctx && this.parent) {
            const { centerX, centerY } = this.parent.drawArea;
            let originRadius = centerX;
            let radius = originRadius;
            let margin = this.parent.labelPadding + this.itemSize;
            
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

            let labels = (<LabelType>this.parent.labels).values;
            let posY = centerY - originRadius;
            this.parent.setFont('right');
            for(let label of labels) {
                let posX = centerX - this.parent.labelPadding * 2;
                this.ctx.fillText(label.toString(), posX, posY);
                posY += this.itemSize + this.parent.labelPadding;
            }

        }
    }
}

export default SameDirectionRoundChart;