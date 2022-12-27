import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Pokemon} from '../../models/pokemon.model';
import { pokemonAll} from '../../models/pokemones.model';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonesService} from '../../services/pokemones.service';
import { TiposService } from '../../services/tipos.service';
import { Tipo } from 'src/app/models/tipos.model';

@Component({
  selector: 'app-pokemones',
  templateUrl: './pokemones.component.html',
  styleUrls: ['./pokemones.component.scss']
})
export class PokemonesComponent implements OnInit {
    
  detalles_pokemon = false;
  offset=0;
  limit=20;  

  pokemon: Pokemon[] = [];

  pokemonesMostrar: Pokemon[] = [];
  cantidadDatosGuardados = this.verificarMayor;  

  verificarMayor(){
    var guardar = 0;
    if(this.offset < this.limit){
      guardar = this.limit - this.offset;
    }else if (this.limit < this.offset){
      guardar =  this.offset - this.limit;
    }else{
      guardar = this.limit;
    }
    return guardar;
  }
    
  nextPag(numero: number){
    if(numero <= 1154){
      this.eliminarElemento();
      this.offset = numero;   
      this.datosPokemonApi(); 
    }
  }

  volverPag(numero: number){
    if(numero >= 0){
      this.eliminarElemento();
      this.offset = numero;
      this.datosPokemonApi();
    }    
  }
  cantidadPokemonesTotales = 1154;
  numeroPagTotales = this.cantidadPokemonesTotales/this.limit;
  numeroPagActual = this.offset/this.limit;


  datosPokemonApi(){
    // var cantidad = this.limit*4;            
    this.pokemonesService.allPokemones(this.offset,this.limit)
      .subscribe(data => {        
        this.pokemones = data;                     
        for(var i=0; i<this.limit;i++){                
          this.pokemonService.getPokemon(this.pokemones.results[i].url)
          .subscribe(data => {                        
           this.pokemon.push(data);           
           
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
    this.datosPokemonApi();     
  }
  aplastarPokemon(){
    this.detalles_pokemon = !this.detalles_pokemon;
  }
  tiposSeleccionado: Tipo[] = [];

  mostrarPokemon(id: number){
    this.about = true;
    this.pokemonService.getPokemonId(id)
      .subscribe(data => {      
        this.aplastarPokemon();
        this.pokemonSeleccionado = data;

        this.tiposService.getColor(this.pokemonSeleccionado.species.url)
            .subscribe(data =>{
              this.tiposSeleccionado.push(data);
            });  
      });
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
    this.about = true;
    this.baseStats = false;
    this.evolution = false;
    this.moves = false;
  }
  activarBaseStats(){
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
    this.about = false;
    this.baseStats = false;
    this.evolution = false;
    this.moves = true;
  }
  pokemonSeleccionado: Pokemon = {
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
