import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { animate, trigger, style, state, transition } from '@angular/animations';
import { IMAGES_SIZES } from '../../constants/images-sizes';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  animations: [trigger('fade', [state('void', style({ opacity: 0 })), transition('void <=> *', [animate('1s')])])]
})
export class SliderComponent {
  @Input() items: Movie[] = [];
  @Input() isBanner: boolean = false;
  readonly imagesSizes = IMAGES_SIZES;

  currentSlideIndex: number = 0;

  ngOnInit(): void {
    if (!this.isBanner) {
      setInterval(() => {
        this.currentSlideIndex = ++this.currentSlideIndex % this.items.length;
      }, 5000);
    }
  }
}
