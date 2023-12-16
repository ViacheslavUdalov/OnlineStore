import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  indicators = true;
  selectedIndex: number = 0;
  controls = true;
   autoSlide = true;
   slideInterval = 3000;
images = [
  {
    imageSrc: 'assets/images/hero1.jpg',
    imageALT: "hero 1"
  },
  {
    imageSrc: 'assets/images/hero2.jpg',
    imageALT: "hero 2"
  },
  {
    imageSrc: 'assets/images/hero3.jpg',
    imageALT: "hero 3"
  }
]
  ngOnInit() {
    if (this.autoSlide) {
    this.autoSlideImages();
    }
  }
autoSlideImages() {

    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval)
}
  selectImage(index: number) {
  this.selectedIndex = index;
  }
  onPrevClick() {
  if (this.selectedIndex === 0) {
    this.selectedIndex = this.images.length - 1;
  } else {
    this.selectedIndex--;
  }
  }
  onNextClick() {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }
}
