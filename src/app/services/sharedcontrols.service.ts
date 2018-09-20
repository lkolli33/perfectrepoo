import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedcontrolsService {

  private JsonControls=new BehaviorSubject('');
  sharedJsonControls=this.JsonControls.asObservable();

  changeControls(message:string)
  {
    this.JsonControls.next(message);

  }


  constructor() { }
}
