import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../shared';
import { Scorecard } from '../shared'; 
import { ScorecardStateService } from '../shared'; 
import { TitleStateService } from '../shared'; 
import { MediaStateService } from '../shared'; 
import { Media } from '../shared'; 
import { DetailCardComponent } from '../detail-card'; 

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';

import { Slide } from '../image-slide';
import { ImageCarouselComponent } from '../image-carousel';

import { HcaListitemComponent } from '../hca-listitem';

@Component({
  moduleId: module.id,
  selector: 'app-review',
  templateUrl: 'review.component.html',
  styleUrls: ['review.component.css'],
  directives: [
    MD_CARD_DIRECTIVES, 
    MD_LIST_DIRECTIVES, 
    MD_BUTTON_DIRECTIVES, 
    MD_ICON_DIRECTIVES,
    MD_GRID_LIST_DIRECTIVES,
    ImageCarouselComponent,
    Slide,
    DetailCardComponent,
    HcaListitemComponent]
})
export class ReviewComponent implements OnInit {
  private sub: any;
  errorMessage: any; 
  scorecard: Scorecard; 

  constructor(private commonService: CommonService,
              private route: ActivatedRoute,
              private router: Router,
              private _scorecardState: ScorecardStateService,
              private titleState: TitleStateService,
              private mediaState: MediaStateService) { 
                if(typeof this.scorecard === "undefined")
                  this.scorecard = Scorecard.returnNewEmptyInstance(); 
              }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = params['id']; // (+) converts string 'id' to a number
      this._scorecardState.getScorecardById(id).subscribe( //Get system level anatomies 
				scorecard => { 
          if(scorecard.featuredimage.economic_url)
            this.scorecard = scorecard;
          else{
            this.scorecard = Scorecard.newInstance(scorecard); 
          }
        },
				error => this.errorMessage = <any>error);
    });
    this.titleState.setTitle("Review");
  }

  selectMedia(media : Media){
    this.mediaState.setCurrentMedia(media); 
  }

}
