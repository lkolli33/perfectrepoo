import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
//import {Observable,Subject} from 'rxjs';

@Injectable()
export class DroppableService {
  dragStart$:Observable<PointerEvent>;
  dragEnd$:Observable<PointerEvent>;
  private dragStartSubject=new Subject<PointerEvent>();
  private dragEndSubject=new Subject<PointerEvent>();
  constructor() { 
    console.log("droppable service has been created");
    this.dragStart$=this.dragStartSubject.asObservable();
    this.dragEnd$=this.dragEndSubject.asObservable();
  }
  onDragStart(event:PointerEvent):void
  {
    this.dragStartSubject.next(event);
  }
  onDragEnd(event:PointerEvent):void
  {
    this.dragEndSubject.next(event);
  }
}
