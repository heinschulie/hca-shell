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
import { Priority } from '../'; 
import { Scorecard } from '../'; 
import { Score } from '../'; 


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
      let wishlist = Wishlist.returnNewEmptyInstance();
      this._user$.next(new User('', '', '', 'Bernard', '', wishlist, [], [], false));
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
                    data.isAuth = true; 
                    let user = User.newInstance(data); 
                    // let data = res.json(); 
                    // let user = new User(
                    //       data._id, 
                    //       data.firstName,
                    //       data.lastName,
                    //       data.username,
                    //       data.image,
                    //       data.wishlist,
                    //       data.roles,
                    //       data.scorecards,
                    //       true
                    //     );       
                    this._user$.next(user);
                    this.setAuthStatus(true); 
                },
                err => {
                console.log("Log in did not succeed! Message: " + err); 
                this.setAuthStatus(false); 
              }
            );
  }

  login(username, password) {

    // reset the asyncsubject
    this.loggedIn = new AsyncSubject<boolean>(); 
    return this.userService.login(username, password)
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          localStorage.setItem('hca_auth_token', res.auth_token);
          
          res.user.isAuth = true; 
          let user = User.newInstance(res.user); 

          // let user = new User(
          //   res.user._id, 
          //   res.user.firstName,
          //   res.user.lastName,
          //   res.user.username,
          //   res.user.image,
          //   res.user.wishlist,
          //   res.user.roles,
          //   res.user.scorecards,
          //   true
          // ); 
          this._user$.next(user);
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

  // WISHLIST AND SCORECARDS 

  updateUserWishlistandScorecards(newWishlist : Wishlist, updatedScorecardCollection: Scorecard []) : Observable<boolean>{
    console.log("SCORECARD COLLECTION: " + updatedScorecardCollection); 
    let user = this._user$.getValue(); 
    user.wishlist = newWishlist; 
    user.scorecards = updatedScorecardCollection; 
    this._user$.next(user); 
    return Observable.of(true); 
  }

  addScorecardToUserScorecards(newScorecard: Scorecard) : Observable<boolean>{
    let user = this._user$.getValue(); 
    user.scorecards.push(newScorecard); 
    this._user$.next(user); 
    return Observable.of(true); 
  }

  updateExistingScorecardInUserScorecards(updatedScorecard : Scorecard) : Observable<boolean>{
    let user = this._user$.getValue(); 
    for(var i = user.scorecards.length - 1; i > -1; i--){
      let currentSc = user.scorecards[i]; 
      if(currentSc._id === updatedScorecard._id){
        user.scorecards.splice(i, 1);
        user.scorecards.push(updatedScorecard);
        break; 
      }
    }
    this._user$.next(user); 
    return Observable.of(true); 
  }

  updateUserCollectionsWithNewPriority(updatedPriority : Priority) : Observable<boolean>{
    let user = this._user$.getValue(); 
    for(var i = user.wishlist.priorities.length - 1; i > -1; i--){
      let currentPriority = user.wishlist.priorities[i]; 
      if(currentPriority._id === updatedPriority._id){
        user.wishlist.priorities.splice(i, 1);
        user.wishlist.priorities.push(updatedPriority);
        break; 
      }
    }
    this._user$.next(user); 
    return Observable.of(true); 
  }
  updateUserCollectionsWithNewScore(updatedScore : Score) : Observable<boolean>{
    let user = this._user$.getValue(); 
    user.scorecards.forEach(function(scorecard){
      if(scorecard._id === updatedScore.scorecard){
        for(var i = scorecard.scores.length - 1; i > -1; i--){
          let currentscore = scorecard.scores[i]; 
          if(currentscore._id === updatedScore._id){
            scorecard.scores.splice(i, 1);
            scorecard.scores.push(updatedScore);
            break; 
          }
        }
      }
    })  
    this._user$.next(user); 
    return Observable.of(true); 
  }

  // ERROR HANDLING

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
