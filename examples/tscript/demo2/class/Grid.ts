class Grid {
  static origin = {x: 0, y: 0};
  calculateDistanceFromOrgin(ponit: {x: number, y: number}) {
    let xDis = ponit.x - Grid.origin.x;
    let yDis = ponit.y - Grid.origin.y;
    let dis = Math.sqrt(xDis * xDis + yDis * yDis) / this.scale;
    return dis;
  }
  constructor(public scale: number) {}
}

let grid1 = new Grid(1);
let grid2 = new Grid(2);
console.log(grid1.calculateDistanceFromOrgin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrgin({x: 10, y: 10}));