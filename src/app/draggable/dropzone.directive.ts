import { Directive,OnInit,HostBinding,HostListener,Output ,EventEmitter, SkipSelf} from '@angular/core';
import {DroppableService} from './droppable.service';

@Directive({
  selector: '[appDropzone]',
  providers:[DroppableService] 
})
export class DropzoneDirective implements OnInit{
  
  @HostBinding('class.dropzone-activated')
  activated=false;

  @Output() drop=new EventEmitter<PointerEvent>();

  @HostBinding('class.dropzone-entered')
  entered=false;
  constructor(@SkipSelf() private droppableService:DroppableService) { }

  ngOnInit():void{
    this.droppableService.dragStart$.subscribe(()=>this.onDragStart());
    this.droppableService.dragEnd$.subscribe((event)=>this.onDragEnd(event));
  }

  @HostListener('pointerenter')
  onPointerEnter():void{
    if(!this.activated)
    return
    this.entered=true;
  }

  @HostListener('pointerleave')
  onPointerLeave():void{
    if(!this.activated)
    return
    this.entered=false; 
    
  }


 private  onDragStart():void
  {
  this.activated=true;

  }
  private onDragEnd(event):void
  {
    if(this.entered)
    {
      this.drop.emit(event);
    }
    this.activated=false; 
    this.entered=false; 
  }
}
