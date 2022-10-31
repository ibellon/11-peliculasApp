import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula: any;
  
  constructor(private activatedRoute: ActivatedRoute, 
              private peliculaService:PeliculasService,
              private location:Location) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    //const {original_title, release_date} = this.activatedRoute.snapshot.params;
    //console.log(id, original_title, release_date);
    this.peliculaService.getPeliculaDetalle(id).subscribe(result => {
      console.log(result);
      this.pelicula = result;
    });
  }

  onRegresar() {
    this.location.back();
  }
}
