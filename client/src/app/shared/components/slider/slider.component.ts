import {Component, Input, OnInit} from '@angular/core';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent  implements OnInit{
@Input() images: any[];
autoPlay = true;
  selectedIndex = 0;
slideInterval = 3000;
intervalId;
  ngOnInit() {
    if (this.autoPlay) {
      this.autoSlideImages();
    }
  }
autoSlideImages() {

   this.intervalId = setInterval(() => {
      this.onNextClickAutoPlay(this.selectedIndex);
    }, this.slideInterval)

}

  onPrevClick(i: number) {
    if (this.selectedIndex > 0) {
      this.selectedIndex = i - 1;
    }
  }
  onNextClickAutoPlay(i: number) {
    if (this.selectedIndex === this.images.length - 1) {
      this.slideInterval *=  -1;
    } else if (this.selectedIndex === 0 &&  this.slideInterval < 0) {
      this.slideInterval *=  -1;
    }
      this.selectedIndex += this.slideInterval > 0 ? 1 : -1;

  }
  onNextClick(i : number) {
    if (this.selectedIndex < this.images.length - 1) {
      this.selectedIndex = i + 1;
    }
  }
  onUserInteraction() {
    this.autoPlay = false;
    clearInterval(this.intervalId);
  }

}
