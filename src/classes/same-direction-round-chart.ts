import Chart from "./chart";

class SameDirectionRoundChart extends Chart{
    content: any[];
    constructor() {
        super();
        this.content = []
    }

    draw() {
        console.log('draw')
    }
}

export default SameDirectionRoundChart;