import { NextRequest, NextResponse } from "next/server";
import ApiResponse from "@/dto/apiResponse.dto";
import { PokemonDto } from "@/dto/pokemon.dto";

export async function GET(req: NextRequest) {
  try {
    const query: URLSearchParams = new URLSearchParams(req.url?.split("?")[1]);
    const page = query.get("page") || "1";
    const limit = 24;
    const offset = (parseInt(page) - 1) * limit;
    const result: Promise<ApiResponse<PokemonDto>> = await fetch(
      process.env.API_URL + `/pokemon?limit=${limit}&offset=${offset}`,
    )
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
