import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DadosService {

  url = "http://localhost:3000/alturas"
  constructor(private http: HttpClient) { }
  
  getDados(): Observable<[]>{
    return this.http.get<[]>(this.url)
  }

}
