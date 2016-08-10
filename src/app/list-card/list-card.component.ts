import { Component, OnInit, Input } from '@angular/core';
import { Scorecard } from '../shared/models/scorecard'; 
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';

import { Truncate } from '../shared'; 
import { AddressShortenerPipe } from '../shared'; 

@Component({
  moduleId: module.id,
  selector: 'app-list-card',
  templateUrl: 'list-card.component.html',
  styleUrls: ['list-card.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_ICON_DIRECTIVES],
  pipes: [ Truncate, AddressShortenerPipe ]
})
export class ListCardComponent implements OnInit {

  @Input() scorecard: Scorecard; 

  constructor() {}

  ngOnInit() { }

}
