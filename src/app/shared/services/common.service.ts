import { Injectable, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/Rx";

import { User } from "../"
import { Wishlist } from "../"

@Injectable()
export class CommonService {
  
  private _loginUrl = 'http://localhost:4040/login';
  private _homechoiceUrl = 'http://localhost:4040/api/';  // URL to web api
  private _title$: BehaviorSubject<string> = new BehaviorSubject('');
  public title$ : Observable<string> = this._title$.asObservable();
  // public titleSet() { return !!this._title$.getValue() };
  
  public authenticated:boolean = false;
  subscription:EventEmitter<any> = new EventEmitter();
  
  toggleAuthentication(){
    this.authenticated = !this.authenticated;
    this.subscription.next(this.authenticated);
  }

  setTitle(newtitle : string){
    console.log("1 " + this.authenticated);
    this.authenticated = !!newtitle;
    //this._title$ = new BehaviorSubject(newtitle);   
    this._title$.next(newtitle);
    this.subscription.next(this.authenticated);
    console.log("2 " + this.authenticated);
  }

  constructor() {}

  getUrl () : string {
    return this._homechoiceUrl; 
  }
  getLoginUrl () : string {
    return this._loginUrl; 
  }

  userScaffold () : User {
    return new User('', '', '', '', '', new Wishlist('', '', [], ''), [], [], false); 
  }
}