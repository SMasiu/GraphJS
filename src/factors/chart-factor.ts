import { ChartFactorOptions } from '../types/factor.type'

class ChartFactor {
  lineWidth: number
  opacity: number
  itemSize: number
  dotBorder: boolean
  dotRadius: number
  constructor({ lineWidth, opacity, itemSize, dotBorder, dotRadius }: ChartFactorOptions = {}) {
    this.lineWidth = lineWidth || 1.5
    this.opacity = opacity || 0.75
    this.itemSize = itemSize || 30
    this.dotBorder = dotBorder === false ? false : true
    this.dotRadius = dotRadius || 3
  }
}

export const DEFAULT_CHART_FACTOR = new ChartFactor()

export default ChartFactor
