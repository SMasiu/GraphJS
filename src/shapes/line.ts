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
        let [x, y] = values[0];
        ctx.setLineDash(this.dashLine);
        ctx.moveTo(Math.round(x), Math.round(y));
        if(this.smooth) {
            for(let i = 0; i < values.length - 1; i ++) {
                let [x1, y1] = values[i];
                let [x2, y2] = values[i+1];
                var x_mid = (x1 + x2) / 2;
                var y_mid = (y1 + y2) / 2;
                var cp_x1 = (x_mid + x1) / 2;
                var cp_x2 = (x_mid + x2) / 2;
                ctx.quadraticCurveTo(cp_x1,y1 ,x_mid, y_mid);
                ctx.quadraticCurveTo(cp_x2,y2 ,x2,y2);
            }
        } else {
            for(let i = 1; i < values.length; i++) {
                let [x, y] = values[i];
                x = Math.round(x);
                y = Math.round(y);
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