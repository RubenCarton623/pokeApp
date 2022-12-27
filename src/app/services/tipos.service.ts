import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tipo } from '../models/tipos.model';

@Injectable({
  providedIn: 'root'
})
export class TiposService {
  
  constructor(private http: HttpClient) { }

  getColor(url: string){
    return this.http.get<Tipo>(url);
  }
}
