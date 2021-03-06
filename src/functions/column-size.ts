export const getColumnSize = (content: any[]) => {
  let arr: any = [...content]
  let max = 0,
    min = 0
  arr = arr
    .map((it: any) => {
      if (it.type !== 'stacked-group') {
        return it.values
      } else {
        let v = 0
        it.values.forEach((val: number) => {
          v += val
        })
        return v * (it.direction === 'reverse' ? -1 : 1)
      }
    })
    .flat()
  arr.forEach((v: number) => {
    if (v > max) {
      max = v
    } else if (v < min) {
      min = v
    }
  })
  return { min, max }
}
