import { Component, OnInit, Input } from '@angular/core';
import { Scorecard } from '../shared/models/scorecard'; 
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';

@Component({
  moduleId: module.id,
  selector: 'app-detail-card',
  templateUrl: 'detail-card.component.html',
  styleUrls: ['detail-card.component.css'],
  directives: [
    MD_ICON_DIRECTIVES]
})
export class DetailCardComponent implements OnInit {

  @Input() scorecard: Scorecard; 

  constructor() { }

  ngOnInit() { }

}
