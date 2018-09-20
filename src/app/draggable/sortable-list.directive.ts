import { ContentChildren, Directive,QueryList,AfterContentInit ,Output, OnInit,EventEmitter} from '@angular/core';
import {SortableDirective} from './sortable.directive';
import { Subscription } from 'rxjs/internal/Subscription';

export interface SortEvent
{
  currentIndex:number;
  newIndex:number;
}

@Directive({
  selector: '[appSortableList]'
})
export class SortableListDirective  implements AfterContentInit  {

  @Output() sort=new EventEmitter<SortEvent>();
  private clientRects:ClientRect[];
  @ContentChildren(SortableDirective) sortables:QueryList<SortableDirective>;
  private subscriptions: Subscription[] = [];

  ngAfterContentInit(): void {
    this.sortables.changes.subscribe(() => {
      this.subscriptions.forEach(s => s.unsubscribe());
      this.sortables.forEach(sortable => {
        this.subscriptions.push(
          sortable.dragStart.subscribe(() => this.measureClientRects()),
          sortable.dragMove.subscribe(event => this.detectSorting(sortable, event)));
      });
    });

    this.sortables.notifyOnChanges();
  }

  private measureClientRects(){
    this.clientRects=this.sortables.map(sortable=>sortable.element.nativeElement.getBoundingClientRect());
  }
  private detectSorting(sortable:SortableDirective,event:PointerEvent){
    const currentIndex=this.sortables.toArray().indexOf(sortable);
    const prevRect=currentIndex>0?this.clientRects[currentIndex-1]:undefined;
    const nextRect=currentIndex<this.clientRects.length -1 ?this.clientRects[currentIndex+1] :undefined;

    if(prevRect && event.clientY<prevRect.top+prevRect.height/2){
     this.sort.emit({currentIndex:currentIndex,
      newIndex:currentIndex-1})
    }
    else if(nextRect && event.clientY>nextRect.top+nextRect.height/2){
      this.sort.emit({currentIndex:currentIndex,
        newIndex:currentIndex+1})
    }
  }
}
