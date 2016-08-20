import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { MediaStateService } from '../shared'; 
import { Media } from '../shared'; 



export enum Direction {UNKNOWN, NEXT, PREV}

@Component({
  moduleId: module.id,
  selector: 'app-image-carousel',
  templateUrl: 'image-carousel.component.html',
  styleUrls: ['image-carousel.component.css'],
  directives: [ MD_ICON_DIRECTIVES ]
})
export class ImageCarouselComponent {
    
    @Input() images = []; 
    visibleIndex = 0; 
    currentLeft = 0; 
    increment = 100; 
    
    constructor(private mediaState: MediaStateService) {
                this.mediaState.media$.subscribe(
                  media => { 
                    this.setMediaOnCarousel(media); 
                  }); 
              }

    setMediaOnCarousel(media){
        let reqIndex; 
        this.images.forEach((amedia, index) => {
            if(amedia._id === media._id)
                reqIndex = index; 
        });
        if(typeof reqIndex !== 'undefined'){
            this.visibleIndex = reqIndex;
            this.currentLeft = this.visibleIndex*this.increment*-1; 
        }
    }

    moveBack() {
        if(this.visibleIndex > 0){
            this.visibleIndex--; 
            this.currentLeft = this.currentLeft + this.increment; 
        }
    }
    moveForward() {
        if(this.visibleIndex < this.images.length - 1){
            this.visibleIndex++; 
            this.currentLeft = this.currentLeft - this.increment; 
        }
    }
}
