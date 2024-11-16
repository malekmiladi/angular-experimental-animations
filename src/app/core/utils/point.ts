type Coordinates = { x?: number, y?: number };

export class Point {

    private _x: number;
    private _y: number;

    constructor({ x = 0, y = 0 }: Coordinates = {}) {
        this._x = x;
        this._y = y;
    }

    public set ({x = 0, y = 0}: Coordinates = {}) {
        this._x = x;
        this._y = y;
    }

    public get x() {
        return this._x;
    }

    public get y() {
        return this._y;
    }

    mul(a: number): Point {
        return new Point({x: this._x * a, y: this._y * a});
    }

    add(other: Point) {
        return new Point({x: this._x + other.x, y: this._y + other.y});
    }

    sub(other: Point) {
        return new Point({x: this._x - other.x, y: this._y - other.y});
    }

}