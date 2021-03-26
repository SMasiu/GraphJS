import { Chart } from './chart'
import { RoundChartType, ValueColorType, RoundChartInputType } from '../types/charts.types'
import { Circle } from '../shapes/circle'
import { CirclePoint } from '../shapes/circle-point'
import { NoGrid } from '../grids/no-grid'
import { StringLabel } from '../labels/string-label'
import { Line } from '../shapes/line'
import { ROUND_CHART } from '../types/chart-names'
import { Grid } from '../grids/grid'

export class RoundChart extends Chart implements RoundChartType {
  content: ValueColorType[]
  centerValue: string | null
  changingSize: boolean
  blankCenter: boolean
  itemsMargin: number
  labels: StringLabel | null
  centerRadius: number
  changingStepSize: number
  identifier = ROUND_CHART

  createGradient(x: number, xE: number, colors: string[]) {
    const { ctx, parent } = this
    const { centerX, centerY } = (<Grid>parent).drawArea
    let grd = (<CanvasRenderingContext2D>ctx).createLinearGradient(x, xE, centerX, centerY)
    let step = 1 / (colors.length - 1)
    let cStep = 0
    for (let c of colors) {
      grd.addColorStop(cStep, c)
      cStep += step
    }
    return grd
  }
  constructor({
    centerValue,
    values,
    changingSize,
    blankCenter,
    itemsMargin,
    labels,
    canvas,
    changingStepSize,
    centerRadius,
    factor
  }: RoundChartInputType) {
    super(factor)
    if (canvas) {
      this.parent = new NoGrid(canvas)
      this.ctx = this.parent.ctx
      if (this.ctx) {
        this.ctx.translate(0.5, 0.5)
      }
    }
    if (labels) {
      this.labels = labels
    } else {
      this.labels = null
    }
    this.content = values || []
    this.centerValue = centerValue ? centerValue.toString() : null
    this.changingStepSize = changingStepSize || 3
    this.centerRadius = centerRadius || 0.75
    this.changingSize = changingSize || false
    this.blankCenter = blankCenter || false
    this.itemsMargin = itemsMargin || 0
  }

  drawChart() {
    const { parent, ctx, content, opacity, itemsMargin, lineWidth, centerValue } = this
    if (parent && ctx) {
      parent.margin = {
        left: 200,
        right: 200,
        top: 100,
        bottom: 100
      }
      parent.setUpDrawArea()
      const { centerX, centerY, width, height } = parent.drawArea
      let offset = 0 - Math.PI / 2
      let radius = Math.min(width, height) / 2
      let changingStep = radius / this.changingStepSize / content.length
      ctx.globalAlpha = opacity
      let i = 0
      for (let item of content) {
        ctx.lineWidth = lineWidth
        let angle = 2 * Math.PI * (item.values / 100)
        //offset
        let offsetAngle = offset + angle / 2
        let cPoint = new CirclePoint(itemsMargin + lineWidth - 1, offsetAngle, 0)
        let [x, y] = cPoint.next()
        ctx.translate(x, y)
        //values
        let [gX, gY] = new CirclePoint(radius, offsetAngle, 0, centerX, centerY).next()
        let color = this.getColor(item.color, gX, gY)
        new Circle(ctx, centerX, centerY, radius, {
          offset,
          angle: angle + offset,
          color,
          noEnd: true
        }).draw()
        ctx.fillStyle = color
        ctx.lineTo(centerX, centerY)
        ctx.closePath()
        ctx.stroke()
        ctx.fill()
        // labels
        if (this.labels) {
          let label = this.labels.values[i]
          ctx.lineWidth = 1
          let [x2, y2] = new CirclePoint(radius, offsetAngle, 0, centerX, centerY).next()
          let [x3, y3] = new CirclePoint(
            radius + parent.labelPadding * 7.5,
            offsetAngle,
            0,
            centerX,
            centerY
          ).next()
          let left = offsetAngle > Math.PI / 2
          let x4 = x3 - 100 * (left ? 1 : -1)
          new Line(ctx, [
            [x2, y2],
            [x3, y3],
            [x4, y3]
          ]).draw()
          parent.setFont(left ? 'left' : 'right')
          ctx.fillText(label, x4, y3 - 5)
        }
        offset += angle
        if (this.changingSize) {
          radius -= changingStep
        }
        ctx.translate(-x, -y)
        i++
      }

      if (this.blankCenter) {
        ctx.globalAlpha = 1
        new Circle(ctx, centerX, centerY, radius * this.centerRadius, { noEnd: true }).draw()
        ctx.fillStyle = '#fff'
        ctx.fill()

        if (centerValue) {
          parent.setFont('center')
          ctx.font = `35px ${parent.font.family}`
          ctx.textBaseline = 'middle'
          ctx.fillText(centerValue, centerX, centerY)
        }
      }
    }
  }
}
