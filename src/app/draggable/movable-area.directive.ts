import { Directive,ContentChildren,QueryList,AfterContentInit,ElementRef } from '@angular/core';
import {MovableDirective} from './movable.directive';

interface Boundaries
{
  minX:number;
  minY:number;
  maxX:number;
  maxY:number;
}

@Directive({
  selector: '[appMovableArea]'
})
export class MovableAreaDirective implements AfterContentInit {

  @ContentChildren(MovableDirective) movables:QueryList<MovableDirective>;

  private boundaries:Boundaries;

  constructor(private element:ElementRef){ }

  ngAfterContentInit(){
  this.movables.forEach(movable=>{
    movable.dragStart.subscribe(()=>this.measureBoundaries(movable));
    movable.dragMove.subscribe(()=>this.maintainBoundaries(movable));
  });
  }

  private measureBoundaries(movable:MovableDirective)
  { 
    const viewRect:ClientRect=this.element.nativeElement.getBoundingClientRect();
    const movableClientRect:ClientRect=movable.element.nativeElement.getBoundingClientRect();
    this.boundaries={
      minX:viewRect.left-movableClientRect.left+movable.position.x,//to compensate the position movable.position.x is added
      maxX:viewRect.right-movableClientRect.right+movable.position.x,
      minY:viewRect.top-movableClientRect.top+movable.position.y,
      maxY:viewRect.bottom-movableClientRect.bottom+movable.position.y
    }
    
    }
  private maintainBoundaries(movable:MovableDirective)
  {
   // movable.position.x=movable.position.x<this.boundaries.minX?this.boundaries.minX:movable.position.x
   //if moving postion crosses the main area fix the position to the main area
    movable.position.x=Math.max(this.boundaries.minX,movable.position.x);
    movable.position.x=Math.min(this.boundaries.maxX,movable.position.x);
    movable.position.y=Math.max(this.boundaries.minY,movable.position.y);
    movable.position.y=Math.min(this.boundaries.maxY,movable.position.y);
  }

}
