import { Injectable } from '@angular/core';
import { pokemonAll } from '../models/pokemones.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonesService {
  private apiURL = 'https://pokeapi.co/api/v2/pokemon/?offset=';
  private apiURLEnd = '&limit='; 
  
  constructor(private http: HttpClient) { 
    
  }

  allPokemones(offset: number, limit: number){
    return this.http.get<pokemonAll>(`${this.apiURL}${offset}${this.apiURLEnd}${limit}`);
  }
}
