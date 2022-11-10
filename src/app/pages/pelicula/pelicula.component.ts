import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { Cast } from 'src/app/interfaces/credits-response';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula: any;
  public cast: any;
  
  constructor(private activatedRoute: ActivatedRoute, 
              private peliculaService: PeliculasService,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    //const {original_title, release_date} = this.activatedRoute.snapshot.params;
    //console.log(id, original_title, release_date);

    combineLatest([
      this.peliculaService.getPeliculaDetalle(id),
      this.peliculaService.getCredits(id)
    ]).subscribe(([pelicula, creditos]) => {
      if(!pelicula){
          this.router.navigateByUrl("/home");
          return;
      }
      this.pelicula = pelicula;
      this.cast = creditos.filter( actor => actor.profile_path !== null);
    });

    // this.peliculaService.getPeliculaDetalle(id).subscribe(result => {
    //   if(!result){
    //     this.router.navigateByUrl("/home");
    //     return;
    //   }
    //   //console.log(result);
    //   this.pelicula = result;
    // });

    // this.peliculaService.getCredits(id).subscribe(result => {
    //   console.log(result);
    //   this.cast = result.filter( actor => actor.profile_path !== null);
    // })
  }

  onRegresar() {
    this.location.back();
  }
}
