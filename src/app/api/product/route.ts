import { NextResponse } from "next/server";

export function GET(request: Request) {
    const product = {
        name: "bike",
        price: 1000,
    };
    return NextResponse.json(product);
}
