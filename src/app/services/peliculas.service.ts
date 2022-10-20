import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { CarteleraResponse, Movie} from '../interfaces/cartelera-response';

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
}
