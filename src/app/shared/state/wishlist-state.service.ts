import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/Rx";

import { CommonService } from '../services/common.service';
import { UserStateService } from '../state/user-state.service'; //Give full pathname for classes that are used in constructors
import { WishlistService } from '../services/wishlist.service'; //Give full pathname for classes that are used in constructors
import { ScorecardStateService } from '../state/scorecard-state.service'; //Give full pathname for classes that are used in constructors  
import { Wishlist } from '../'; 
import { Priority } from '../'; 
import { Scorecard } from '../'; 

@Injectable()
export class WishlistStateService {

  private _wishlist$: BehaviorSubject<Wishlist> = new BehaviorSubject(new Wishlist('', '', [], ''));  
  public wishlist$: Observable<Wishlist> = this._wishlist$.asObservable();


  constructor(private userState : UserStateService, 
              private wishlistService: WishlistService,
              private scorecardState: ScorecardStateService) {
    this.userState.user$.subscribe(
			user => { this._wishlist$.next(user.wishlist); },
			error => console.log(error)); //TODO: ERROR HANDLING! 
  }

  deletePriority(priority : Priority) : void {
    this.wishlistService.deletePriority(priority._id)
    .map(res => res.json())
    .subscribe((res) => {
        if (res) {
          let wishlist = new Wishlist(
            res.data.wishlist._id, 
            res.data.wishlist.title,
            res.data.wishlist.priorities,
            res.data.wishlist.owner
          ); 
          this.scorecardState.newScorecardArray(res.data.scorecards).subscribe(
            newscorecards => {
              this.userState.updateUserWishlistandScorecards(wishlist, newscorecards);
            }
          );  
        }
        else{
          console.log("Priority delete did not succeed! Message: " + res.message); 
        }
        return res.success;
      });
  }

  addPriority(priorityDescription : string, wishlistId : string) : void {
    let priority = {
      description: priorityDescription,
      wishlist: wishlistId,
      weight: 1
    }; 
    this.wishlistService.addPriority(priority)
    .map(res => res.json())
    .subscribe((res) => {
        if (res) {
          let wishlist = new Wishlist(
            res.data.wishlist._id, 
            res.data.wishlist.title,
            res.data.wishlist.priorities,
            res.data.wishlist.owner
          ); 
          this.scorecardState.newScorecardArray(res.data.scorecards).subscribe(
            newscorecards => {
              this.userState.updateUserWishlistandScorecards(wishlist, newscorecards);
            }
          );  
        }
        else{
          console.log("Priority delete did not succeed! Message: " + res.message); 
        }
        return res.success;
      });
  }

  updatePriorityWeight(priority : Priority){
    this.wishlistService.updatePriorityWeight(priority)
    .map(res => res.json())
    .subscribe((res) => {
      if (res) {
        let newPriority = new Priority(
          res.data._id, 
          res.data.description,
          res.data.weight,
          res.data.wishlist
        ); 
        this.userState.updateUserCollectionsWithNewPriority(newPriority);  
      }
      else{
        console.log("Priority delete did not succeed! Message: " + res.message); 
      }
      return res.success;
    })
  }

  // changeWishlistPriorities(oldPriority : Priority, newWeight : number){
  //   // let currentWishlist = this._wishlist$.getValue(); 
  //   // currentWishlist.priorities.forEach(priority => { 
  //   //   if(priority._id === oldPriority._id)
  //   //     priority.weight = newWeight; 
  //   // })
  //   let change = false; 
  //   let currentWishlist = this._wishlist$.getValue(); 
  //   let newWishlist = new Wishlist(
  //     currentWishlist._id, 
  //     currentWishlist.title, 
  //     [], 
  //     currentWishlist.owner);

  //   currentWishlist.priorities.forEach(priority => { 
  //     let newPriority = new Priority(priority._id, priority.description, 0, priority.wishlist); 
  //     if(newPriority._id === oldPriority._id){
  //       change = priority.weight !== newWeight; 
  //       newPriority.weight = newWeight; 
  //     }
  //     else
  //       newPriority.weight = priority.weight; 
  //     newWishlist.priorities.push(newPriority); 
  //   })
  //   if(change)
  //     this._wishlist$.next(newWishlist); 
  //     //this.userState.updateUserWishlist(newWishlist); 
  // }

}
