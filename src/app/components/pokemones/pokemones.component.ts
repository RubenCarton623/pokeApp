import { Component, Input, OnInit, Output, EventEmitter,OnChanges} from '@angular/core';
import { Pokemon} from '../../core/interfaces/pokemon.interface';
import { pokemonAll} from '../../core/interfaces/pokemones.interface';
import { PokemonService } from '../../core/services/pokemon.service';
import { PokemonesService} from '../../core/services/pokemones.service';
import { TiposService } from '../../core/services/tipos.service';
import { Tipo } from 'src/app/core/interfaces/tipos.interface';
import { Evolucion } from '../../core/interfaces/evolucion.interface';

@Component({
  selector: 'app-pokemones',
  templateUrl: './pokemones.component.html',
  styleUrls: ['./pokemones.component.scss']
})
export class PokemonesComponent implements OnInit,OnChanges {
  display = 'none';
  detalles_pokemon = false;
  Skeleton = false;
  contadorToSkeleton = 1;
  offset=0;
  limit=20;  
  valoresEsqueleto: number[] = [];
  pokemon: Pokemon[] = [];
  pokemonesMostrar: Pokemon[] = [];  
  total = 0;
  
  ngOnChanges(): void {

  }
      
  nextPag(numero: number){        
    if(numero <= 1154){
      this.eliminarElemento();      
      this.offset = numero;                                                     
        var conteo = numero;        
        var total = conteo+this.limit;        
        this.pokemonesMostrar.length = this.pokemonesMostrar.length - this.limit;            
        for(conteo;conteo<total;conteo++){                    
          this.pokemonesMostrar.push(this.pokemon[conteo]);                       
        }                       
    }
  }
  
  volverPag(numero: number){               
    if(numero >= 0){
      this.eliminarElemento();
      this.offset = numero;
      var conteo = this.offset;      
      this.pokemonesMostrar.length = this.pokemonesMostrar.length - this.limit;
      for(conteo; conteo<(this.offset+this.limit);conteo++){
      this.pokemonesMostrar.push(this.pokemon[conteo]);          
      }
    }else{console.log('Ya no hay pokemones anteriores')} 
  }
  cantidadPokemonesTotales = 1154;
  numeroPagTotales = this.cantidadPokemonesTotales/this.limit;
  numeroPagActual = this.offset/this.limit;

  datosPagAvanzar(){
    var cantidad = this.limit*4;                
    this.pokemonesService.allPokemones(this.offset,cantidad)
      .subscribe(data => {        
        this.pokemones = data;                     
        for(var i=0; i<cantidad;i++){                
          this.pokemonService.getPokemon(this.pokemones.results[i].url)
          .subscribe(data => {                        
           this.pokemon.push(data);                                           
          });                  
        }                               
      }); 

  }
  datosPokemonApi(){    
    var cantidad = this.limit*4;                
    var contador = 0;
    var contador2 = 0;    
    var cantidadAnterior = 0;        
      cantidadAnterior = 0;
      cantidad = cantidad +this.offset;          
    this.pokemonesService.allPokemones(cantidadAnterior,this.cantidadPokemonesTotales)
      .subscribe(data => {        
        this.pokemones = data;                     
        for(var i=0; i<this.cantidadPokemonesTotales;i++){  
          this.contadorToSkeleton++;              
          this.pokemonService.getPokemon(this.pokemones.results[i].url)
          .subscribe(data => {                        
           this.pokemon.push(data);                                
           contador2++;            
           if(contador<this.limit && contador2>this.offset){ 
            contador++;              
            this.pokemonesMostrar.push(data);                        
           }
          });                  
        }                               
      });         
  }
          
  eliminarElemento(){
    var pokemon = document.querySelectorAll(".pokemon");
			for (let i = 0; i < pokemon.length; i++) {
        pokemon[i].remove();// remueve o elimina un elemento de mi doc html
			}    
  }

  pokemones: pokemonAll = {
    count: 1154,
    next: '',
    previous: '',
    results: [{
      name: '',
      url: ''      
    }]    
  };
  

  constructor(private pokemonesService: PokemonesService, private pokemonService: PokemonService, private tiposService: TiposService){
    
  }
  
