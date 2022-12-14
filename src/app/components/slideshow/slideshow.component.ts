import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[];
  
  private swiper: Swiper;

  constructor() { 
    this.movies = [];
    this.swiper = new Swiper('.swiper-container');
  }
  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper-container', {
      loop: true,
    });    
  }

  ngOnInit(): void {
  }

  slidePrev() {
    this.swiper.slidePrev();
  }

  slideNext() {
    this.swiper.slideNext();
  }
}
