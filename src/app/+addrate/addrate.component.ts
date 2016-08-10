import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FORM_DIRECTIVES } from '@angular/forms';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input'
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

import { CommonService } from '../shared'; 
import { WishlistStateService } from '../shared'; 
import { Property } from '../shared'; 
import { Wishlist } from '../shared'; 
import { Scorecard } from '../shared'; 
import { PropertyStateService } from '../shared'; 
import { ScorecardStateService } from '../shared'; 

import { HcaListitemComponent } from '../hca-listitem'; 
import { ImageUploaderComponent } from '../image-uploader'; 

@Component({
  moduleId: module.id,
  selector: 'app-addrate',
  templateUrl: 'addrate.component.html',
  styleUrls: ['addrate.component.css'],
  directives: [
    FORM_DIRECTIVES,
    MD_CARD_DIRECTIVES, 
    MD_INPUT_DIRECTIVES,
    MD_LIST_DIRECTIVES, 
    MD_BUTTON_DIRECTIVES, 
    MD_ICON_DIRECTIVES,
    HcaListitemComponent,
    ImageUploaderComponent
  ]
})
export class AddrateComponent implements OnInit {
  private sub: any;
  private queryPropertyId: string;
  private queryScorecardId: string;
  
  scorecard: Scorecard; 
  wishlist: Wishlist; 
  errorMessage: any; 

  constructor(private router: Router, 
              private wishlistState : WishlistStateService,
              private commonService: CommonService,
              private propertyState: PropertyStateService, 
              private scorecardState: ScorecardStateService) {}

  ngOnInit() {
    // Set the page title       
    this.commonService.setTitle("Add");

    // Subscribe to users wishlist
    this.wishlistState.wishlist$.subscribe(
			wishlist => { this.wishlist = wishlist; },
			error => this.errorMessage = <any>error);

    // Read relevant query state 
    this.sub = this.router
      .routerState
      .queryParams
      .subscribe(params => {
        this.queryPropertyId = params['propertyId'];
        this.queryScorecardId = params['scorecardId'];
        console.log("Property Id: " + this.queryPropertyId); 
        console.log("Scorecard Id: " + this.queryScorecardId); 

        if(this.queryScorecardId)
          this.scorecardState.getScorecardById(this.queryScorecardId)
            .subscribe(scorecard => {
              this.scorecard = scorecard;
            }); 
        else{
          let newProperty = new Property('', '', false, new Date(), 0, 0, '', 0); 
          this.scorecard = new Scorecard('', newProperty, this.wishlist, this.wishlist.owner, [], false); 
        }
      });
  }

  addNewProperty() : void {
    console.log("Property added: " + this.scorecard.property); 
    this.scorecard.property._id = "lsdjgfksdjfgldksj"; //FAKE TILL I BAKE IT
    
  }

  onImageChange($event){
    if(this.scorecard && this.scorecard.property)
      this.scorecard.property.image = $event; //FAKE TILL I BAKE IT
  }

  toggleAddComplete = false; 
  toggleImageComplete = false; 
  toggleRateComplete = false; 

  addComplete() : boolean {
    if(this.scorecard)
      return !!this.scorecard.property._id;
    else
      return false;  
  }
  imageComplete() : boolean {
    if(this.scorecard)
      return !!this.scorecard.property.image;
    else
      return false;  
  }
  rateComplete() : boolean {
    return this.toggleRateComplete; 
  }


  addActive(): boolean {
    if (!this.imageActive() && !this.rateActive() && !this.addComplete())
      return true;
    return false; 
  }
  imageActive() : boolean {
    return this.addComplete() && !this.imageComplete(); 
  }
  rateActive() : boolean {
    return this.addComplete() && this.imageComplete() && !this.rateComplete(); 
  }
}
