import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FORM_DIRECTIVES } from '@angular/forms';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input'
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar'; 

import { CommonService } from '../shared'; 
import { WishlistStateService } from '../shared'; 
import { Property } from '../shared'; 
import { Wishlist } from '../shared'; 
import { Scorecard } from '../shared'; 
import { Media } from '../shared'; 
import { PropertyStateService } from '../shared'; 
import { ScorecardStateService } from '../shared'; 
import { TitleStateService } from '../shared'; 
import { MediaStateService } from '../shared'; 

import { HcaListitemComponent } from '../hca-listitem'; 
import { ImageUploaderComponent } from '../image-uploader'; 
import { AutocompleteComponent } from '../autocomplete'; 

@Component({
  moduleId: module.id,
  selector: 'app-addrate',
  templateUrl: 'addrate.component.html',
  styleUrls: ['addrate.component.css'],
  directives: [
    FORM_DIRECTIVES,
    MD_CARD_DIRECTIVES, 
    MD_GRID_LIST_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MD_LIST_DIRECTIVES, 
    MD_BUTTON_DIRECTIVES, 
    MD_ICON_DIRECTIVES,
    MD_PROGRESS_BAR_DIRECTIVES, 
    HcaListitemComponent,
    ImageUploaderComponent,
    AutocompleteComponent
  ]
})
export class AddrateComponent implements OnInit {
  private sub: any;
  private queryPropertyId: string;
  private queryScorecardId: string;
  
  properties : Property[] = []; 
  filteredList = [];
  addressFragment = ''; 
  scorecardImageUrl = ''; 
  scorecard: Scorecard; 
  wishlist: Wishlist; 
  errorMessage: any; 
  inProgress: boolean; 

