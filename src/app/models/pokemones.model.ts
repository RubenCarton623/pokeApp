export interface pokemonAll{
    count: number;
    next: string;
    previous: string,
    results: Name_Url[];
}

export interface Name_Url{
    name: string;
    url: string;
}