export class PokemonDto {
    name?: string;
    url?: string;
    constructor(init?: Partial<PokemonDto>) {
        Object.assign(this, init);
    }
}