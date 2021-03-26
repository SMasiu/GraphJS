export interface ChartFactorOptions {
  lineWidth?: number
  opacity?: number
  itemSize?: number
  dotBorder?: boolean
  dotRadius?: number
}

export interface GridFactorOptions {
  colors?: ColorsInput
  font?: FontsInput
  background?: BackgroundInput
  labelPadding?: number
}

export interface ColorsInput {
  primary?: string
  secondary?: string
}

export interface FontsInput {
  color?: string
  size?: number
  family?: string
}

export interface BackgroundInput {
  image?: string
  color?: string
  opacity?: number
}
