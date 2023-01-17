import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Pokemon } from '../../core/interfaces/pokemon.interface';
import { TiposService } from '../../core/services/tipos.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit{
  constructor(private tiposService: TiposService){

  }

  imageDefault = "../../assets/imagen/pokebola.png";
  @Output() showPokemon = new EventEmitter<number>();
    detallesPokemon(){
      this.showPokemon.emit(this.pokemon.id);
    }

  @Output() color = new EventEmitter<string>();
  obtenerColor(){
    this.color.emit(this.color2);    
  }

  ngOnInit(): void {
    for(var i=0; i<this.tipos.length;i++){
      if(this.tipos[i].tipo == this.pokemon.types[0].type.name){
        this.color2 = this.tipos[i].color;
      }
      console.log()
    }                
  }
  color2 = '';
  

  tipos = [
    {
    tipo: 'normal',
    color:'#db7807'
    },
    {
      tipo: 'water',
      color:'#0828fc'
    },
    {
      tipo: 'fire',
      color:'#fc080c'
    },
    {
      tipo: 'grass',
      color:'#1eff05'
    },
    {
      tipo: 'electric',
      color:'#e5fa02'
    },
    {
      tipo: 'ice',
      color:'#91fff4'
    },
    {
      tipo: 'dragon',
      color:'#08CDB8'      
    },
    {
      tipo: 'fighting',
      color:'#5d8c87'
    },
    {
      tipo: 'poison',
      color:'#cf0250'
    },
    {
      tipo: 'ground',
      color:'#6e4623'
    },
    {
      tipo: 'flying',
      color:'#a2dbc8'
    },
    {
      tipo: 'psychic',
      color:'#400136'
    },
    {
      tipo: 'bug',
      color:'#61b05a'
    },
    {
      tipo: 'rock',
      color:'#6b696a'
    },
    {
      tipo: 'ghost',
      color:'#6b405e'
    },
    {
      tipo: 'dark',
      color:'#000000'
    },
    {
      tipo: 'sinister',
      color:'#e0c97e'
    },
    {
      tipo: 'steel',
      color:'#b0aaa5'
    },
    {
      tipo: 'fairy',
      color:'#cc99bd'
    }              
];


  @Input() offset=0;
  @Input() limit=0;  
  
  
  @Input() pokemon: Pokemon = {
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
    

    

    // llamarPokemon(){
    //   this.pokemonService.getPokemonId(this.pokemon.id)
    //   .subscribe(data => {
    //     this.pokemon = data;
    //   });
    // }

    // llamarPokemonNombre(){
    //   this.pokemonService.getPokemonNombre(this.pokemon.name)
    //   .subscribe(data => {
    //     this.pokemon = data;        
    //   });
    // }
    
}
