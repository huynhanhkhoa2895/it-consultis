import { PokemonTypeDto } from "@/dto/pokemonType.dto";
import { twMerge } from "tailwind-merge";

type Props = {
  data: PokemonTypeDto;
  onSelected: (index?: string) => void;
  listSelected?: string[];
};
export default function PokemonTypeComponent({
  data,
  onSelected,
  listSelected,
}: Props) {
  const id = data?.url?.split("/")[6];
  return (
    <button
      type={"button"}
      onClick={() => onSelected(id)}
      className={twMerge(
        "p-3 border cursor-pointer",
        id && listSelected?.includes(id)
          ? "border-blue-500 bg-blue-500 text-white"
          : "border-gray-500",
      )}
    >
      <span>{data.name}</span>
    </button>
  );
}
