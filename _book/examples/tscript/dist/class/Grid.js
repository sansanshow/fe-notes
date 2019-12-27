var Grid = /** @class */ (function () {
    function Grid(scale) {
        this.scale = scale;
    }
    Grid.prototype.calculateDistanceFromOrgin = function (ponit) {
        var xDis = ponit.x - Grid.origin.x;
        var yDis = ponit.y - Grid.origin.y;
        var dis = Math.sqrt(xDis * xDis + yDis * yDis) / this.scale;
        return dis;
    };
    Grid.origin = { x: 0, y: 0 };
    return Grid;
}());
var grid1 = new Grid(1);
var grid2 = new Grid(2);
console.log(grid1.calculateDistanceFromOrgin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrgin({ x: 10, y: 10 }));

