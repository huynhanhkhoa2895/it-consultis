import { PokemonDto } from "@/dto/pokemon.dto";

export class PokemonTypeDetailDto {
  name?: string;
  pokemon?: PokemonDto[];
  constructor(init?: Partial<PokemonTypeDetailDto>) {
    Object.assign(this, init);
  }
}
