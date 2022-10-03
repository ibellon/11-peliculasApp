import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarteleraResponse } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http: HttpClient) { }

  getCartelera(): Observable<CarteleraResponse> {
    return this.http.get<CarteleraResponse>("https://api.themoviedb.org/3/movie/now_playing?api_key=eb72e16614b682a8594092bee0978310&language=es-ES&page=1");
  }
}
