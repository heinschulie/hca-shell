import { Component, OnInit } from '@angular/core';
import { NgForm, FORM_DIRECTIVES }    from '@angular/forms';
import { Router, ROUTER_DIRECTIVES } from '@angular/router'; 
import { UserStateService } from '../shared'; 

import {MdButton} from '@angular2-material/button/button'
import {MdIcon, MdIconRegistry} from '@angular2-material/icon/icon'
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input/input'

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [ MdButton, MdIcon, MD_INPUT_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ]
})
export class LoginComponent implements OnInit {

  constructor(private userState: UserStateService, private router: Router) {}
 
  email : string; 
  password: string; 

  ngOnInit() {
  }

  onSubmit(email, password) {
    this.userState.login(email, password).subscribe((result) => {
      if (result) {
        console.log("Success I think: " + result); 
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
