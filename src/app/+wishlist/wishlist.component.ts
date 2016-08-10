import { Component, OnInit } from '@angular/core';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';

import { CommonService } from '../shared'; 
import { Wishlist } from '../shared'; 
import { Priority } from '../shared'; 
import { UserStateService } from '../shared'; 
import { WishlistStateService } from '../shared'; 

import { HcaListitemComponent } from '../hca-listitem';

@Component({
  moduleId: module.id,
  selector: 'app-wishlist',
  templateUrl: 'wishlist.component.html',
  styleUrls: ['wishlist.component.css'],
  directives: [ 
    MD_CARD_DIRECTIVES, 
    MD_LIST_DIRECTIVES, 
    MD_BUTTON_DIRECTIVES, 
    MD_ICON_DIRECTIVES, 
    HcaListitemComponent ]
})
export class WishlistComponent implements OnInit {

  constructor(private commonService : CommonService,
              private wishlistState : WishlistStateService) { }

  errorMessage: string;
  wishlist: Wishlist;
  mode = 'Observable';

  ngOnInit() { 
    //Subscribe to wishlistate
    this.wishlistState.wishlist$.subscribe(
			wishlist => { this.wishlist = wishlist; },
			error => this.errorMessage = <any>error);
    //Update wishliststate with user
    
    this.commonService.setTitle("Your Wishlist");
    console.log("Wishlist OnInit")
  }

  zero() {
    this.wishlist.priorities.forEach(pri => {
      pri.weight = 0; 
    })
  }


}
