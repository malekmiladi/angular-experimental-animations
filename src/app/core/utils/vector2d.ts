import { Point } from "./point";

export class Vector2D {

    private _a: Point;
    private _b: Point;
    private _distance: number;

    constructor({ a = new Point(), b = new Point() }: { a: Point, b: Point }) {
        this._a = a;
        this._b = b;
        this._distance = Math.sqrt(Math.pow(this._a.x - this._b.x, 2) + Math.pow(this._a.y - this._b.y, 2));
    }

    public set ({ a = new Point(), b = new Point() }: { a: Point, b: Point }) {
        this._a = a;
        this._b = b;
    }

    public get a() : Point {
        return this._a;
    }

    public get b(): Point {
        return this._b;
    }

    public get distance(): number {
        return this._distance;
    }

    static normal() {
        return Math.sqrt(2);
    }

}