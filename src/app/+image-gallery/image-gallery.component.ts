import { Component, OnInit } from '@angular/core';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';

@Component({
  moduleId: module.id,
  selector: 'app-image-gallery',
  templateUrl: 'image-gallery.component.html',
  styleUrls: ['image-gallery.component.css'],
  directives: [
    MD_CARD_DIRECTIVES, 
    MD_LIST_DIRECTIVES,
    MD_GRID_LIST_DIRECTIVES, 
    MD_BUTTON_DIRECTIVES, 
    MD_ICON_DIRECTIVES]
})
export class ImageGalleryComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
