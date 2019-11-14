import Chart from "./chart";
import { SameDirectionRoundChartInputType, SameDirectionRoundChartType, ValueColorType } from "../types/charts.types";
import LinePiece from "./line-piece";
import Line from "./line";

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
            const { width, height, centerX, centerY } = this.parent.drawArea;
            let radius = centerX;
            let margin = this.parent.labelPadding + this.itemSize;
            
            for(let item of this.content) {
                let angle = Math.PI * (item.value / 100);
                new LinePiece(this.ctx, centerX, centerY, radius, {
                    opcaity: this.opacity,
                    angle,
                    color: item.color,
                    lineWidth: this.lineWidth,
                    size: this.itemSize
                }).draw();
                radius -= margin;
            }
            if(this.centerValue) {
                this.parent.setFont('center');
                this.ctx.font = `${radius / 3}px ${this.parent.font.family}`;
                this.ctx.fillText(this.centerValue, centerX, centerY + this.parent.font.size + 10);
            }

        }
    }
}

export default SameDirectionRoundChart;