import { Component, HostListener, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movies: Movie[];
  public moviesSlideShow: Movie[];

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    const posicion = Number(document.scrollingElement?.scrollTop) * 1.5;
    const maximo = Number(document.scrollingElement?.scrollHeight);

    if(posicion > maximo) {
      if(this.peliculasService.cargando){return;}
      //TODO Llamar al Servicio
      this.peliculasService.getCartelera().subscribe(resp => {
        this.movies.push(...resp);
      });
    }
  }

  constructor(private peliculasService: PeliculasService) { 
    this.movies = [];
    this.moviesSlideShow = [];
  }

  ngOnInit(): void {
    this.peliculasService.getCartelera().subscribe(resp => {
      this.movies = resp;
      this.moviesSlideShow = resp;
    });
  }

}
