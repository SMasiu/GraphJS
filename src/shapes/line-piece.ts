import { LinePieceOptions } from "../types/shape.type";

class LinePiece {

    color: string | CanvasGradient;
    lineWidth: number;
    opacity: number;
    offset: number;
    angle: number;
    size: number;

    constructor(private ctx: CanvasRenderingContext2D, private x: number , private y: number, private radius: number, options: LinePieceOptions = {}) {
        this.color = options.color || 'red';
        this.lineWidth = options.lineWidth || 20;
        this.opacity = options.opacity || .75;
        this.offset = options.offset || 0 - Math.PI / 2;
        this.angle = options.angle || Math.PI * 2;
        this.angle -= Math.PI * .5;
        this.size = options.size || 30;
    }

    draw() {
        const {ctx} = this;
        const {color, size, x, y, radius, offset, angle, lineWidth, opacity} = this;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.globalAlpha = 1;
        ctx.lineWidth = size;
        ctx.lineCap = 'round'
        ctx.beginPath();
        ctx.arc(x, y, radius, offset, angle);
        ctx.stroke();
        ctx.lineWidth = size - lineWidth * 2;
        ctx.strokeStyle = '#fff';
        ctx.beginPath();
        ctx.arc(x, y, radius, offset, angle);
        ctx.stroke();
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, offset, angle);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.lineWidth = 1;
    }

}

export default LinePiece;