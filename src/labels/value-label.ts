import { Label } from './label'

export class ValueLabel extends Label {
  values: number[]
  identifier: 'value' = 'value'

  constructor(
    public start: number,
    public end: number,
    public step: number,
    { reverse }: { reverse?: boolean } = {}
  ) {
    super()
    this.reverse = reverse || false
    this.values = this.toLabel()
  }

  toLabel(): number[] {
    const { start, end, step } = this
    let v: number[] = []
    if ((end - start) % step !== 0) {
      throw new Error('Steps count is not type of Int')
    }
    if ((start > 0 && end > 0) || (start < 0 && end < 0)) {
      throw new Error('Invalid range')
    }
    this.underZero = 0
    if (start < end) {
      this.min = start
      this.max = end
      for (let i = start; i <= end; i += step) {
        if (i < 0) {
          this.underZero++
        }
        v.push(i)
      }
    } else {
      this.min = end
      this.max = start
      this.reversedValues = true
      for (let i = start; i >= end; i -= step) {
        if (i < 0) {
          this.underZero++
        }
        v.push(i)
      }
    }

    let index = v.findIndex((x) => x === 0)
    if (index === -1) {
      throw new Error('Grid should contain 0')
    }

    if (this.reverse) {
      v = v.reverse()
    }
    return v
  }
}
