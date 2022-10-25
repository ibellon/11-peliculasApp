import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public textoBuscar:string = "";
  public movies: Movie[] = [];

  constructor(private activatedRoute: ActivatedRoute, 
      private peliculasService: PeliculasService) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(result => {
      this.textoBuscar = result['texto'];
      this.peliculasService.buscarPeliculas(result['texto'])
      .subscribe(movie => {
        this.movies = movie;
      });
    });
  }

}
