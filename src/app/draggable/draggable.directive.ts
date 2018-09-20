import { Directive,HostBinding,HostListener,Output,Input,EventEmitter,TemplateRef,ViewContainerRef,ContentChild ,ElementRef} from '@angular/core';
import {DraggableHelperDirective} from './draggable-helper.directive';

@Directive({
  selector: '[appDraggable]  '
})
export class DraggableDirective {

  @Output()
  dragStart =new EventEmitter<PointerEvent>();

  @Output()
  dragMove =new EventEmitter<PointerEvent>();
  
  @Output()
  dragEnd =new EventEmitter<PointerEvent>();
  
  constructor(public element:ElementRef){}
 // @ContentChild(DraggableHelperDirective)
  helper:DraggableHelperDirective; 

    @HostBinding('class.draggable') 
  draggable=true;

  private dragging=false;
  @HostListener('pointerdown',['$event']) 
  onPointerDown(event:PointerEvent):void
  {
    this.dragging=true;
    event.stopPropagation();
    this.dragStart.emit(event);

    //render the helper
    //this.helper.onDragStart();
  }
  @HostListener('document:pointermove',['$event']) 
   onPointerMove(event:PointerEvent):void{
    if(!this.dragging)
    return
    this.dragMove.emit(event);
  }
  @HostListener('document:pointerup',['$event'])
   onPointerUp(event:PointerEvent):void{
    if(!this.dragging)
    return
    else
    {
      this.dragEnd.emit(event);
      this.dragging=false;
    //  this.helper.onDragEnd();

    }
  }

}
