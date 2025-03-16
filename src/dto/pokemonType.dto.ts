export class PokemonTypeDto {
    name?: string;
    url?: string;
    constructor(init?: Partial<PokemonTypeDto>) {
        Object.assign(this, init);
    }
}