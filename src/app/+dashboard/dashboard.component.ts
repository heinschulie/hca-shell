import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router'; 

import { CommonService } from '../shared';
import { Scorecard } from '../shared'; 
import { ScorecardStateService } from '../shared'; 
import { TitleStateService } from '../shared'; 
import { ListCardComponent } from '../list-card'; 
import { DetailCardComponent } from '../detail-card'; 
import { DashStatsComponent } from '../dash-stats'; 

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';

import { Truncate } from '../shared'; 

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  directives: [
    MD_CARD_DIRECTIVES, 
    MD_LIST_DIRECTIVES, 
    MD_BUTTON_DIRECTIVES, 
    MD_ICON_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    DetailCardComponent,
    ListCardComponent,
    ROUTER_DIRECTIVES,
    DashStatsComponent],
  pipes: [ Truncate ]
})
export class DashboardComponent implements OnInit {

  constructor(private _router: Router, 
              public commonService: CommonService,
              private titleState: TitleStateService,
              private _scorecardState : ScorecardStateService) {}

  errorMessage: string;
  scorecards: Scorecard[];
  scorecard: Scorecard;
  private securitySubscription:any;
  contentclass : string = "content"; 
  // private authenticated:boolean = false;

  ngOnInit() { 
    if(/iPad|iPhone|iPod/.test(navigator.userAgent)){
			if(/Safari/.test(navigator.userAgent)){
				if(navigator['standalone'] === false){
					this.contentclass = "iosbrowser";
				}
			}
		}
    
    this._scorecardState.scorecard$.subscribe(
			data => { this.scorecards = data.toArray(); },
			error => this.errorMessage = <any>error); // subscribe to scorecards

      //This is all removable if dahsboard has no title anyway. Which it doesn't. 
    // this.commonService.title$.subscribe(
		// 	data => { this.title = data; },
		// 	error => this.errorMessage = <any>error);
    // this.securitySubscription = this.commonService.subscription.subscribe(authenticated=>{
    //     this.authenticated=authenticated;
    //     console.log("In dashboard " + this.authenticated); 
    //   });

    this.titleState.setTitle("");
  }

  onSelect(scorecard : Scorecard) { 
    if(scorecard.active){
      scorecard.active = false;
      this.scorecard = null; 
    }
    else{
      this.scorecards.forEach(ascorecard => ascorecard.active = false);   
      scorecard.active = true; 
      this.scorecard = scorecard;  
    }
    this._scorecardState.setSelectedScorecard(scorecard); 
  }
 
  navigateToAdd() : void {
    this._router.navigate(['/addrate']);
  }

  navigateToRate() : void {
    this._router.navigate(['/addrate'], { queryParams: { scorecardId : this.scorecard._id, propertyId : this.scorecard.property._id } });
  }

  navigateToReview() : void {
    this._router.navigate(['/review', this.scorecard._id]);
  }

  // // DASHBOARD PANEL FOR 1st TIME USERS

  // haswl = false; 
  // toggleWl() {
  //   this.haswl = !this.haswl; 
  // }
  // userHasWishlist() : boolean {
  //   return this.haswl; // TODO 
  // }
  // haspop = false; 
  // togglePop() {
  //   this.haspop = !this.haspop; 
  // }
  // userHasProperty() : boolean {
  //   return this.haspop; // TODO 
  // }

  // goToWishlist() : void {
  //   this._router.navigate(['/wishlist']); 
  // }

  // // END 
}
