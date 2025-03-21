import { NextResponse } from "next/server";
import ApiResponse from "@/dto/apiResponse.dto";
import { PokemonTypeDto } from "@/dto/pokemonType.dto";
import { API_URL } from "@/config/constant";

export async function GET() {
  try {
    const result: ApiResponse<PokemonTypeDto> = await getPokemon(
      API_URL + `/type`,
    );
    while (result.next) {
      const nextResult = await getPokemon(result.next);
      result.next = nextResult.next;
      if (nextResult) {
        result.results = (result.results || []).concat(
          nextResult.results || [],
        );
      }
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error((error as Error)?.message);
    // Return an error response
    return NextResponse.json(
      { message: "Error when call API" },
      { status: 404 },
    );
  }
}

const getPokemon = async (
  url: string,
): Promise<ApiResponse<PokemonTypeDto>> => {
  return await fetch(url)
    .then((response) => response.json())
    .catch((e) => {
      console.error(e);
      return new ApiResponse({
        count: 0,
        next: null,
        previous: null,
        results: [],
      });
    });
};