  ngOnInit(): void {            
    for(var i =0;i<this.limit;i++){
      this.valoresEsqueleto.push(i);
    }    
    this.datosPokemonApi();         
    setTimeout(()=>{ 
      this.display = "grid"; 
    this.Skeleton = true;
    var pokemon = document.querySelectorAll(".eliminar");
			for (let i = 0; i < pokemon.length; i++) {
        pokemon[i].remove();// remueve o elimina un elemento de mi doc html
			}
    }, 2000);

    
  }
  level1 = 0;
  level2 = 0;
  aplastarPokemon(){
    this.level1 = 0;
    this.level2 = 0;
    this.megaEvolucion = false;
    this.evolucion3 = false;
    this.nombre1 = "";
    this.nombre2 = "";
    this.nombre3 = "";
    this.nombre4 = "";
    this.name1 = "";
    this.name2 = "";
    this.name3 = "";
    this.name4 = "";
    this.detalles_pokemon = !this.detalles_pokemon;
  }
  tiposSeleccionado: Tipo[] = [];

  ceros = '';
  mostrarPokemon(id: number){
    this.total = 0;
    this.about = true;
    this.pokemonService.getPokemonId(id)
      .subscribe(data => {      
        this.aplastarPokemon();
        this.pokemonSeleccionado = data;        
        var x = this.pokemonSeleccionado.id+'';        
        this.ponerCeros(x);
        this.pokemonSeleccionado.height = this.convertirMetro(this.pokemonSeleccionado.height)
        this.convertirPie(this.pokemonSeleccionado.height);
        this.pokemonSeleccionado.weight = this.pokemonSeleccionado.weight/10;
        this.convertirLibras(this.pokemonSeleccionado.weight);
        this.tiposSeleccionado.length = this.tiposSeleccionado.length - this.tiposSeleccionado.length;           
        for(var i =0;i<this.pokemonSeleccionado.stats.length;i++){
            this.total = this.total + this.pokemonSeleccionado.stats[i].base_stat;
        }
        
        this.tiposService.getColor(this.pokemonSeleccionado.species.url)
            .subscribe(data =>{
              this.tiposSeleccionado.push(data);                             
              this.tiposSeleccionado[0].flavor_text_entries[6].flavor_text = this.reemplazar(this.tiposSeleccionado[0].flavor_text_entries[6].flavor_text);
              this.tiposSeleccionado[0].flavor_text_entries[6].flavor_text = this.capitalizar(this.tiposSeleccionado[0].flavor_text_entries[6].flavor_text);              
              this.verificarPokemonSeleccionado(this.tiposSeleccionado[0]);
            });  
      });
      
  }
  libras = 0;
  convertirLibras(numero: number){
    numero = numero*2.20462;
    var valor = numero.toFixed(2);
    this.libras = Number(valor);
  }
  convertirMetro(numero: number){
    var metros = 0;
    metros = numero*0.1;
    var metro = metros.toFixed(2);
    metros = Number(metro);
    return metros;
  }
  pieP = '';
  convertirPie(numero: number){    
    var pie = numero/0.3048;
    var pie1 = pie.toFixed();
    var decimales =  pie - Number(pie1);    
    this.pieP = pie1+"'"+(decimales/0.0833).toFixed(1)+"''";
  }

  ponerCeros(x: string){
    if(x.length==1){
      this.ceros = '0000';
    }else if(x.length==2){
      this.ceros = '000';
    }else if(x.length==3){
      this.ceros = '00';
    }else if(x.length==4){
      this.ceros = '0';
    }else if(x.length==5){
      this.ceros = '';
    }
  }


  reemplazar(texto: string){
    var cEspecial = "!@#$^&%*()+=-[]\/{}|<>?";
    for(var i=0;i<cEspecial.length;i++){
      texto = texto.replace(new RegExp("\\" +
      cEspecial[i],'gi'),'');
    }
    texto = texto.toLocaleLowerCase();    
    texto = texto.replace(/\f/gi,"");
    texto = texto.replace(/\n/gi,"");
    
    return texto;
  }
  
  
  capitalizar(frase: string){
    var indice = 0;
    var indicepunto = frase.indexOf('.',indice);    
    var frase2 ='';
    while (indicepunto >=0) {      
      // El primer carácter es en mayúsculas
      frase2 = frase2 +" "+frase.substring(indice,indice+1).toUpperCase() ;
      // Pegamos el resto hasta el primer punto	
      frase2 = frase2 + frase.substring(indice+1,indicepunto+1);

      indice = indicepunto + 1;		
      indicepunto = frase.indexOf('.',indice);
    }
    

    return frase2;
  }
  color = 'blue';
  llamarColor(color2: string){
    this.color = color2;
  }


  about = false;
  baseStats = false;
  evolution = false;
  moves = false; 
  activarAbout(){    
    this.activadorContenedorIntermno = false;
    this.about = true;
    this.baseStats = false;
    this.evolution = false;
    this.moves = false;
    
  }
  activarBaseStats(){
    this.activadorContenedorIntermno = false;
    this.about = false;
    this.baseStats = true;
    this.evolution = false;
    this.moves = false;
  }
  activarEvolution(){
    this.about = false;
    this.baseStats = false;
    this.evolution = true;
    this.moves = false;
  }
  activarMoves(){
    this.activadorContenedorIntermno = false;
    this.about = false;
    this.baseStats = false;
    this.evolution = false;
    this.moves = true;
  }

