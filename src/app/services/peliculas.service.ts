import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CarteleraResponse } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl:string = "https://api.themoviedb.org/3/";
  private carteleraPage = 1;

  constructor(private http: HttpClient) { }

  get params() {
    return {
      api_key: 'eb72e16614b682a8594092bee0978310',
      language: 'es-ES',
      page: this.carteleraPage
    }
  }

  getCartelera(): Observable<CarteleraResponse> {
    return this.http.get<CarteleraResponse>(
      this.baseUrl+"movie/now_playing", {params: this.params})
      .pipe(tap(() => {
        this.carteleraPage++;
      }));
  }
}
