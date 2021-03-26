export interface CircleOptions {
  offset?: number
  angle?: number
  color?: string | CanvasGradient
  noEnd?: boolean
}

export interface LinePieceOptions {
  color?: string | CanvasGradient
  lineWidth?: number
  opacity?: number
  offset?: number
  angle?: number
  size?: number
  angleRadius?: number
}

export interface RectInput {
  color?: string | CanvasGradient
  fill?: boolean
  lineWidth?: number
}
