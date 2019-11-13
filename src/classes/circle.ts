interface CircleOptions {
    offset?: number;
    angle?: number;
    color?: string;
}

class Circle {

    offset: number;
    angle: number;
    color: string;

    constructor(
        private ctx:CanvasRenderingContext2D, 
        private x: number,
        private y: number,
        private radius: number,
        {offset, angle, color}: CircleOptions = {}) {
        this.offset = offset || 0;
        this.angle = angle || Math.PI * 2;
        this.color = color || 'rgb(167,167,167)';
    }

    draw() {
        const {ctx} = this;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.offset, this.angle);
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }

}
export default Circle;