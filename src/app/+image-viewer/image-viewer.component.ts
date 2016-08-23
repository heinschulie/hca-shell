import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../shared';
import { Scorecard } from '../shared'; 
import { ScorecardStateService } from '../shared'; 
import { TitleStateService } from '../shared'; 
import { MediaStateService } from '../shared'; 
import { Media } from '../shared'; 

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';

import { ImageCarouselComponent } from '../image-carousel';

@Component({
  moduleId: module.id,
  selector: 'app-image-viewer',
  templateUrl: 'image-viewer.component.html',
  styleUrls: ['image-viewer.component.css'],
  directives: [
    MD_CARD_DIRECTIVES, 
    MD_ICON_DIRECTIVES,
    MD_GRID_LIST_DIRECTIVES,
    ImageCarouselComponent
  ]
})
export class ImageViewerComponent implements OnInit {
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
            },error => this.errorMessage = <any>error);
        });
        this.titleState.setTitle("Images");
  }

    selectMedia(media : Media){
        this.mediaState.setCurrentMedia(media); 
    }
}