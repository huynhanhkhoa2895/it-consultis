"use client";
import { PokemonTypeDto } from "@/dto/pokemonType.dto";
import PokemonTypeComponent from "@/components/atoms/PokemonType.component";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PARAMS } from "@/config/constant";
type Props = {
  data: PokemonTypeDto[];
};

export default function PokemonTypeListComponent({ data }: Props) {
  const params = useSearchParams();
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const [listSelected, setListSelected] = useState<string[]>(
    params.get(PARAMS.TYPE)?.split(",") || [],
  );

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      const searchParams = new URLSearchParams();
      searchParams.set(PARAMS.TYPE, listSelected.join(","));
      router.push("/?" + searchParams.toString(), { scroll: true });
    }
  }, [listSelected]);

  const onSelected = (value?: string) => {
    if (value) {
      if (listSelected.includes(value)) {
        setListSelected(listSelected.filter((item) => item !== value));
      } else {
        setListSelected([...listSelected, value]);
      }
    }
  };
  return (
    <div className={"flex flex-wrap items-center justify-center gap-3"}>
      <p>Types: </p>
      {data.map((type: PokemonTypeDto, index: number) => (
        <PokemonTypeComponent
          listSelected={listSelected}
          key={index}
          data={type}
          onSelected={onSelected}
        />
      ))}
    </div>
  );
}
