import { Component, OnInit } from '@angular/core';
import { NgForm, FORM_DIRECTIVES }    from '@angular/forms';
import { Router, ROUTER_DIRECTIVES } from '@angular/router'; 

// import { ToastrService } from '../shared'; 
import {MdButton} from '@angular2-material/button/button'
import {MdIcon, MdIconRegistry} from '@angular2-material/icon/icon'
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input/input'
import {MD_PROGRESS_BAR_DIRECTIVES} from '@angular2-material/progress-bar'

import { UserStateService } from '../shared'; 

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [ MdButton, MdIcon, MD_INPUT_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ]
})
export class LoginComponent implements OnInit {

  constructor(private userState: UserStateService, 
              private router: Router) {} //private notifier: ToastrService, 
 
  email : string; 
  password: string; 
  inProgress: boolean; 

  ngOnInit() {
  }

  onSubmit(email, password) {
    // this.notifier.showInfo( 'Logging in...' );
    this.inProgress = true; 
    this.userState.login(email, password).subscribe((result) => {
      if (result) {
        console.log("Success I think: " + result);
        this.inProgress = false;  
        this.router.navigate(['/']);
      }
    });
  }

  testRole() {
    this.userState.testRole().subscribe((result) => {
      if (result) {
        console.log("Role Success I think: " + result); 
        //this.router.navigate(['Home']);
      }
    });
  }

  testAuth() {
    this.userState.testAuth().subscribe((result) => {
      if (result) {
        console.log("Auth Success I think: " + result); 
        //this.router.navigate(['Home']);
      }
    });
  }
}
