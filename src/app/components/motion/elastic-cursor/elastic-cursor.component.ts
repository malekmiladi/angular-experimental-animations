
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Point } from '../../../core/utils/math/point';
import { Vector2D } from '../../../core/utils/math/vector2d';
import { AnimationConstants } from '../../../core/animation-constants';
import { CatState, ElasticityVariables, MouseState, Shape } from './types';
import { MouseTrackingService } from '../../../core/services/mouse/mouse-tracking.service';
import { MousePosition } from '../../../core/types/types';

@Component({
    selector: 'app-elastic-cursor',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './elastic-cursor.component.html',
    styleUrl: './elastic-cursor.component.css'
})
export class ElasticCursorComponent implements OnInit {

    state: ElasticityVariables;

    constructor(private mouseTrackingService: MouseTrackingService) {
        const mouse: MouseState = {
            curr: new Point({ x: 1, y: 1 }),
            prev: new Point(),
            timestamp: {
                curr: 0,
                prev: -1
            }
        }

        const cat: CatState = {
            pos: new Point(),
            shape: Shape.CIRCLE,
            reactive: true,
            transform: ""
        }

        this.state = {
            velocity: 0,
            mouse: mouse,
            cat: cat
        }

        this.tick();
    }

    ngOnInit(): void {
        this.mouseTrackingService.mousePosition$.subscribe((mousePosition: MousePosition) => {
            this.state.mouse.curr.set({x: mousePosition.x, y: mousePosition.y});
            this.state.mouse.timestamp.curr = mousePosition.updatedOn;
        });
    }

    /* @HostListener("window:mousemove", ['$event.clientX, $event.clientY'])
    handleMouseMove(x: number, y: number) {
        this.state.mouse.curr.set({ x: x, y: y });
        this.state.mouse.timestamp.curr = Date.now();
    } */

    tick = () => {

        let translate: string = "";
        let scale: string = "";
        let rotate: string = "";

        this.state.cat.pos.set({
            x: this.state.cat.pos.x + (this.state.mouse.curr.x - this.state.cat.pos.x) * AnimationConstants.arbitrary.speed,
            y: this.state.cat.pos.y + (this.state.mouse.curr.y - this.state.cat.pos.y) * AnimationConstants.arbitrary.speed
        })

        translate = `translate(${this.state.cat.pos.x}px, ${this.state.cat.pos.y}px)`;

        if (this.state.cat.reactive) {
            const mouseVect = new Vector2D({ a: this.state.mouse.prev, b: this.state.mouse.curr });
            const deltaT = this.state.mouse.timestamp.curr - this.state.mouse.timestamp.prev;

            const dx = mouseVect.distance;
            const dt = deltaT === 0 ? 1 : deltaT;

            this.state.velocity = dx / dt;

            const scaleBy = (this.state.velocity / 12) * AnimationConstants.arbitrary.minScale;
            scale = `scale(${1 + scaleBy}, ${1 - Math.min(scaleBy, 1)})`;

            const adjacent = this.state.mouse.curr.x - this.state.cat.pos.x;
            const opposite = this.state.mouse.curr.y - this.state.cat.pos.y;

            const theta = Math.atan2(opposite, adjacent);
            rotate = `rotate(${theta}rad)`;
        }

        this.state.cat.transform = `${translate} ${rotate} ${scale}`;
        this.state.mouse.prev = new Point({ x: this.state.mouse.curr.x, y: this.state.mouse.curr.y });
        this.state.mouse.timestamp.prev = this.state.mouse.timestamp.curr;

        requestAnimationFrame(this.tick);
    }
}
