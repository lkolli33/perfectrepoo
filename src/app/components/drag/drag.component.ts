import { Component, OnInit, Input, Output } from '@angular/core';
import { SortEvent } from '../../draggable/sortable-list.directive';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SharedcontrolsService } from '../../services/sharedcontrols.service';
//import { IControlBase } from '../../models/control-base';

export interface Icomponentjson {
  fieldName: string;
  controlType: string;
}
@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.scss']
})
export class DragComponent implements OnInit {

  components = ['TextBox', 'Button', 'CheckBox', 'RadioButton', 'TextArea', 'Dropdown', 'DateTime', 'File'];

  form: FormGroup;
  constructor(private _router: Router, private _sharedControlsServices: SharedcontrolsService, private _fb: FormBuilder) { }
  dropZone: Icomponentjson[] = [];

  dropZoneString: string;
  fieldName: string;
  controlType: string;
  JSONcontrols: Icomponentjson[] = [];

  move(comp: string): void {
    const ctrl = {
      fieldName: comp,
      controlType: comp
    }

    this.dropZone.push(ctrl);

  }
  currentComponent?: string;

  sort(event: SortEvent) {
    const current = this.dropZone[event.currentIndex];
    const swapWith = this.dropZone[event.newIndex];
    this.dropZone[event.newIndex] = current;
    this.dropZone[event.currentIndex] = swapWith;
    //console.log(this.dropZone);
  }
  ngOnInit() {
    this._sharedControlsServices.sharedJsonControls.subscribe(controls => this.dropZoneString = controls)
  }
  preview() {
    this.dropZoneString = JSON.stringify(this.dropZone);
    // this._sharedControlsServices.changeControls(this.dropZoneString);
    //  this._router.navigate(['preview']);
    this.JSONcontrols = JSON.parse(this.dropZoneString);
    let group: any = {};
    //formbuilder logic
    this.JSONcontrols.forEach(item => {
      group[item.fieldName] = new FormControl(item.fieldName);
    });
    this.form = new FormGroup(group);
   // console.log("this.form", this.form);
  }

}
