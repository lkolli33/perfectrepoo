import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from '../draggable/draggable.directive';
import { MovableDirective } from '../draggable/movable.directive';
import { MovableAreaDirective } from '../draggable/movable-area.directive';
import { DraggableHelperDirective} from '../draggable/draggable-helper.directive';
import { DroppableDirective} from '../draggable/droppable.directive';
import {DropzoneDirective} from './dropzone.directive';
import { OverlayModule} from '@angular/cdk/overlay';
import {DroppableService} from './droppable.service';
import { SortableListDirective }  from './sortable-list.directive';
import { SortableDirective} from './sortable.directive';

@NgModule({
  imports: [
    CommonModule,OverlayModule
  ],
  declarations: [DraggableDirective,MovableDirective,MovableAreaDirective,DraggableHelperDirective,
    DroppableDirective,DropzoneDirective,SortableListDirective,SortableDirective],
  exports:[
    DraggableDirective,
    MovableDirective,
    MovableAreaDirective,
    DraggableHelperDirective,
    DroppableDirective,
    DropzoneDirective,SortableListDirective,SortableDirective],
    
    providers:[DroppableService]
})
export class DraggableModule { }
