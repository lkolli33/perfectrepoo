import { Directive,TemplateRef,ViewContainerRef ,OnInit,OnDestroy} from '@angular/core';
import {DraggableDirective} from './draggable.directive';
import {Overlay,OverlayRef,GlobalPositionStrategy} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';

@Directive({
  selector: '[appDraggableHelper]',
  exportAs:'appDraggableHelper'
})
export class DraggableHelperDirective implements OnInit,OnDestroy {

  private ovelayRef:OverlayRef;
  startPosition;
  private positionStrategy=new GlobalPositionStrategy();
  constructor(private templateRef:TemplateRef<any>,private viewContainerRef:ViewContainerRef,
    private draggable:DraggableDirective,private overlay:Overlay) { }


  ngOnInit():void{
    this.draggable.dragStart.subscribe((event)=>this.onDragStart(event));
    this.draggable.dragMove.subscribe((event)=>this.onDragMove(event));
    this.draggable.dragEnd.subscribe(()=>this.onDragEnd());

    //create an overlay..
    this.ovelayRef= this.overlay.create({
      positionStrategy:this.positionStrategy,
      panelClass:'draggable-helper-overlay'
    });
  }

  ngOnDestroy():void{
    this.ovelayRef.dispose();

  }

  private onDragStart(event:PointerEvent):void{

 //determine the relative start position 
    const clientRect=this.draggable.element.nativeElement.getBoundingClientRect();
    this.startPosition={
      x:event.clientX-clientRect.left,
      y:event.clientY-clientRect.top
    }

  }
  private onDragEnd():void{

    
    this.ovelayRef.detach();//remove the helper from the overlay
   // this.viewContainerRef.clear();
  }
  private onDragMove(event:PointerEvent):void{
    if(!this.ovelayRef.hasAttached())
    {
      this.ovelayRef.attach(new TemplatePortal(this.templateRef,this.viewContainerRef));
    }
    this.positionStrategy.left(`${event.clientX-this.startPosition.x}px`);
    this.positionStrategy.top(`${event.clientY-this.startPosition.y}px`);
    this.positionStrategy.apply();

//positioning the helper

  }


}
