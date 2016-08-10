import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router'; 

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button/button'
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

@Component({
  moduleId: module.id,
  selector: 'app-pre-register',
  templateUrl: 'pre-register.component.html',
  styleUrls: ['pre-register.component.css'],
  directives: [ ROUTER_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_LIST_DIRECTIVES ]
})
export class PreRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
