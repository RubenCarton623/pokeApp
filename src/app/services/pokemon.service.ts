import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {  
  
  private apiURL = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private http: HttpClient) { 
    
  }

  getPokemonId(id: number){
    return this.http.get<Pokemon>(`${this.apiURL}/${id}`);
  }
  getPokemonNombre(nombre: string){
    return this.http.get<Pokemon>(`${this.apiURL}/${nombre}`);
  }
  getPokemon(urlData: string){
    return this.http.get<Pokemon>(urlData);
  }

}
