export interface Pokemon{
    abilities: Abilities[];
    base_experience: number;
    forms: Name_Url;
    game_indices: Game_Indices[];
    height: number;
    held_items: Held_Items[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Moves[];
    name: string;
    order: number;
    past_types: Past_Types[];
    species: Name_Url;
    sprites: Sprites;
    stats: Stats[];
    types: Types[];
    weight: number;
}

export interface Name_Url{
    name: string;
    url: string;
}

export interface Abilities{
    ability: Name_Url;    
    is_hidden: boolean;
    slot: number;
}
export interface Game_Indices{
    game_index: number;
    version: Name_Url;
}

export interface Held_Items{
    item: Name_Url;
    version_details: Version_Details;
}

export interface Version_Details{
    rarity: number;
    version: Name_Url;
}
export interface Moves{
    move: Name_Url;
    version_group_details: Version_Group_Details[];
}

export interface Version_Group_Details{
    level_learned_at: number;
    move_learn_method: Name_Url;
    version_group: Name_Url;
}

export interface Past_Types{
    generation: Name_Url;
    types: Types[];
}

export interface Types{
    slot: number;
    type: Name_Url;
}
export interface Sprites{
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
    other: Other_Sprites;
    versions: Versions;
}
export interface Other_Sprites{
    dream_world: Dream_World;
    home: Home;
    'official-artwork': Official_Artwork;
}
export interface Dream_World{
    front_default: string;
    front_female: string;
}
export interface Home{
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
}
export interface Official_Artwork{
    front_default: string;
}
export interface Versions{
    generation_i: Generation_i;
    generation_ii: Generation_ii;
    generation_iii: Generation_iii;
    generation_iv: Generation_iv;
    generation_v: Generation_v;
    generation_vi: Generation_vi;
    generation_vii: Generation_vii;
    generation_viii: Generation_viii;
}

export interface Generation_i{
    red_blue: Generationi_Types;
    yellow: Generationi_Types;
}
export interface Generation_ii{
    crystal: Generationii_Types_Crystal;
    gold: Generationii_Types_Gold_Silver;
    silver: Generationii_Types_Gold_Silver;
}

export interface Generation_iii{
    emerald: Emerald;
    firered_leafgreen: Firered_Leafgreen_Ruby_Sapphire;
    ruby_sapphire: Firered_Leafgreen_Ruby_Sapphire;
}
export interface Generation_iv{
    diamond_pearl: Generationvi_Types_Diamond_Pearl_Heartgold_Soulsilver;
    heartgold_soulsilver: Generationvi_Types_Diamond_Pearl_Heartgold_Soulsilver;
    platinum: Generationvi_Types_Diamond_Pearl_Heartgold_Soulsilver;
}

export interface Generation_v{
    black_white: Black_White;
}

export interface Generation_vi{
    omegaruby_alphasapphire: Omegaruby_Alphasapphire;
    x_y: Omegaruby_Alphasapphire;
}

export interface Generation_vii{
    icons: Icons;
    ltra_sun_ultra_moon: Omegaruby_Alphasapphire;
}
export interface Generation_viii{
    icons: Icons;
}

export interface Icons{
    front_default: string;
    front_female: string
}
export interface Omegaruby_Alphasapphire{
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
}

export interface Black_White extends Generationvi_Types_Diamond_Pearl_Heartgold_Soulsilver{
    animated: Generationvi_Types_Diamond_Pearl_Heartgold_Soulsilver;
}

export interface Generationvi_Types_Diamond_Pearl_Heartgold_Soulsilver{
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
}


export interface Emerald{
    front_default: string;
    front_shiny: string;
}

export interface Firered_Leafgreen_Ruby_Sapphire{
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
}


export interface Generationii_Types_Crystal{
    back_default: string;
    back_shiny: string;
    back_shiny_transparent: string;
    back_transparent: string;
    front_default: string;
    front_shiny: string;
    front_shiny_transparent: string;
    front_transparent: string;
}

export interface Generationii_Types_Gold_Silver{
    back_default: string;
    back_shiny: string;    
    front_default: string;
    front_shiny: string;    
    front_transparent: string;
}


export interface Generationi_Types{
    back_default: string;
    back_gray: string;
    back_transparent: string;
    front_default: string;
    front_gray: string;
    front_transparent: string
}

export interface Stats{
    base_stat: number;
    effort: number;
    stat: Name_Url;
}

