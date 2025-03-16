import ApiResponse from "@/dto/apiResponse.dto";
import { NextResponse } from "next/server";
import { PokemonTypeDetailDto } from "@/dto/pokemonTypeDetail.dto";
import { PokemonDto } from "@/dto/pokemon.dto";
import { API_URL, MAX_VALUE, PARAMS } from "@/config/constant";

export async function GET(request: Request) {
  try {
    const params = new URLSearchParams(request?.url?.split("?")[1]);
    const ids = (params.get(PARAMS.IDS) || "").split(",");
    const page = params.get(PARAMS.PAGE) || "1";
    console.log("test page", request?.url, request?.url?.split("?")[1]);
    const limit = MAX_VALUE.toString();
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const data: ApiResponse<PokemonDto> = {
      next: null,
      previous: null,
      results: [],
      count: 0,
    };
    for (const id of ids) {
      const result: PokemonTypeDetailDto = await fetch(API_URL + `/type/${id}`)
        .then((response) => {
          return response.json();
        })
        .catch((e) => {
          console.log(e);
          return new ApiResponse({
            count: 0,
            next: null,
            previous: null,
            results: [],
          });
        });

      data.results = (data.results || []).concat(
        (result?.pokemon || [])?.map((item) => item.pokemon) || [],
      );
    }

    const result = [...(data.results || [])];

    data.count = result.length || 0;

    data.results = result?.slice(offset, offset + parseInt(limit)) || [];
    return NextResponse.json(data);
  } catch (error) {
    console.error((error as Error)?.message);
    // Return an error response
    return NextResponse.json(
      { message: "Error when call API" },
      { status: 404 },
    );
  }
}
