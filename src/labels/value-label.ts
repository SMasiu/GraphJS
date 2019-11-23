import Label from "./label";

class ValueLabel extends Label {

    values: number[];
    identifier: 'value' = 'value';

    constructor(private start: number, private end: number, public step: number, {reverse}: {reverse?: boolean} = {}) {
        super();
        this.reverse = reverse || false;
        this.values = this.toLabel();
    }

    toLabel(): number[]{
        const {start, end, step} = this;
        let v: number[] = [];
        if((end - start) % step !== 0) {
            throw new Error('Steps count is not type of Int');
        }
        if((start > 0 && end > 0) || (start < 0 && end < 0)) {
            throw new Error('Invalid range');
        }
        if(start < end) {
            this.min = start;
            this.max = end;
            for(let i = start; i <= end; i += step) {
                if(i < 0) {
                    this.underZero++;
                }
                v.push(i);
            }
        } else {
            this.min = end;
            this.max = start;
            this.reversedValues = true;
            for(let i = start; i >= end; i -= step) {
                if(i < 0) {
                    this.underZero++;
                }
                v.push(i);
            }
        }
        if(this.reverse) {
            v = v.reverse();
        }
        return v;
    }

}

export default ValueLabel;