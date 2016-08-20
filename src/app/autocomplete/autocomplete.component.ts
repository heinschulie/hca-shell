import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input'
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';


// Created from a tutorial that can be found here http://4dev.tech/2016/03/tutorial-creating-an-angular2-autocomplete/
@Component({
  moduleId: module.id,
  host: {
      '(document:click)': 'handleClick($event)',
  },
  selector: 'app-autocomplete',
  templateUrl: 'autocomplete.component.html',
  styleUrls: ['autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  @Output() chooseProperty = new EventEmitter();
  @Input('model') query: any; 

  constructor(myElement: ElementRef) { 
    this.elementRef = myElement;
  }

  ngOnInit() {
  }

  // public query = 'Albania';
  public countries = [ "Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus",
                      "Belgium","Bosnia & Herzegovina","Bulgaria","Croatia","Cyprus",
                      "Czech Republic","Denmark","Estonia","Finland","France","Georgia",
                      "Germany","Greece","Hungary","Iceland","Ireland","Italy","Kosovo",
                      "Latvia","Liechtenstein","Lithuania","Luxembourg","Macedonia","Malta",
                      "Moldova","Monaco","Montenegro","Netherlands","Norway","Poland",
                      "Portugal","Romania","Russia","San Marino","Serbia","Slovakia","Slovenia",
                      "Spain","Sweden","Switzerland","Turkey","Ukraine","United Kingdom","Vatican City"];
  public filteredList = [];
  public elementRef;

  filter() {
    if (this.query !== ""){
        this.filteredList = this.countries.filter(function(el){
            return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
    }else{
        this.filteredList = [];
    }
  }
  
  select(item){
      this.query = item;
      this.filteredList = [];
  }

  handleClick(event){
   var clickedComponent = event.target;
   var inside = false;
   do {
       if (clickedComponent === this.elementRef.nativeElement) {
           inside = true;
       }
      clickedComponent = clickedComponent.parentNode;
   } while (clickedComponent);
    if(!inside){
        this.filteredList = [];
    }
  }

}
