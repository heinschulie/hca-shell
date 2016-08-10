import { Component, OnInit } from '@angular/core';
import { NgForm }    from '@angular/forms';
import { FORM_DIRECTIVES } from '@angular/forms'
import { Router, ROUTER_DIRECTIVES } from '@angular/router'; 

import { MdButton } from '@angular2-material/button/button'
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon'
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input'

import { CommonService } from '../shared'; 
import { UserStateService } from '../shared'; 
import { User } from '../shared';
// import { ImageUploaderComponent } from '../image-uploader'; 

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
  directives: [ ROUTER_DIRECTIVES, MdButton, MdIcon, MD_INPUT_DIRECTIVES, FORM_DIRECTIVES ] //, ImageUploaderComponent
})
export class RegisterComponent implements OnInit {

  model : User = this.common.userScaffold(); 
  submitted = false;

  constructor(private router : Router, private common : CommonService, private userState : UserStateService) {}

  ngOnInit() {
  }

  onSubmit() { 
    if(this.userState.validateUser(this.model)){
      this.userState.createUser(this.model).subscribe((result) => {
        if (result) {
          console.log("Register success: " + result); 
          this.router.navigate(['/postregister']);
        }
      });
    }
  }

}
