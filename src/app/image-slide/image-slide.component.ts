import {Component, OnInit, OnDestroy, Input, HostBinding } from '@angular/core';

import {ImageCarouselComponent, Direction} from  '../image-carousel';

@Component({
  moduleId: module.id,
  selector: 'app-image-slide',
  templateUrl: 'image-slide.component.html',
  styleUrls: ['image-slide.component.css']
})
export class Slide implements OnInit, OnDestroy {
    
    @Input() public index:number;
    @Input() public direction:Direction;

    @HostBinding('class.active')
    @Input() public active:boolean;

    @HostBinding('class.item')
    @HostBinding('class.carousel-item')
    private addClass:boolean = true;

    constructor(private carousel:ImageCarouselComponent) {
    }

    public ngOnInit() {
        // this.carousel.addSlide(this);
    }

    public ngOnDestroy() {
        // this.carousel.removeSlide(this);
    }
}