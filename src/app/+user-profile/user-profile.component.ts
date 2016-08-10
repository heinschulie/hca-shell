import { Component, OnInit } from '@angular/core';
import { NgForm }    from '@angular/forms';
import { FORM_DIRECTIVES } from '@angular/forms'
import { ROUTER_DIRECTIVES } from '@angular/router'; 

import { MdButton } from '@angular2-material/button/button'
import { MdCard } from '@angular2-material/card/card'
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon'
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input'

import { CommonService } from '../shared'; 
import { UserStateService } from '../shared'; 
import { User } from '../shared';
import { ImageUploaderComponent } from '../image-uploader'; 

@Component({
  moduleId: module.id,
  selector: 'app-user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.css'],
  directives: [ ROUTER_DIRECTIVES, MdCard, MdButton, MdIcon, MD_INPUT_DIRECTIVES, FORM_DIRECTIVES , ImageUploaderComponent ] //
})
export class UserProfileComponent implements OnInit {

  model : User;
	errorMessage: any;

  constructor(private common : CommonService, private userState : UserStateService) {}

  ngOnInit() { 
    this.userState.user$.subscribe(
			user => { this.model = user; },
			error => this.errorMessage = <any>error); // subscribe to anatomy
  }

  onSubmit() { 
    if(this.userState.validateUser(this.model)){
      this.userState.updateUser(this.model).subscribe((result) => {
        if (result) {
          console.log("Update success: " + result); 
        }
      });
    }
  }

  onImageChange($event){
    this.model.image = $event; 
  }
}