  activadorContenedorIntermno = false;
  screenEvolution(){
    this.activadorContenedorIntermno = false;
    if(this.evolution){
      this.activadorContenedorIntermno = true;
    }
  }
  nombre1 = "";
  nombre2 = "";        
  nombre3 = "";
  nombre4 = "";
  name1 = "";
  name2 = "";        
  name3 = "";
  name4 = "";
  evolucion2 = false;
  evolucion3 = false;
  //Evolucion
  verificarPokemonSeleccionado(pokemon: Tipo){     
    this.evolucion2 = false; 
    this.evolucionVacio.length = this.evolucionVacio.length - this.evolucionVacio.length;    
    this.tiposService.getUrl(pokemon.evolution_chain.url)
    .subscribe(data =>{            
      this.evolucionVacio.push(data);           
      var url = "";
      this.nombre1 = this.evolucionVacio[0].chain.species.name;    
      console.log(this.nombre1);
 
      for(var i = 0; i< this.pokemon.length; i++){
        if(this.pokemon[i].name == this.evolucionVacio[0].chain.species.name){          
          this.nombre1 = this.pokemon[i].sprites.other['official-artwork'].front_default;          
          this.name1 = this.pokemon[i].name;    
          if(this.evolucionVacio[0].chain.evolves_to[0].evolution_details[0].min_level != null){
            this.level1 = this.evolucionVacio[0].chain.evolves_to[0].evolution_details[0].min_level;
          }             
        }        
        
        if(this.evolucionVacio[0].chain.evolves_to[0] != null){
          if(this.pokemon[i].name == this.evolucionVacio[0].chain.evolves_to[0].species.name){                 
            this.name2 = this.pokemon[i].name;
            this.nombre2 = this.pokemon[i].sprites.other['official-artwork'].front_default; 
            
            this.evolucion2 = true;           
            if(this.evolucionVacio[0].chain.evolves_to[0].evolves_to[0] != null){
              if(this.evolucionVacio[0].chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level != null){
                this.level2 = this.evolucionVacio[0].chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level;
              }        
            }            
          }
          if(this.evolucionVacio[0].chain.evolves_to[0].evolves_to[0] != null){
            if(this.pokemon[i].name == this.evolucionVacio[0].chain.evolves_to[0].evolves_to[0].species.name && this.evolucionVacio[0].chain.evolves_to[0].evolves_to.length>0){
              this.name3 = this.pokemon[i].name;
              this.nombre3 = this.pokemon[i].sprites.other['official-artwork'].front_default;
              this.evolucion3 = true;
              url = this.evolucionVacio[0].chain.evolves_to[0].evolves_to[0].species.url;
            }
          }else{
            url = this.evolucionVacio[0].chain.evolves_to[0].species.url;       
            this.nombre3 = this.nombre2; 
            this.name3 = this.name2;     
          }
        }else{
          url = this.evolucionVacio[0].chain.species.url;
        }      
      }      
      console.log(this.nombre1);      
      console.log(this.nombre2);      
      console.log(this.nombre3);      

      var megaPoke = this.crearPokemonVacio();
      this.mega.length = this.mega.length -this.mega.length;
      this.tiposService.getColor(url)
      .subscribe(data =>{            
        this.mega.push(data);
        if(this.mega[0].varieties[1] != null){   
          this.megaEvolucion = true;       
          this.pokemonService.getPokemon(this.mega[0].varieties[1].pokemon.url)
          .subscribe(data => {      
            this.pokemonMega = data;
            this.nombre4 = this.pokemonMega.sprites.other['official-artwork'].front_default;
            this.name4 = this.pokemonMega.name
            console.log(this.nombre4);  
          });  
        }        
      });  
    });  
  }
  megaEvolucion = false;
  mega: Tipo[] = [];
  evolucionVacio: Evolucion[] = [];    
  pokemonMega = this.crearPokemonVacio();


  pokemonSeleccionado = this.crearPokemonVacio();



