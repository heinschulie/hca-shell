import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/Rx";
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { List } from 'immutable';
import 'rxjs/add/operator/map';
import { CommonService } from '../services/common.service';
import { UserService } from '../services/user.service'; //Give full pathname for classes that are used in constructors 
import { User } from '../'; 
import { Wishlist } from '../'; 


@Injectable()
  export class UserStateService {
  loggedIn : AsyncSubject<boolean> = new AsyncSubject<boolean>();
  private _user$: BehaviorSubject<User> = new BehaviorSubject(this.common.userScaffold());  
  public user$: Observable<User> = this._user$.asObservable();

  constructor(private common : CommonService, private userService: UserService) {
    if(!!localStorage.getItem('hca_auth_token')){
      this.loadUser(); 
    }
    else{
      this.setAuthStatus(false); 
    }
  }

  setAuthStatus(value : boolean) {
    this.loggedIn.next(value); 
    this.loggedIn.complete(); 
  }

  loadUser () : void {
    this.userService.getUserByToken() // TODO: THIS SHOULD BE PER USER 
            .subscribe(
                res => {
                    let data = res.json(); 
                    let user = new User(
                          data._id, 
                          data.firstName,
                          data.lastName,
                          data.username,
                          data.image,
                          data.wishlist,
                          data.roles,
                          data.scorecards,
                          true
                        );       
                    this._user$.next(user);
                    this.setAuthStatus(true); 
                },
                err => this.handleError(err)
            );
  }

  login(username, password) {

    // reset the asyncsubject
    this.loggedIn = new AsyncSubject<boolean>(); 
    return this.userService.login(username, password)
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          //localStorage.removeItem('asc_auth_token');
          localStorage.setItem('hca_auth_token', res.auth_token);
          this._user$ = new BehaviorSubject(new User(
            res.user._id, 
            res.user.firstName,
            res.user.lastName,
            res.user.username,
            res.user.image,
            res.user.wishlist,
            res.user.roles,
            res.user.scorecards,
            true
          )); 
          this.setAuthStatus(true); 
        }
        else{
          console.log("Log in did not succeed! Message: " + res.message); 
          this.setAuthStatus(false); 
        }

        return res.success;
      });
  }

  createUser(user : User) {

    return this.userService.createUser(user)
      .map(res => res.json())
      .map((res) => {
        if (res._id) {
          console.log('Succesfully created ' + res.username); 
        }
        else{
          console.log("Create did not succeed! Message: " + res.reason); 
        }
        return res.success;
      });
  }

  updateUser(user : User) {

    return this.userService.updateUser(user)
      .map(res => res.json())
      .map((res) => {
        if (res._id) {
          console.log('Succesfully edited ' + res.username);  
          this._user$.next(res);
        }
        else{
          console.log("Update did not succeed! Message: " + res.reason); 
        }
        return res.success;
      });
  }
  
  logout() {
    this.loggedIn = new AsyncSubject<boolean>(); 
    localStorage.removeItem('hca_auth_token');
    this.loggedIn.next(false); 
  }

  validateUser(user : User){
    //TODO: VALIDATION
    return true; 
  }

  testRole() {
    return this.userService.testRole()
      .map(this.extractData)
      .catch(this.handleError);
  }

  testAuth() {
    return this.userService.testAuth()
      .map(this.extractData)
      .catch(this.handleError);
  }

  // WISHLIST 

  updateUserWishlist(newWishlist : Wishlist){
    
    let user = this._user$.getValue(); 
    user.wishlist = newWishlist; 
    this._user$.next(user); 
  }



  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.reason) ? error.reason :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    let message = error.json().body; 
    console.error(message); // log to console instead
    this.setAuthStatus(false); 
    return Observable.throw(errMsg);
  }
}
