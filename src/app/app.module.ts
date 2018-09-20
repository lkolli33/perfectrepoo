import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DraggableModule } from './draggable/draggable.module';
import { DragComponent } from './components/drag/drag.component';

const appRoutes: Routes = [
  { path: '*', component: DragComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DragComponent,
  ],
  imports: [
    BrowserModule, DraggableModule, FormsModule, RouterModule.forRoot(appRoutes), ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
