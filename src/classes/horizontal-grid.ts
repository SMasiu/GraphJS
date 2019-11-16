import BaseGrid from "./base-grid";
import { AllLabels, AnyLabelType, HorizontalGridType } from "../types/grids.types";
import { COLUMN_CHART, OPOSITE_COLUMN_CHART, LINE_CHART } from "../types/chart-names";
import Line from "./line";
import { InputAllLabels } from "../types/input-labels.type";

class HorizontalGrid extends BaseGrid implements HorizontalGridType {

    allowedCharts: string[];
    labels: AllLabels;
    mainLabel: 'left' | 'right';
    secondaryLabel: 'top' | 'bottom';
    identifier: string;
    constructor(canvas: HTMLCanvasElement, labels: InputAllLabels, {mainLabel, secondaryLabel}: {mainLabel?: 'left' | 'right', secondaryLabel?: 'bottom' | 'top'} = {}) {
        super(canvas);
        this.identifier = 'HorizontalGrid';
        this.allowedCharts = [COLUMN_CHART, OPOSITE_COLUMN_CHART, LINE_CHART];
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
        let len = ((<AnyLabelType>this.labels[this.mainLabel]).values.length - 1) * 2;
        let step = this.drawArea.height / len;
        let curent = 0;
        for(let i = 0; i < len + 1; i++) {
            new Line(this.ctx, [[0, curent],[this.drawArea.width, curent]], {color: this.colors.secondary}).draw();
            curent += step;
        }

    }

}

export default HorizontalGrid;