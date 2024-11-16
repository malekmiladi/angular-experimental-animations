import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { MousePosition } from '../../types/types';

@Injectable({
    providedIn: 'root',
})
export class MouseTrackingService implements OnDestroy {
    private mousePositionSubject = new BehaviorSubject<MousePosition>({
        x: 0,
        y: 0,
        updatedOn: 0,
    });

    mousePosition$: Observable<MousePosition> = this.mousePositionSubject.asObservable();
    private mouseMoveSubscription: Subscription;

    constructor() {
        this.mouseMoveSubscription = fromEvent(window, "mousemove").subscribe(
            (event) => {
                this.mousePositionSubject.next({
                    x: (event as PointerEvent).clientX,
                    y: (event as PointerEvent).clientY,
                    updatedOn: Date.now()
                });
            }
        );
    }

    ngOnDestroy() {
        // Clean up when the service is destroyed (unlikely in a singleton, but a good practice)
        this.mouseMoveSubscription.unsubscribe();
    }
}
