import { PokemonDto } from "@/dto/pokemon.dto";

export class PokemonTypeDetailDto {
  name?: string;
  pokemon?: {
    pokemon: PokemonDto;
    slot: number;
  }[];
  constructor(init?: Partial<PokemonTypeDetailDto>) {
    Object.assign(this, init);
  }
}
