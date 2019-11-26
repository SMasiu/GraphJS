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
        let x = Math.abs(newMax) + Math.abs(newMin);
        let count = x / step;
        let i = 0;
        let last = step;
        while (count > 10 && i < 100) {
            step += 10;
            count = x / step;
            if(Math.abs(newMax) % step === 0 && Math.abs(newMin) % step === 0) {
                last = step;
            }
            i++;
        }
        console.log(last)
        this.step = last;
        step = last;

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
        this.values = this.toLabel();
        console.log(this)
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