import { Point } from "../../../core/utils/point";

export enum Shape {
    CIRCLE,
    RECTANGLE,
    TRIANGLE,
    HEXAGON,
    POLYGON
}

export type MouseState = {
    curr: Point;
    prev: Point;
    timestamp: {
        curr: number;
        prev: number;
    }
}

export type CatState = {
    pos: Point;
    shape: Shape;
    reactive: boolean;
    transform: string;
}

export type ElasticityVariables = {
    velocity: number;
    mouse: MouseState;
    cat: CatState;
}