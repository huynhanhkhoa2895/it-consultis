import { PokemonDto } from "@/dto/pokemon.dto";
import PokemonComponent from "@/components/atoms/Pokemon.component";

type Props = {
  data: PokemonDto[];
};

export default function PokemonListComponent({ data }: Props) {
  return (
    <div className={"grid grid-cols-6 gap-x-16 gap-y-6 p-3"}>
      {data?.map((pokemon: PokemonDto) => (
        <PokemonComponent key={pokemon.name} data={pokemon} />
      ))}
    </div>
  );
}
