import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tipo } from '../interfaces/tipos.interface';
import { Evolucion } from '../interfaces/evolucion.interface';

@Injectable({
  providedIn: 'root'
})
export class TiposService {
  
  constructor(private http: HttpClient) { }

  getColor(url: string){
    return this.http.get<Tipo>(url);
  }
  getUrl(url: string){
    return this.http.get<Evolucion>(url);
  }
}