    crearPokemonVacio(){
      var pokemonVacio: Pokemon = {
        abilities: [{
          ability: {
            name: '',
            url: ''
          },    
          is_hidden: false,
          slot: 0
        }],
        base_experience: 0,
        forms: {
          name: '',
          url: ''
        },
        game_indices: [{
          game_index: 0,
          version: {
            name: '',
            url: ''
          }
        }],
        height: 0,
        held_items: [{
          item: {
            name: '',
            url: ''
          },
          version_details: {
            rarity: 0,
            version: {
              name: '',
              url: ''
            }
          }
        }],
        id: 0,
        is_default: false,
        location_area_encounters: '',
        moves: [{
          move: {
            name: '',
            url: ''
          },
          version_group_details: [{
            level_learned_at: 0,
            move_learn_method: {
              name: '',
              url: ''
            },
            version_group: {
              name: '',
              url: ''
            }
          }]
        }],
        name: '',
        order: 0,
        past_types: [{
          generation: {
            name: '',
            url: ''
          },
          types: [{
            slot: 0,
            type: {
              name: '',
              url: ''
            }
          }
          ]
        }],
        species: {
          name: '',
          url: ''
        },
        sprites: {
          back_default: '',
          back_female: '',
          back_shiny: '',
          back_shiny_female: '',
          front_default: '',
          front_female: '',
          front_shiny: '',
          front_shiny_female: '',
          other: { 
            dream_world: {
              front_default: '',
              front_female: ''
            },
            home: {
              front_default: '',
              front_female: '',
              front_shiny: '',
              front_shiny_female: ''
            },
            'official-artwork': {
              front_default: ''
            }
          },
          versions: {
            generation_i: {
              red_blue: {
                back_default: '',
                back_gray: '',
                back_transparent: '',
                front_default: '',
                front_gray: '',
                front_transparent: ''
              },
              yellow: {
                back_default: '',
                back_gray: '',
                back_transparent: '',
                front_default: '',
                front_gray: '',
                front_transparent: ''
              }
            },
            generation_ii: {
              crystal: {
                back_default: '',
                back_shiny: '',
                back_shiny_transparent: '',
                back_transparent: '',
                front_default: '',
                front_shiny: '',
                front_shiny_transparent: '',
                front_transparent: ''
              },
              gold: {
                back_default: '',
                back_shiny: '',   
                front_default: '',
                front_shiny: '',   
                front_transparent: ''
              },
              silver: {
                back_default: '',
                back_shiny: '',   
                front_default: '',
                front_shiny: '',   
                front_transparent: ''
              }
            },
            generation_iii: {
              emerald: {
                front_default: '',
                front_shiny: ''
              },
              firered_leafgreen: {
                back_default: '',
                back_shiny: '',   
                front_default: '',
                front_shiny: ''
              },
              ruby_sapphire: {
                back_default: '',
                back_shiny: '',   
                front_default: '',
                front_shiny: ''
              }
            },
            generation_iv: {
              diamond_pearl: {
                back_default: '',
                back_female: '',
                back_shiny: '',
                back_shiny_female: '',
                front_default: '',
                front_female: '',
                front_shiny: '',
                front_shiny_female: ''
              },
              heartgold_soulsilver: {
                back_default: '',
                back_female: '',
                back_shiny: '',
                back_shiny_female: '',
                front_default: '',
                front_female: '',
                front_shiny: '',
                front_shiny_female: ''
              },
              platinum: {
                back_default: '',
                back_female: '',
                back_shiny: '',
                back_shiny_female: '',
                front_default: '',
                front_female: '',
                front_shiny: '',
                front_shiny_female: ''
              }
            },
            generation_v: {
              black_white: {
                back_default: '',
                back_female: '',
                back_shiny: '',
                back_shiny_female: '',
                front_default: '',
                front_female: '',
                front_shiny: '',
                front_shiny_female: '',
                animated: {
                  back_default: '',
                  back_female: '',
                  back_shiny: '',
                  back_shiny_female: '',
                  front_default: '',
                  front_female: '',
                  front_shiny: '',
                  front_shiny_female: ''
                }
              }
            },
            generation_vi: {
              omegaruby_alphasapphire: {
                front_default: '',
                front_female: '',
                front_shiny: '',
                front_shiny_female: ''
              },
              x_y: {
                front_default: '',
                front_female: '',
                front_shiny: '',
                front_shiny_female: ''
              }
            },
            generation_vii: {
              icons: {
                front_default: '',
                front_female: ''
              },
              ltra_sun_ultra_moon: {
                front_default: '',
                front_female: '',
                front_shiny: '',
                front_shiny_female: ''
              }
            },
            generation_viii: {
              icons: {
                front_default: '',
                front_female: ''
              }
            }
          }
        },
        stats: [
          {
            base_stat: 0,
            effort: 0,
            stat: {
              name: '',
              url: ''
            }
          }
        ],
        types: [{
          slot: 0,
          type: {
            name: '',
            url: ''
          }
        }],
        weight: 0
        };
        return pokemonVacio;
    }

}
