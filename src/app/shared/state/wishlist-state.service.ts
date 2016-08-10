import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/Rx";

import { CommonService } from '../services/common.service';
import { UserStateService } from '../state/user-state.service'; //Give full pathname for classes that are used in constructors 
import { Wishlist } from '../'; 
import { Priority } from '../'; 

@Injectable()
export class WishlistStateService {

  private _wishlist$: BehaviorSubject<Wishlist> = new BehaviorSubject(new Wishlist('', '', [], ''));  
  public wishlist$: Observable<Wishlist> = this._wishlist$.asObservable();


  constructor(private userState : UserStateService) {
    this.userState.user$.subscribe(
			user => { this._wishlist$.next(user.wishlist); },
			error => console.log(error)); //TODO: ERROR HANDLING! 
  }

  changeWishlistPriorities(oldPriority : Priority, newWeight : number){
    // let currentWishlist = this._wishlist$.getValue(); 
    // currentWishlist.priorities.forEach(priority => { 
    //   if(priority._id === oldPriority._id)
    //     priority.weight = newWeight; 
    // })
    let change = false; 
    let currentWishlist = this._wishlist$.getValue(); 
    let newWishlist = new Wishlist(
      currentWishlist._id, 
      currentWishlist.title, 
      [], 
      currentWishlist.owner);

    currentWishlist.priorities.forEach(priority => { 
      let newPriority = new Priority(priority._id, priority.description, 0, priority.wishlist); 
      if(newPriority._id === oldPriority._id){
        change = priority.weight !== newWeight; 
        newPriority.weight = newWeight; 
      }
      else
        newPriority.weight = priority.weight; 
      newWishlist.priorities.push(newPriority); 
    })
    if(change)
      this._wishlist$.next(newWishlist); 
      //this.userState.updateUserWishlist(newWishlist); 
  }

}
