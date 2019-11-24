class Line {

    color: string;
    close: boolean;
    dashLine: number[];
    smooth: boolean;

    constructor(private ctx:CanvasRenderingContext2D, private values: number[][], {close, color, dashLine, smooth}: {close?: boolean, smooth?: boolean, color?: string, dashLine?: number[]} = {}) {
        this.close = close || false;
        this.color = color || 'rgb(167,167,167)';
        this.dashLine = dashLine || [0];
        this.smooth = smooth || false;
    }

    draw() {
        const {values, ctx} = this;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        let x = Math.round(values[0][0]);   
        let y = Math.round(values[0][1]);
        ctx.setLineDash(this.dashLine);
        ctx.moveTo(x, y);
        for(let i = 1; i < values.length; i++) {
            let x = Math.round(values[i][0]);   
            let y = Math.round(values[i][1]);
            if (this.smooth) {
                ctx.quadraticCurveTo(x - 15, y - 15, x, y)
            } else {
                ctx.lineTo(x, y);
            }
        }
        if(this.close) {
            ctx.closePath();
        }
        ctx.stroke()
        ctx.setLineDash([0]);
    }

}

export default Line;