  constructor(private router: Router, 
              private wishlistState : WishlistStateService,
              private commonService: CommonService,
              private propertyState: PropertyStateService, 
              private scorecardState: ScorecardStateService,
              private titleState: TitleStateService,
              private mediaState: MediaStateService) {
                this.propertyState.property$.subscribe(
                  data => { 
                    this.properties = data.toArray(); 
                  },
                  error => this.errorMessage = <any>error); // subscribe to exercises
              }

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
              this.scorecardImageUrl = scorecard.featuredimage.url;
              this.titleState.setTitle("Rate");
            }); 
        else{    
          this.scorecard = Scorecard.returnNewEmptyInstance();
          this.scorecard.wishlist = this.wishlist; 
          this.scorecard.owner = this.wishlist.owner;  
          this.titleState.setTitle("Find a Property"); 
        }
      });
  }

  // addNewProperty() : void {
  //   console.log("Property added: " + this.scorecard.property); 
  //   this.scorecard.property._id = "lsdjgfksdjfgldksj"; //FAKE TILL I BAKE IT
    
  // }
  onUpdateScore($score) {
    this.scorecardState.updateScore($score);  
  }
  
  onFeaturedImageChange($event){
    if(this.scorecard && this.scorecard.property){
      // let media = Media.returnNewEmptyInstance();
      // media.url = $event;
      // media.type = 'image'; 
      this.scorecardImageUrl = $event; //FAKE TILL I BAKE IT
    }    
  }
  onMediaItemChange($event){
    // let file = $event; 
    this.inProgress = true;  
    if($event && this.scorecard._id){
      let mediaInfo = { 
        folder: 'Scorecards',
        publicId: 'media-' + this.scorecard._id.toString() + '-' + this.scorecard.media.length,
        tags: 'media'
      } 

      this.mediaState.createSignature(mediaInfo)
      .flatMap(signature => {
        if(signature)
          return this.mediaState.uploadImage(this.mediaState.currentFile, signature);
      })
      .flatMap(imageObject => {  
        let newMedia = new Media(
          '',
          imageObject.secure_url,
          '',
          '',
          'image',
          new Date(),
          'landscape',
          false,
          []
        );
        return this.scorecardState.addMediaItemToScorecard(this.scorecard, newMedia);
      })
      .subscribe(createdMedia => {
        this.scorecard.media.push(createdMedia);
        this.inProgress = false;  
      });


      // this.mediaState.createSignature(mediaInfo)
      // .flatMap(signature => {
      //   if(signature)
      //     return this.mediaState.uploadImage(this.mediaState.currentFile, signature);
      // })
      // .flatMap(imageObject =>{
      //   let newMedia = new Media(
      //     '',
      //     imageObject.secure_url,
      //     '',
      //     '',
      //     'image',
      //     new Date(),
      //     'landscape',
      //     false,
      //     []
      //   );
      //   return this.scorecardState.addMediaItemToScorecard(this.scorecard, newMedia);
      // })
      // .subscribe(createdMedia => {
      //   if(createdMedia._id)
      //     this.scorecard.media.push(createdMedia);
      //   // this.scorecardState.updateSingleScorecardInUserScorecards(this.scorecard); 
      //   console.log("Succesfully updated media to scorecard."); 
      //   // if(createdMedia){
      //   //   createdMedia.subscribe(newMedia => {
      //   //     if(newMedia._id)
      //   //       this.scorecard.media.push(newMedia);
      //   //     // this.scorecardState.updateSingleScorecardInUserScorecards(this.scorecard); 
      //   //     console.log("Succesfully updated media to scorecard."); 
      //   //   }) 
      //   // }      
      // })
    }
  }

  saveScorecard() : void {
    //See if this is a custom image
    this.inProgress = true;  
    if(this.scorecardState.scorecardExists(this.scorecard.property.address)){
      console.log("Scorecard already exists...");
      this.inProgress = false;   
      return; 
    }
    if(this.scorecard.featuredimage.url === this.scorecardImageUrl){
      if(this.scorecard._id)
        this.scorecardState.updateScorecard(this.scorecard).subscribe(res => {
          if(res) console.log("Scorecard was saved...");
          this.inProgress = false;  
        })
      else
        this.scorecardState.createScorecard(this.scorecard).subscribe(res => {
          if(res) console.log("Scorecard was saved...");
          this.inProgress = false;  
        })
    }
    else{
      if(this.mediaState.currentFile){
        if(this.scorecard._id){
          let mediaInfo = { 
            folder: 'Scorecards',
            publicId: this.scorecard._id.toString(),
            tags: 'featuredimage'
          } 
          this.mediaState.createSignature(mediaInfo)
          .flatMap(signature => {
            if(signature)
              return this.mediaState.uploadImage(this.mediaState.currentFile, signature);
          })
          .map(imageObject =>{
            this.scorecard.featuredimage.url = imageObject.secure_url; 
            //TODO - add all metadata
            return this.mediaState.updateMedia(this.scorecard.featuredimage);
          })
          .subscribe(updatedMedia => {
            if(updatedMedia){
              updatedMedia.subscribe(value => {
                this.scorecard.featuredimage = value;
                this.scorecardState.updateSingleScorecardInUserScorecards(this.scorecard); 
                this.scorecardImageUrl = this.scorecard.featuredimage.url;
                this.inProgress = false;  
                console.log("Succesfully updated existing scorecard with new image."); 
              }) 
            }      
          })
        }
        else{
          this.scorecardState.createScorecard(this.scorecard)
          .flatMap((data) => {
            if(data.signature){
              this.scorecard = data.scorecard; 
              return this.mediaState.uploadImage(this.mediaState.currentFile, data.signature); 
            }
          })
          .map(imageObject =>{
            //TODO - add all metadata
            this.scorecard.featuredimage.url = imageObject.secure_url; 
            return this.mediaState.updateMedia(this.scorecard.featuredimage);
          })
          .subscribe(updatedMedia => {
            if(updatedMedia){
              updatedMedia.subscribe(value => {
                this.scorecard.featuredimage = value;
                this.scorecardState.updateSingleScorecardInUserScorecards(this.scorecard); 
                this.scorecardImageUrl = this.scorecard.featuredimage.url;
                this.inProgress = false;  
                console.log("Succesfully updated new scorecard with new image."); 
                this.titleState.setTitle("Rate");
              }) 
            }      
          })
        }
      }
    }
  }

  // saveScorecard() : void {
  //   //See if this is a custom image
  //   if(this.scorecardState.scorecardExists(this.scorecard.property.address)){
  //     console.log("Scorecard already exists..."); 
  //     return; 
  //   }
  //   if(this.scorecard.featuredimage.url === this.scorecardImageUrl){
  //     if(this.scorecard._id)
  //       this.scorecardState.updateScorecard(this.scorecard).subscribe(res => {
  //         if(res) console.log("Scorecard was saved...");
  //       })
  //     else
  //       this.scorecardState.createScorecard(this.scorecard).subscribe(res => {
  //         if(res) console.log("Scorecard was saved...");
  //       })
  //   }
  //   else{
  //     //Upload image and then upload scorecard 
  //     let mediaInfo = { 
  //       folder: 'Scorecards',
  //       publicId: 'sc-' + this.scorecardState.scorecard$.toArray.length,
  //       tags: 'sc-featuredimage'
  //     } 
  //     if(this.mediaState.currentFile)
  //       this.mediaState.uploadImage(this.mediaState.currentFile, mediaInfo)
  //       .subscribe(newMedia => {
  //         this.scorecard.featuredimage = newMedia;
  //         if(this.scorecard._id)
  //           this.scorecardState.updateScorecard(this.scorecard).subscribe(res => {
  //             if(res) console.log("Scorecard was saved...");
  //           })
  //         else
  //           this.scorecardState.createScorecard(this.scorecard).subscribe(res => {
  //             if(res) console.log("Scorecard was saved...");
  //           })
  //       })
  //   }
  // }

  // toggleAddComplete = false; 
  // toggleImageComplete = false; 
  // toggleRateComplete = false; 

  addComplete() : boolean {
    if(!!this.scorecard)
      return !!this.scorecard.property._id;
    else
      return false;
  }
  imageComplete() : boolean {
    if(!!this.scorecard)
      return !!this.scorecard.property.featuredimage;
    else
      return false;
  }
  rateComplete() : boolean {
    return false;
  }

  scorecardStep() : string {
    if(this.scorecard._id)
      return 'saved';
    else if(this.scorecard.property._id && this.scorecard.featuredimage.url)
      return 'saveable';
    else if(this.scorecard.property._id && !this.scorecard.featuredimage.url)
      return 'requireimage';
    else{
      return 'requireproperty';
    }
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
    return this.addComplete() && this.imageComplete() && !!this.scorecard._id; 
  }
  
  private autocompleteAvailableProperties() {
    if(this.properties.length){
      if (this.addressFragment !== ''){
          this.filteredList = this.properties.filter(function(prop){
              return prop.address.toLowerCase().indexOf(this.addressFragment.toLowerCase()) > -1;
          }.bind(this));
          if(!this.filteredList.length){
            this.properties = [];
            this.autocompleteAvailableProperties(); 
          }         
      }else{
          this.filteredList = [];
      }
    }
    else{
      this.propertyState.getPropertyListByAddress(this.addressFragment);
    }
  }

  debouncedAutocompleteProperties = this.commonService.debounce(this.autocompleteAvailableProperties, 250, false); 

  select(item){
      this.scorecard.property = item;
      this.scorecard.featuredimage = item.featuredimage;
      this.scorecardImageUrl = this.scorecard.featuredimage.economic_url;
      this.filteredList = [];
  }

  // handleClick(event){
  //  var clickedComponent = event.target;
  //  var inside = false;
  //  do {
  //      if (clickedComponent === this.elementRef.nativeElement) {
  //          inside = true;
  //      }
  //     clickedComponent = clickedComponent.parentNode;
  //  } while (clickedComponent);
  //   if(!inside){
  //       this.filteredList = [];
  //   }
  // }
}
