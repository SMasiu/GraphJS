# GraphJS
# Documentation is not fully redy yet

* [About](#about)
* [Installation](#installation)
* [Example](#example)
* [Documentation](#documentation)
* [Links](#)

<h1 id="about">About</h1>

GraphJS is javascript library to create flexible graphs. It uses pure javascript to draw charts on canvas.

<h1 id="installation">Installation</h1>

```bash
npm install web-graphs
```

<h1 id="example">Example</h1>

**Code**

```HTML
<canvas width="1400" height="700"></canvas>
```

```typescript
const canvas = document.querySelector('canvas');

let grid = new CoordinateSystem2dGrid(canvas, {
    x: new ValueLabel(-100, 100, 50),
    y: new FlexLabel(100, 0, 20)
});

grid.addCharts({
    line: new LineChart({
        fill: true,
        dots: true,
        smooth: true,
        values: [{
            color: ['#005B80', '#00B6FF'],
            values: [25, 70, 65, 50, 30]
        }, {
            color: ['#FF00AA', '#800055'],
            values: [[-30, -60, -40, -70], [-16 , -10, -40], [-70, -65, -65, -100, -90], [-70, -75, -85], -70]
        }]
    })
});
grid.draw();
}
```

**Output**

![Example](https://github.com/SMasiu/GraphJS/blob/master/img/example.png?raw=true)

<h1 id="documentation">Documentation</h1>


* [Labels](#)
* [Grids](#)
* [Charts](#)
* [Factors](#)

## Labels

### **String label**
It will create named ranges.

* **values** - array of names
* **reverse** - reverses direction of label

**Code**
```typescript
StringLabel(values: string[], {reverse?: boolean} = {});

let label = new StringLabel(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
let label = new StringLabel(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], {reverse: true});
```

**Output**

![StringLabel](https://github.com/SMasiu/GraphJS/blob/master/img/string-label.png?raw=true)

### **Value label**
It is using to determinate points how the charts should be draw.

* **start** - first number of label
* **end** - last number of label
* **step** - step to next number
* **reverse** - reverses direction of label

**Code**
```typescript
ValueLabel(start: number, end: number, step: number, {reverse?: boolean} = {});

let label1 = new ValueLabel(-100, 100, 50);
let label2 = new ValueLabel(100, -100, 25);
let label3 = new ValueLabel(100, -80, 20, {reverse: true});
```

**Output**

![ValueLabel](https://github.com/SMasiu/GraphJS/blob/master/img/value-label.png?raw=true)

### **Flex label**
It is same thing as ValueLabel but it will automativly change its start, end and step according to charts values.

* **start** - first number of label
* **end** - last number of label
* **step** - step to next number

**Code**
```typescript
FlexLabel(start: number = 0, end: number = 100, step: number = 20);

let label1 = new FlexLabel();
let label2 = new FlexLabel(-100, 100, 50);
let label3 = new FlexLabel(100, -100, 25);
```

**Output**

![FlexLabel](https://github.com/SMasiu/GraphJS/blob/master/img/value-label.png?raw=true)

### **Percent label**
It is using to determinate points how the charts should be draw. It takes values from 0 to 100.

* **step** - step to next number
* **reverse** - reverses direction of label

**Code**
```typescript
PercentLabel(step: number, {reverse?: boolean} = {});

let label = new PercentLabel(20);
let label = new PercentLabel(20, {reverse: true});
```

**Output**

![PercentLabel](https://github.com/SMasiu/GraphJS/blob/master/img/percent-label.png?raw=true)
## Grids

### HorizontalGrid

[Click here to jump Grid methods](#)
It creates 2d plane with values/string labels.

* **canvas** - html canvas element
* **top right bottom left** - direction labels
* **mainLabel** - Grid will be draw by this label. Moreover all charts will be coresponding to this label. Default 'left'. It can not be StringLabel
* **secondaryLabel** - By this label charts will be signed. It must be StringLabel
* **factor** - [more about facotrs]()

**Code**
```typescript
HorizontalGrid(canvas: HTMLCanvasElement, {
    top?: Label,
    right?: Label,
    bottom?: Label,
    left?: Label
}, {
    mainLabel?: 'left' | 'right',
    secondaryLabel?: 'bottom' | 'top',
    factor?: GridFactor
} = {});

let grid1 = new HorizontalGrid(canvas, {
    top: new StringLabel(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], {reverse: true}),
    left: new PercentLabel(25),
    bottom: new StringLabel(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
    right: new FlexLabel()
});

let grid2 = new HorizontalGrid(canvas, {
    left: new ValueLabel(100,0, 20),
    bottom: new StringLabel(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
});
```

**Output**

![HorizontalGrid](https://github.com/SMasiu/GraphJS/blob/master/img/horizontal-grid1.png?raw=true)
![HorizontalGrid](https://github.com/SMasiu/GraphJS/blob/master/img/horizontal-grid2.png?raw=true)

### VerticalGrid

[Click here to jump Grid methods](#)
It creates 2d plane with string/values labels.

* **canvas** - html canvas element
* **top right bottom left** - direction labels
* **mainLabel** - Grid will be draw by this label. Moreover all charts will be coresponding to this label. Default 'bottom'. It can not be StringLabel
* **secondaryLabel** - By this label charts will be signed. It must be StringLabel
* **factor** - [more about facotrs]()

**Code**

```typescript
VerticalGrid(canvas: HTMLCanvasElement, {
    top?: Label,
    right?: Label,
    bottom?: Label,
    left?: Label
}, {
    mainLabel?: 'top' | 'bottom',
    secondaryLabel?: 'left' | 'right',
    factor?: GridFactor
} = {});

let grid = new VerticalGrid(canvas, {
    top: new ValueLabel(0, 100, 20),
    right: new ValueLabel(100, 0, 25),
    bottom: new ValueLabel(-100, 100, 20),
    left: new StringLabel(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
});

let grid = new VerticalGrid(canvas, {
    bottom: new ValueLabel(0, 100, 20),
    left: new StringLabel(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
});
```

**Output**

![VerticalGrid](https://github.com/SMasiu/GraphJS/blob/master/img/vertical-grid1.png?raw=true)
![VerticalGrid](https://github.com/SMasiu/GraphJS/blob/master/img/vertical-grid2.png?raw=true)

### CoordinateSystem2dGrid

[Click here to jump Grid methods](#)
It creates 2d plane with x and y coordinates.

* **canvas** - html canvas element
* **x y** - direction labels
* **factor** - [more about facotrs]()

**Code**

```typescript
CoordinateSystem2dGrid(canvas: HTMLCanvasElement, {
    x: ValueLabel | FlexLabel,
    y: ValueLabel | FlexLabel
}, {factor: GridFactor});

let grid = new CoordinateSystem2dGrid(canvas, {
    x: new ValueLabel(-100, 100 , 20),
    y: new ValueLabel(100, -50, 25)
});
```

**Output**

![CoordinateSystem2dGrid](https://github.com/SMasiu/GraphJS/blob/master/img/CoordinateSystem2d-grid.png?raw=true)

### CoordinateSystem1dGrid

[Click here to jump Grid methods](#)
It creates One-Dimensional Coordinate System.

* **canvas** - html canvas element
* **label** - direction label
* **factor** - [more about facotrs]()

**Code**

```typescript
CoordinateSystem1dGrid(canvas: HTMLCanvasElement, label: ValueLabel | FlexLabel, { factor: GridFactor });

let grid = new CoordinateSystem1dGrid(canvas, new ValueLabel(-100, 100, 20));
```

**Output**

![CoordinateSystem1dGrid](https://github.com/SMasiu/GraphJS/blob/master/img/CoordinateSystem1d-grid.png?raw=true)

### PolygonGrid

[Click here to jump Grid methods](#)
It creates polygon grid with any number of vertices.

* **canvas** - html canvas element
* **label** - names of vertices
* **factor** - [more about facotrs]()

**Code**

```typescript
PolygonGrid(canvas: HTMLCanvasElement, label: StringLabel, { factor: GridFactor });

let grid = new PolygonGrid(
    canvas,
    new StringLabel(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
);
```

**Output**

![PolygonGrid](https://github.com/SMasiu/GraphJS/blob/master/img/polygon-grid.png?raw=true)

### NoGrid

It creates empty grid. Is used for charts that don't need grid.

* **canvas** - html canvas element

**Code**

```typescript
NoGrid(canvas: HTMLCanvasElement);

let grid = new NoGrid(canvas);
```

## Charts

### LineChart

It creates lines on your grid.

* **values** - Each object in array is single line. 
    **Item object:**
    1. **color** - If you pass string it take its value as color. If you pass string array it will create gradient from this colors.
    2. **values** - If you pass number array the values will be pointing to the begining of the range. If you pass nested array it will be pointing to values between the range. You can see it in chart5.
    3. **id** - By this id you will be able to manage you item.
    4. **name** - It is the title of your item. It will allow you automaticly create label from your chart.
* **dashLine** - It takes array of number. It wors same as dash line in canvas.
* **smooth** - It somooths your line naturally.
* **dots** - It creates dots on the vertex.
* **fill** - It fills your line to the 0 point.
* **correspondTo** - By this you can choose to witch label it will be corresponding to.
* **factor** - [more about facotrs]()


**Example 1**

**Code**

```typescript
LineChart({
    values?: [{
        color: string | string[]
        values: [number | number[]]
        id?: string | number,
        name?: string
    }],
    dashLine?: number[],
    smooth?: boolean,
    dots?: boolean,
    fill?: boolean,
    correspondTo?: string,
    factor?: ChartFactor
});

let chart1 = new LineChart({
    values: [{
        color: '#FF2212',
        values: [170,190,185,195,200,180,190,170]
    }]
});

let chart2 = new LineChart({
    dashLine: [10, 5],
    values: [{
        color: '#C229AD',
        values: [150,180,145,185,170,150,170,150]
    }]
});

let chart3 = new LineChart({
    smooth: true,
    values: [{
        color: '#59BF0B',
        values: [120,150,115,155,150,130,160,130]
    }]
});

let chart4 = new LineChart({
    dots: true,
    values: [{
        color: '#3D48EB',
        values: [110,120,95,125,130,110,120,100]
    }]
});

let chart5 = new LineChart({
    dots: true,
    values: [{
        color: '#007785',
        values: [[90,75,70],[80,90,80,70],[85, 60],80,[70, 60],[70, 80, 70, 60],[60, 70, 50, 80, 50, 40], 60]
    }]
});

let chart6 = new LineChart({
    fill: true,
    values: [{
        color: '#E8786D',
        values: [40,60,25,65,30,50,40,10]
    }]
});

let chart7 = new LineChart({
    fill: true,
    values: [{
        color: ['#C21585', '#E62802'],
        values: [-40,-50,-45,-35,-20,-40,-10,-20]
    }]
});
```

**Output**

![LineChart](https://github.com/SMasiu/GraphJS/blob/master/img/line-chart1.png?raw=true)

**Example 2**

You can also create many charts in one LineChart. They will have same properties like smooth, dots, fill and dashLine.

**Code**
```typescript
let chart = new LineChart({
    smooth: true,
    dots: true,
    values: [{
        color: '#FF2212',
        values: [70,90,85,95,100,80,90,70]
    },{
        color: '#3164C2',
        values: [40,50,35,50,50,30,70,40]
    },{
        color: ['#44C219', '#138000'],
        values: [20,-40,-85,-95,-40,-20,30,50]
    },{
        color: '#B30EC2',
        values: [-70,-40,-35,-5,10,-20,-40,-70]
    }]
})
```

**Output**

![LineChart](https://github.com/SMasiu/GraphJS/blob/master/img/line-chart2.png?raw=true)

### ColumnChart

**Code**

**Output**

### RowChart

### BubleChart

### RangeChart

### PolygonChart

### RoundChart

### SameDirectionRoundChart