import { RectInput } from '../types/shape.type'

export class Rect {
  color: string | CanvasGradient
  fill: boolean
  lineWidth: number

  constructor(
    private ctx: CanvasRenderingContext2D,
    private x: number,
    private y: number,
    private w: number,
    private h: number,
    { color, fill, lineWidth }: RectInput = {}
  ) {
    this.color = color || 'rgb(167,167,167)'
    this.fill = fill || true
    this.lineWidth = lineWidth || 2
  }

  draw() {
    const { ctx, x, y, w, h, lineWidth, color, fill } = this
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.stroke()
    if (fill) {
      ctx.fillStyle = color
      ctx.fill()
    }
  }
}
