class Line {

    color: string;
    close: boolean;

    constructor(private ctx:CanvasRenderingContext2D, private values: number[][], {close, color}: {close?: boolean, color?: string} = {}) {
        this.close = close || false;
        this.color = color || 'rgb(167,167,167)';
    }

    draw() {
        const {values, ctx} = this;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        let x = Math.round(values[0][0]);   
        let y = Math.round(values[0][1]);
        ctx.moveTo(x, y);
        for(let i = 1; i < values.length; i++) {
            let x = Math.round(values[i][0]);   
            let y = Math.round(values[i][1]);
            ctx.lineTo(x, y);
        }
        if(this.close) {
            ctx.closePath();
        }
        ctx.stroke();
    }

}

export default Line;