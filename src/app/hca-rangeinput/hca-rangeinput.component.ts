import { Component, OnInit, Input } from '@angular/core';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';

@Component({
  moduleId: module.id,
  selector: 'app-hca-rangeinput',
  templateUrl: 'hca-rangeinput.component.html',
  styleUrls: ['hca-rangeinput.component.css'],
  directives: [ MD_ICON_DIRECTIVES ]
})
export class HcaRangeinputComponent implements OnInit {

  @Input('context') context: string; 
  @Input('slidermodel') slidermodel;

  constructor() {}

  ngOnInit() {
    console.log("Range Slider model is: " + this.slidermodel);
  }

  slidervalue() : string {
    let value, input;
    if(this.context === 'Wishlist')
      input = this.slidermodel.weight.toString(); 
    else
      input = this.slidermodel.score.toString();

    switch (input)
    {
      case '1' :
        value = -6 ;
        break;
      case '2' :
        value = 17;
        break;
      case '3' :
        value = 40 ;
        break;
      case '4' :
        value = 63.5;
        break;
      case '5' :
        value = 86.5 ;
        break;
      default : value = 2;
    }
    return value + '%'
  }

}
