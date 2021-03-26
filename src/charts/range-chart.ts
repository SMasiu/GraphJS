import Chart from './chart'
import { RangeChartType, RangeValueType, RangeChartInputType } from '../types/charts.types'
import CoordinateSystem1dGrid from '../grids/coordinate-system-1d-grid'
import Circle from '../shapes/circle'
import Line from '../shapes/line'
import { RANGE_CHART } from '../types/chart-names'
import { createLineGradient } from '../functions/gradient'

class RangeChart extends Chart implements RangeChartType {
  content: RangeValueType[]
  min = 0
  max = 0
  width = 0
  x0position = 0
  radius = 3
  reversedValues = false
  identifier = RANGE_CHART

  constructor({ values, factor }: RangeChartInputType = {}) {
    super(factor)
    this.content = values || []
  }
  createGradient(x: number, xE: number, colors: string[]) {
    return createLineGradient(<CanvasRenderingContext2D>this.ctx, x, xE, colors)
  }

  drawChart() {
    if (this.parent && this.ctx) {
      this.ctx.translate(0.5, 0.5)
      const { centerY, width } = this.parent.drawArea
      const { x0position, labels } = <CoordinateSystem1dGrid>this.parent
      this.reversedValues = labels.reversedValues
      this.min = labels.values[0]
      this.max = labels.values[labels.values.length - 1]
      this.width = width
      this.x0position = x0position
      let posY = -25
      let posYUnder = 25
      const { radius, ctx, lineWidth } = this
      for (let item of this.content) {
        let decrement = false
        let y = item.under ? posYUnder : posY
        for (let value of item.values) {
          if (typeof value === 'number') {
            let posX = this.getPos(value)
            ctx.lineWidth = radius + 2
            new Circle(ctx, posX, centerY, radius, { color: '#fff' }).draw()
            let color = this.getColor(item.color, posX - radius, radius * 2)
            ctx.fillStyle = color
            ctx.fill()
            decrement = false
          } else {
            const [x1, x2] = this.reversedValues ? value.reverse() : value
            let x1I = Math.abs(x1) === Infinity
            let x2I = Math.abs(x2) === Infinity
            if (!x1I && !x2I) {
              let posX1 = this.getPos(x1)
              let posX2 = this.getPos(x2)
              let color = this.getColor(item.color, posX1, posX2)

              this.ctx.fillStyle = color
              ctx.lineWidth = radius + 2
              new Circle(ctx, posX1, centerY, radius, { color: '#fff' }).draw()
              ctx.fill()

              new Circle(ctx, posX2, centerY, radius, { color: '#fff' }).draw()
              ctx.fill()

              ctx.lineWidth = lineWidth
              new Line(
                ctx,
                [
                  [posX1, centerY - radius],
                  [posX1, centerY + y],
                  [posX2, centerY + y],
                  [posX2, centerY - radius]
                ],
                { color }
              ).draw()
            } else {
              let start = [0, centerY + y]
              let end = [width, centerY + y]
              if (x1I && x2I) {
                let color = this.getColor(item.color, start[0], end[0])
                ctx.lineWidth = lineWidth
                new Line(ctx, [start, end], { color }).draw()
              } else if (x1I) {
                let color = this.getColor(item.color, x2, width - x2)
                this.drawInfinity(x2, color, start, y, centerY)
              } else {
                let color = this.getColor(item.color, x1, width - x1)
                this.drawInfinity(x1, color, end, y, centerY, true)
              }
            }
            decrement = true
          }
        }
        if (decrement) {
          if (item.under) {
            posYUnder += 15
          } else {
            posY -= 15
          }
        }
      }
      ctx.translate(-0.5, -0.5)
    }
  }

  drawInfinity(
    val: number,
    color: string | CanvasGradient,
    inf: number[],
    posY: number,
    centerY: number,
    rev: boolean = false
  ) {
    const { ctx, radius, lineWidth } = this
    if (ctx) {
      let posX = this.getPos(val)
      let points = [inf, [posX, centerY + posY], [posX, centerY + radius]]
      if (rev) {
        points.reverse()
      }
      ctx.lineWidth = lineWidth
      new Line(ctx, points, { color }).draw()
      ctx.lineWidth = radius + 2
      ctx.fillStyle = color
      new Circle(ctx, posX, centerY, radius, { color: '#fff' }).draw()
      ctx.fill()
    }
  }

  getPos(value: number) {
    const { x0position, width, max, min } = this
    if (value === 0) {
      return x0position
    } else if (value < 0 && !this.reversedValues) {
      let lWidth = x0position
      let w = lWidth * (Math.abs(value) / Math.abs(min))
      return x0position - w
    } else {
      let rWidth = width - x0position
      let w = rWidth * (value / max)
      return w + x0position
    }
  }

  setSize() {
    let arr: number[] = (<any>[...this.content].map((i) => i.values)).flat(2)
    let min = 0,
      max = 0
    arr.forEach((v) => {
      if (v > max && v !== Infinity) {
        max = v
      } else if (v < min && v !== Infinity) {
        min = v
      }
    })
    this.maxValue = max
    this.minValue = min
  }
}

export default RangeChart
