import ApiResponse from "@/dto/apiResponse.dto";
import { PokemonTypeDto } from "@/dto/pokemonType.dto";
import { APP_URL } from "@/config/constant";
import PokemonTypeComponent from "@/components/atoms/PokemonType.component";
import { PokemonDto } from "@/dto/pokemon.dto";
import Link from "next/link";
import PokemonListComponent from "@/components/atoms/PokemonList.component";

type PageParams = {
  searchParams: Promise<{
    type: string | string[] | undefined;
    page: string | undefined;
  }>;
};

export default async function Home({ searchParams }: PageParams) {
  const params = await searchParams;
  const pokemonType = await getPokemonType();
  const page = parseInt(params?.page || "1");
  const pokemon = await getPokemon(page);
  const listProduct = pokemon.results || [];

  const onChooseType = (type: string | undefined) => {
    console.log(type);
  };

  return (
    <main>
      <div className={"flex flex-col gap-3"}>
        <p className={"p-3"}>Total count:</p>
        <div className={"flex flex-wrap items-center justify-center gap-3"}>
          <p>Types: </p>
          {pokemonType.results?.map((type: PokemonTypeDto, index: number) => (
            <PokemonTypeComponent
              onChooseType={onChooseType}
              key={index}
              data={type}
            />
          ))}
        </div>
        <PokemonListComponent data={listProduct} />
        <div className={"text-center flex gap-3 items-center justify-center"}>
          {page > 1 && (
            <Link
              className={"rounded bg-blue-500 px-4 py-2 text-white"}
              href={`/?page=${page - 1}`}
            >
              Previous
            </Link>
          )}

          <Link
            className={"rounded bg-blue-500 px-4 py-2 text-white"}
            href={`/?page=${page + 1}`}
          >
            Next
          </Link>
        </div>
      </div>
    </main>
  );
}

const getPokemonType = async (): Promise<ApiResponse<PokemonTypeDto>> => {
  return fetch(APP_URL + "/api/pokemon-type").then((response) =>
    response.json(),
  );
};

const getPokemon = async (page?: number): Promise<ApiResponse<PokemonDto>> => {
  return fetch(APP_URL + `/api/pokemon?page=${page}`).then((response) =>
    response.json(),
  );
};
