interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLen: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLen = 10;

// 一个接口可以继承多个 接口

interface PenStroke {
    penWidth: number;
}

interface Rectangle extends Shape, PenStroke {
    length: number;
    width: number;
}

let rect1 = <Rectangle>{};
rect1.color = 'red';
rect1.length = 9;
rect1.width = 3;

interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter() {
    let counter = <Counter>function(start: number) {
        this._start = start;
    }
    counter.interval = 2;
    counter.reset = function() {
        this._start = 0;
    }
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
console.log(c);


class Control {
    private state: string;
}

interface SelectableControl extends Control {
    select(): void;
}

class ButtonExt extends Control implements SelectableControl {
    select(): void {
        throw new Error("Method not implemented.");
    }

}

class TextBox extends Control {
    
}