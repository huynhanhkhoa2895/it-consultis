import { PokemonTypeDto } from "@/dto/pokemonType.dto";

type Props = {
  data: PokemonTypeDto;
  onChooseType: (type: string | undefined) => void;
};
export default function PokemonTypeComponent({ data, onChooseType }: Props) {
  const id = data?.url?.split("/")[6];
  return (
    <button
      onClick={() => onChooseType(id)}
      type={"button"}
      className={"p-3 border cursor-pointer"}
    >
      <span>{data.name}</span>
    </button>
  );
}
