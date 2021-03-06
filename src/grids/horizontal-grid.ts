import {
  AllLabels,
  HorizontalGridType,
  InputAllLabels,
  HorizontalGridOptions
} from '../types/grids.types'
import { COLUMN_CHART, LINE_CHART } from '../types/chart-names'
import { BaseGrid } from './base-grid'
import { Label } from '../labels/label'
import { Line } from '../shapes/line'

export class HorizontalGrid extends BaseGrid implements HorizontalGridType {
  allowedCharts = [COLUMN_CHART, LINE_CHART]
  labels: AllLabels
  mainLabel: 'left' | 'right'
  secondaryLabel: 'top' | 'bottom'
  identifier = 'HorizontalGrid'

  constructor(
    canvas: HTMLCanvasElement,
    labels: InputAllLabels,
    { mainLabel, secondaryLabel, factor }: HorizontalGridOptions = {}
  ) {
    super(canvas, { factor })
    this.mainLabel = mainLabel || 'left'
    this.secondaryLabel = secondaryLabel || 'bottom'
    if (!this.validateLabels(labels)) {
      throw new Error('No corresponding labels to values')
    }
    this.labels = this.setLabels(labels)
  }

  validateLabels(labels: InputAllLabels) {
    let valid = false
    if (labels.left) {
      if (labels.left.identifier !== 'string') {
        valid = true
      }
    } else {
      this.mainLabel = 'right'
      if (labels.right && labels.right.identifier !== 'string') {
        valid = true
      }
    }
    return valid
  }

  drawGrid() {
    this.drawOuter()
    this.drawInnerGrid()
    this.drawBorder()
  }

  drawInnerGrid() {
    let len = ((<Label>this.labels[this.mainLabel]).values.length - 1) * 2
    let step = this.drawArea.height / len
    let current = 0
    for (let i = 0; i < len + 1; i++) {
      let label = (<Label>this.labels[this.mainLabel]).values[i / 2]
      let color = this.colors[
        label === '0' || label === '0%' || label === 0 ? 'primary' : 'secondary'
      ]
      new Line(
        this.ctx,
        [
          [0, current],
          [this.drawArea.width, current]
        ],
        { color }
      ).draw()
      current += step + 0.001
    }
  }
}
