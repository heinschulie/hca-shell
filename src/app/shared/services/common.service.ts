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
  // private _loginUrl = 'https://cryptic-journey-27223.herokuapp.com/login';
  // private _homechoiceUrl = 'https://cryptic-journey-27223.herokuapp.com/api/';

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


  // Do a bit of studying before you clear these comments.
  //https://davidwalsh.name/javascript-debounce-function
  //https://john-dugan.com/javascript-debounce/
  //http://stackoverflow.com/questions/24004791/can-someone-explain-the-debounce-function-in-javascript
  debounce(func, wait, immediate) {
      // 'private' variable for instance
      // The returned function will be able to reference this due to closure.
      // Each call to the returned function will share this common timer.
      let timeout;           

      // Calling debounce returns a new anonymous function
      return function() {
          // reference the context and args for the setTimeout function
          var context = this, 
              args = arguments;

          // Should the function be called now? If immediate is true
          //   and not already in a timeout then the answer is: Yes
          var callNow = immediate && !timeout;

          // This is the basic debounce behaviour where you can call this 
          //   function several times, but it will only execute once 
          //   [before or after imposing a delay]. 
          //   Each time the returned function is called, the timer starts over.
          clearTimeout(timeout);   

          // Set the new timeout
          timeout = setTimeout(function() {

              // Inside the timeout function, clear the timeout variable
              // which will let the next execution run when in 'immediate' mode
              timeout = null;

              // Check if the function already ran with the immediate flag
              if (!immediate) {
                // Call the original function with apply
                // apply lets you define the 'this' object as well as the arguments 
                //    (both captured before setTimeout)
                func.apply(context, args);
              }
          }, wait);

          // Immediate mode and no wait timer? Execute the function..
          if (callNow) func.apply(context, args);  
      }; 
  };
}