import ApiResponse from "@/dto/apiResponse.dto";
import { PokemonTypeDto } from "@/dto/pokemonType.dto";
import { APP_URL, MAX_VALUE, PARAMS } from "@/config/constant";
import { PokemonDto } from "@/dto/pokemon.dto";
import Link from "next/link";
import PokemonListComponent from "@/components/atoms/PokemonList.component";
import PokemonTypeListComponent from "@/components/atoms/PokemonTypeList.component";

type PageParams = {
  searchParams: Promise<{
    type: string | undefined;
    page: string | undefined;
  }>;
};

export default async function Home({ searchParams }: PageParams) {
  const params = await searchParams;
  const pokemonType = await getPokemonType();
  const page = parseInt(params?.page || "1");
  const pokemonTypeDetail = await getPokemonTypeDetail(params?.type, page);

  let listProduct: PokemonDto[] = [],
    count = 0;
  if (params?.type) {
    listProduct = pokemonTypeDetail?.results || [];
    count = pokemonTypeDetail.count || 0;
  } else {
    const response = await getPokemon(page);
    listProduct = response?.results || [];
    count = response?.count || 0;
  }
  const maxPage = Math.ceil((count || 0) / MAX_VALUE);

  const generateUrl = (page: number) => {
    const searchParams = new URLSearchParams();
    searchParams.set(PARAMS.TYPE, params?.type || "");
    searchParams.set(PARAMS.PAGE, page.toString());
    return "/?" + searchParams.toString();
  };

  return (
    <main>
      <div className={"flex flex-col gap-3"}>
        <p className={"p-3"}>Total count: {count}</p>
        <PokemonTypeListComponent data={pokemonType?.results || []} />
        <PokemonListComponent data={listProduct || []} />
        <div className={"text-center flex gap-3 items-center justify-center"}>
          {page > 1 && listProduct.length > 0 && (
            <Link
              className={"rounded bg-blue-500 px-4 py-2 text-white"}
              href={generateUrl(page - 1)}
            >
              Previous
            </Link>
          )}

          {page < maxPage && (
            <Link
              className={"rounded bg-blue-500 px-4 py-2 text-white"}
              href={generateUrl(page + 1)}
            >
              Next
            </Link>
          )}
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

const getPokemonTypeDetail = async (
  id?: string,
  page?: number,
): Promise<ApiResponse<PokemonTypeDto>> => {
  return fetch(
    APP_URL + `/api/pokemon-type/detail?ids=${id}` + (page && `&page=${page}`),
  ).then((response) => response.json());
};
const getPokemon = async (page?: number): Promise<ApiResponse<PokemonDto>> => {
  return fetch(APP_URL + `/api/pokemon?page=${page}`).then((response) =>
    response.json(),
  );
};
