import { Component, OnInit, Input } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router'; 
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';

import { UserStateService } from '../shared'; 
import { User } from '../shared/models/user'; 
import { Scorecard } from '../shared/models/scorecard'; 

@Component({
  moduleId: module.id,
  selector: 'app-dash-stats',
  templateUrl: 'dash-stats.component.html',
  styleUrls: ['dash-stats.component.css'],
  directives: [ROUTER_DIRECTIVES, MD_ICON_DIRECTIVES]
})
export class DashStatsComponent implements OnInit {

  user: User; 
  topScorecard : Scorecard; 
  constructor(private _router: Router, private userState: UserStateService) { }

  ngOnInit() {
    this.userState.user$.subscribe(
			auser => { 
        this.user = auser; 
        this.topScorecard = this.calculateTopScorecard(); 
      },
			error => console.log(error)); 
  }

  // DASHBOARD PANEL FOR 1st TIME USERS

  
  userHasWishlist() : boolean { 
    return !!this.user.wishlist.priorities.length; // TODO 
  }
  userHasScorecards() : number {
    if(!this.user)
      return 0; 
    else
      return this.user.scorecards.length; 
  }

  goToAddrate() : void {
    this._router.navigate(['/addrate']); 
  }
  goToWishlist() : void {
    this._router.navigate(['/wishlist']); 
  }

  calculateTopScorecard() : Scorecard {
    if(this.user){
      let topScorecard : Scorecard; 
      let topScore = 0; 
      this.user.scorecards.forEach(sc => {
        if(+sc.total > topScore){
          topScore = +sc.total;
          topScorecard = sc; 
        } 
      })
      return topScorecard; 
    }
  }

  // END

}
