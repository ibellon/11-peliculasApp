import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CarteleraResponse, Movie} from '../interfaces/cartelera-response';
import { CreditsResponse } from '../interfaces/credits-response';
import { MovieResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl:string = "https://api.themoviedb.org/3/";
  private carteleraPage = 1;
  
  public cargando:boolean = false;

  constructor(private http: HttpClient) { }

  get params() {
    return {
      api_key: 'eb72e16614b682a8594092bee0978310',
      language: 'es-ES',
      page: this.carteleraPage
    }
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]> {
    
    if(this.cargando) {
      return new Observable<Movie[]>();
    }

    console.log("Cargando API Movies");

    this.cargando = true;

    return this.http.get<CarteleraResponse>(
      this.baseUrl+"movie/now_playing", {params: this.params})
      .pipe(
        map((resp) => resp.results),
        tap(() => {
          this.carteleraPage++;
          this.cargando = false;
        }));
  }

  buscarPeliculas(texto: string): Observable<Movie[]> {

    const params = {...this.params,  query: texto, page: '1'};
   
    return this.http.get<CarteleraResponse>(
      this.baseUrl+"search/movie", {params})
      .pipe(map((resp) => resp.results));
  
  }

  getPeliculaDetalle(id: string) {
    return this.http.get<MovieResponse>(
      this.baseUrl+"movie/"+id, {params: this.params})
      .pipe(
          catchError(error => of(null))
      );
  }

  getCredits(id: string) {
    return this.http.get<CreditsResponse>(
      this.baseUrl+"movie/"+id+"/credits", {params: this.params})
      .pipe(
        map(result => result.cast),
        catchError(error => of([])),
      );
  }
}
