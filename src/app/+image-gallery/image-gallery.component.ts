import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router'; 

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';

import { ScorecardStateService } from '../shared'; 
import { Scorecard } from '../shared'; 

@Component({
  moduleId: module.id,
  selector: 'app-image-gallery',
  templateUrl: 'image-gallery.component.html',
  styleUrls: ['image-gallery.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    MD_CARD_DIRECTIVES, 
    MD_LIST_DIRECTIVES,
    MD_GRID_LIST_DIRECTIVES, 
    MD_BUTTON_DIRECTIVES, 
    MD_ICON_DIRECTIVES]
})
export class ImageGalleryComponent implements OnInit {
  
  scorecards : Scorecard[]; 
  errorMessage: string;
  
  constructor(private scorecardState : ScorecardStateService) {}

  ngOnInit() {
    this.scorecardState.scorecard$.subscribe(
			data => { 
        this.scorecards = data.toArray().filter(sc => {
          return !!sc.media.length; 
        }) 
      },
			error => this.errorMessage = <any>error);
  }
}
