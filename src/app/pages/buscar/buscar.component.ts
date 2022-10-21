import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, 
      private peliculasService: PeliculasService) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(result => {
      console.log("parametros", result['texto']);
      this.peliculasService.buscarPeliculas(result['texto'])
      .subscribe(movie => {
        console.log("Movie", movie);
      });
    });
  }

}
