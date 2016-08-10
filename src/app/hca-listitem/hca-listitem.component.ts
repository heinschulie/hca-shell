import { Component, OnInit, Input } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { HcaRangeinputComponent } from '../hca-rangeinput';

@Component({
  moduleId: module.id,
  selector: 'app-hca-listitem',
  templateUrl: 'hca-listitem.component.html',
  styleUrls: ['hca-listitem.component.css'],
  directives: [
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault, 
    MD_ICON_DIRECTIVES,
    HcaRangeinputComponent
  ]
})
export class HcaListitemComponent implements OnInit {

  @Input('context') context: string; 
  @Input('model') data: any; 
  // @Input('model-title') title: string; 
  @Input('slidermodel') slidermodel: any; 

  constructor() {
  }

  ngOnInit() {
    console.log("Item Slider model is: " + this.slidermodel);
    console.log("Item model is: " + this.data);
  }

}
