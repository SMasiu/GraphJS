export const createLineGradient = (
  ctx: CanvasRenderingContext2D,
  x: number,
  xE: number,
  colors: string[]
) => {
  let grd = ctx.createLinearGradient(x, 0, x + xE, 0)
  let step = 1 / (colors.length - 1)
  let cStep = 0
  for (let c of colors) {
    grd.addColorStop(cStep, c)
    cStep += step
  }
  return grd
}

export const createLineGradientVert = (
  ctx: CanvasRenderingContext2D,
  x: number,
  xE: number,
  colors: string[]
) => {
  let grd = (<CanvasRenderingContext2D>ctx).createLinearGradient(0, x, 0, x + xE)
  let step = 1 / (colors.length - 1)
  let cStep = 0
  for (let c of colors) {
    grd.addColorStop(cStep, c)
    cStep += step
  }
  return grd
}
