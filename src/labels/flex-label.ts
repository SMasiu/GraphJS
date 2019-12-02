import ValueLabel from "./value-label";

class FlexLabel extends ValueLabel {

    constructor(start: number = 0, end: number = 100, step: number = 20) {
        super(start, end, step);
        this.flex = true;
    }

    nwd(a: number, b: number) {
        while(a != b)
            if(a>b)
                a-=b;
            else
                b-=a;
        return a;
    }

    resize(newMin: number, newMax: number) {
        
        let {max, min, step} = this;

        if(newMax > max) {
            while(newMax > max) {
                max += step;
            }
            this.setNew('start', max);
        } else if (newMax < max) {
            while(newMax < max - step) {
                max -= step;
            }
            this.setNew('start', max);
        }
        if (newMin < min) {
            while(newMin < min) {
                min -= step;
            }
            this.setNew('end', min);
        } else if (newMin > min) {
            while(newMin >= min + step) {
                min += step;
            }   
            this.setNew('end', min);
        }
        newMax = Math.ceil(newMax / 10) * 10;
        newMin = Math.floor(newMin / 10) * 10;
        let x = Math.abs(newMax) + Math.abs(newMin);
        let minStep = Math.round(x / 100) * 10;
        let lastStep = step;
        step = minStep;
        this.step = step;
        newMax += step - (newMax % step);
        newMin -= step + (newMin % step);
        if(newMax !== NaN && newMin === NaN) {
            if(this.start > this.end) {
                this.start = newMax;
                this.end = newMin;
            } else {
                this.start = newMin;
                this.end = newMax;
            }
        } else {
            this.step = lastStep;
        }
        this.values = this.toLabel();
    }

    setNew(to: string, value: number) {
        if(to === 'end') {
            if(this.start < this.end) {
                this.start = value;
            } else {
                this.end = value;
            }
        } else {
            if (this.start < this.end) {
                this.end = value;
            } else {
                this.start = value;
            }
        }
    }

}

export default FlexLabel;