import { PokemonDto } from "@/dto/pokemon.dto";
import Image from "next/image";
type Props = {
  data: PokemonDto;
};
export default function PokemonComponent({ data }: Props) {
  const id = data?.url?.split("/")[6];
  return (
    <div className={"flex flex-col gap-3 items-center justify-center border"}>
      <span>{data.name}</span>
      <Image
        width={35}
        height={53}
        className={"w-20"}
        alt={data.name || "Pokemon"}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`}
        unoptimized
      />
      <span>Number: {id}</span>
    </div>
  );
}
