import { Directive  ,Input,OnInit,HostListener,HostBinding,ElementRef} from '@angular/core';
import {DraggableDirective} from './draggable.directive';
import {DomSanitizer,SafeStyle} from '@angular/platform-browser';

interface IPosition{
  x:number;
  y:number;
}
@Directive({
  selector: '[appMovable]'
})
export class MovableDirective extends DraggableDirective {

  @HostBinding('style.transform')  get transform():SafeStyle{
    return  this.sanitizer.bypassSecurityTrustStyle(`translateX(${this.position.x}px) translateY(${this.position.y}px)`);
  };
  @HostBinding('class.movable') movable=true;
   position={x:0,y:0};
  private startPostion:IPosition;
  @Input() appMovableReset
   reset=false;

constructor(private sanitizer:DomSanitizer,public element:ElementRef){
  super(element);
}

@HostListener('dragStart',['$event']) 
onDragStart(event:PointerEvent)
{
  this.startPostion={
    x:event.clientX-this.position.x,
    y:event.clientY-this.position.y
  }
}
@HostListener('dragMove',['$event']) 
onDragMove(event:PointerEvent)
{
  this.position.x=event.clientX-this.startPostion.x;
  this.position.y=event.clientY-this.startPostion.y;
}
@HostListener('dragEnd',['$event']) 
onDragEnd(event:PointerEvent)
{
  if(this.reset)
  this.position={x:0,y:0}; 
}
}
