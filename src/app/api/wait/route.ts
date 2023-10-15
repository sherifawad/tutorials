import { NextResponse } from "next/server";

export async function GET(request: Request) {
    await new Promise((resolve, _) => setTimeout(resolve, 10000));
    return NextResponse.json("Ok");
}
