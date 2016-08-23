import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/Rx";
import { List } from 'immutable';
import 'rxjs/add/operator/map';

@Injectable()
export class TitleStateService {

  private _title$: BehaviorSubject<string> = new BehaviorSubject('');  
  public title$: Observable<string> = this._title$.asObservable();

  constructor() {}

  setTitle ( newTitle : string ): void {
    this._title$.next(newTitle);
  }
}
