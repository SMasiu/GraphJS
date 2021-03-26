import { DrawArea, NoGridType } from '../types/grids.types'
import { clearDrawArea } from '../types/draw-area'
import { StringLabel } from '../labels/string-label'
import { Grid } from './grid'
import { ROUND_CHART, SAME_DIRECTION_ROUND_CHART } from '../types/chart-names'

export class NoGrid extends Grid implements NoGridType {
  mainLabel = '0'
  allowedCharts = [ROUND_CHART, SAME_DIRECTION_ROUND_CHART]
  drawArea: DrawArea
  labels = null
  identifier = 'NoGrid'

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this.drawArea = clearDrawArea
  }

  drawGrid() {
    this.setUpDrawArea()
  }

  setUpDrawArea() {
    const { left, right, top, bottom } = this.margin
    let width = this.width - left - right
    let height = this.height - top - bottom
    this.drawArea = {
      width,
      height,
      centerX: width / 2,
      centerY: height / 2,
      startX: left,
      startY: top
    }
    this.ctx.translate(this.drawArea.startX, this.drawArea.startY)
  }

  setLabels(labels: StringLabel) {
    return null
  }
}
