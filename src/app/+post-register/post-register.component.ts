import { Component, OnInit } from '@angular/core';

import { ROUTER_DIRECTIVES } from '@angular/router'; 

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button/button'
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

@Component({
  moduleId: module.id,
  selector: 'app-post-register',
  templateUrl: 'post-register.component.html',
  styleUrls: ['post-register.component.css'],
  directives: [ ROUTER_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_LIST_DIRECTIVES ]
})
export class PostRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
