class CirclePoint {
  offset: number
  x: number
  y: number
  constructor(
    private radius: number,
    start: number,
    private angle: number,
    private offsetX: number = 0,
    private offsetY: number = 0
  ) {
    this.offset = start
    this.x = 0
    this.y = 0
  }

  next() {
    let angle = this.offset
    this.x = Math.round(this.radius * Math.cos(angle)) + this.offsetX
    this.y = Math.round(this.radius * Math.sin(angle)) + this.offsetY
    this.offset += this.angle
    return [this.x, this.y]
  }
}

export default CirclePoint
