import ApiResponse from "@/dto/apiResponse.dto";
import { PokemonTypeDto } from "@/dto/pokemonType.dto";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result: ApiResponse<PokemonTypeDto> = await getPokemon(
      process.env.API_URL + `/type`,
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
