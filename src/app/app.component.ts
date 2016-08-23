import { Component, ApplicationRef, OnInit } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES, Router, NavigationEnd } from '@angular/router';

import { CommonService } from './shared'; 
import { PropertyService } from './shared'; 
import { WishlistService } from './shared'; 
import { TitleStateService } from './shared'; 
import { ScorecardService } from './shared'; 
// import { UserService } from './shared'; 

import { PropertyStateService } from './shared'; 
import { ScorecardStateService } from './shared'; 
import { UserStateService } from './shared'; 
import { WishlistStateService } from './shared'; 

import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs'; 
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CHECKBOX_DIRECTIVES } from '@angular2-material/checkbox';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';

import { AuthGuard }     from './shared'; 

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ 
    ROUTER_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MD_TABS_DIRECTIVES, 
    MD_SIDENAV_DIRECTIVES, 
    MD_TOOLBAR_DIRECTIVES, 
    MD_BUTTON_DIRECTIVES, 
    MD_CHECKBOX_DIRECTIVES, 
    MD_ICON_DIRECTIVES ],
  providers: [
    AuthGuard, 
    //CommonService,
    MdIconRegistry,
    //UserService, 
    PropertyStateService, 
    PropertyService, 
    TitleStateService, 
    WishlistService, 
    ScorecardService, 
    ScorecardStateService,
    WishlistStateService
  ]
})
export class AppComponent implements OnInit {
  title : string;
  errorMessage: any; 

    // This constructor code is a temporary fix for this issue: https://github.com/angular/angular/issues/9565
    constructor(public commonService: CommonService, 
                public userState: UserStateService, 
                private titleState: TitleStateService, 
                private _router: Router, 
                private _applicationRef: ApplicationRef) {
        if(this.isMac()) {
            _router.events.subscribe(ev => {
                if(ev instanceof NavigationEnd) {
                    setTimeout(() => {
                        _applicationRef.zone.run(() => _applicationRef.tick())
                    }, 500)
                }
            })
        }
        
    }

    ngOnInit() {
        this.titleState.title$.subscribe(
			data => { this.title = data; },
			error => this.errorMessage = <any>error);
    }

    goBack() {
        window.history.back();
    }

    isMac() {
        if(navigator.userAgent.indexOf('Mac') > -1) {
            return true
        }
        return false
    }

    logout() : void {
        this.userState.logout(); 
    }
}
