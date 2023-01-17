export interface Tipo{    
    base_happiness: any;
    capture_rate: any;
    color: Color;
    egg_groups: Color[];
    evolution_chain: any;
    evolves_from_species: any;
    flavor_text_entries: Flavor_Text_Entries[];
    form_descriptions: any;
    forms_switchable: any;
    gender_rate: 0;
    genera: any;
    generation: any;
    growth_rate: any;
    habitat: any;
    has_gender_differences: boolean;
    hatch_counter: 0;    
    id: 0;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    name: string;
    names: any;
    order: any;
    pal_park_encounters: any;
    pokedex_numbers: any;
    shape: any;
    varieties: any;
}
export interface Color{
    name: string;
    url: string;
}

export interface Flavor_Text_Entries{
    flavor_text: string;
    languaje: any;
    version: any;
}


