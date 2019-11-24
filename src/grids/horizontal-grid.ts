import { AllLabels, HorizontalGridType, InputAllLabels } from "../types/grids.types";
import { COLUMN_CHART, OPOSITE_COLUMN_CHART, LINE_CHART } from "../types/chart-names";
import GridFactor from "../factors/grid-factor";
import BaseGrid from "./base-grid";
import Label from "../labels/label";
import Line from "../shapes/line";
import FlexLabel from "../labels/flex-label";

interface HorizontalGridOptions {
    mainLabel?: 'left' | 'right';
    secondaryLabel?: 'bottom' | 'top';
    factor?: GridFactor;
}

class HorizontalGrid extends BaseGrid implements HorizontalGridType {

    allowedCharts: string[];
    labels: AllLabels;
    mainLabel: 'left' | 'right';
    secondaryLabel: 'top' | 'bottom';
    identifier: string;
    constructor(canvas: HTMLCanvasElement, labels: InputAllLabels, {mainLabel, secondaryLabel, factor}: HorizontalGridOptions = {}) {
        super(canvas, {factor});
        this.identifier = 'HorizontalGrid';
        this.allowedCharts = [COLUMN_CHART, LINE_CHART];
        this.mainLabel = mainLabel || 'left';
        this.secondaryLabel = secondaryLabel || 'bottom';
        //validate labels
        if(!this.validateLabels(labels)) {
            throw new Error('No coresponding labels to values');
        }   
        this.labels = this.setLabels(labels);
    }

    validateLabels(labels: InputAllLabels) {
        let valid = false;
        if(labels.left) {
            if(labels.left.identifier !== 'string') {
                valid = true;
            }
        } else {
            this.mainLabel = 'right';
            if(labels.right && labels.right.identifier !== 'string') {
                valid = true;
            }
        }
        return valid;
    }

    drawGrid() {
        this.drawOuter();
        this.drawInnerGrid();
        this.drawBorder();
    }

    drawInnerGrid() {
        let len = ((<Label>this.labels[this.mainLabel]).values.length - 1) * 2;
        let step = this.drawArea.height / len;
        let curent = 0;
        for(let i = 0; i < len + 1; i++) {
            let label = (<Label>this.labels[this.mainLabel]).values[i / 2];
            let color = this.colors[label === '0' || label === '0%' || label === 0 ? 'primary' : 'secondary'];
            new Line(this.ctx, [[0, curent],[this.drawArea.width, curent]], {color}).draw();
            curent += step + .001;
        }

    }

}

export default HorizontalGrid;