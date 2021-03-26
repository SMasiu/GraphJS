import { Label } from './label'

export class PercentLabel extends Label {
  values: string[]
  identifier: 'percent'

  constructor(private step: number, { reverse }: { reverse?: boolean } = {}) {
    super()
    this.identifier = 'percent'
    this.reverse = reverse || false
    this.values = this.toLabel()
  }

  toLabel(): string[] {
    const { step } = this
    let v: string[] = []
    if (100 % step !== 0) {
      throw new Error('Steps count is not type of Int')
    }
    for (let i = 0; i <= 100; i += step) {
      v.push(`${i}%`)
    }
    if (this.reverse) {
      v = v.reverse()
    }
    return v
  }
}
