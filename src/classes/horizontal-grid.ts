import BaseGrid from "./base-grid";
import { AllLabels, AnyLabel } from "../types/grids.types";
import { COLUMN_CHART, OPOSITE_COLUMN_CHART, LINE_CHART } from "../types/chart-names";
import Line from "./line";

class HorizontalGrid extends BaseGrid {

    allowedCharts: string[];
    labels: AllLabels;
    mainLabel: 'left' | 'right';
    constructor(canvas: HTMLCanvasElement, labels: AllLabels, {mainLabel}: {mainLabel: 'left' | 'right'} = {mainLabel: 'left'}) {
        super(canvas);
        this.allowedCharts = [COLUMN_CHART, OPOSITE_COLUMN_CHART, LINE_CHART];
        this.mainLabel = mainLabel;
        //validate labels
        let valid = false
        if(labels.left) {
            if(labels.left.type !== 'string') {
                valid = true;
            }
        } else {
            this.mainLabel = 'right';
            if(labels.right && labels.right.type !== 'string') {
                valid = true;
            }
        }
        if(!valid) {
            throw new Error('No coresponding labels to values');
        }

        this.labels = labels;
        
    }

    draw() {
        this.drawOuter();
        this.drawInnerGrid();
    }

    drawInnerGrid() {
        let len = ((<AnyLabel>this.labels[this.mainLabel]).values.length - 1) * 2;
        let step = this.drawArea.height / len;
        let curent = step;
        this.ctx.strokeStyle = this.colors.secondary;
        for(let i = 0; i < len - 1; i++) {
            new Line(this.ctx, [[0, curent],[this.drawArea.width, curent]]).draw();
            curent += step;
        }

    }

}

export default HorizontalGrid;