class Line {

    constructor(private ctx:CanvasRenderingContext2D, private values: number[][]) {
    }

    draw() {
        const {values, ctx} = this;
        let start = values[0];
        ctx.beginPath();
        let x = Math.round(values[0][0]);   
        let y = Math.round(values[0][1]);
        ctx.moveTo(x, y);
        for(let i = 1; i < values.length; i++) {
            let x = Math.round(values[i][0]);   
            let y = Math.round(values[i][1]);
            ctx.lineTo(x, y);
        }
        ctx.stroke();
    }

}

export default Line;