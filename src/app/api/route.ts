import { NextResponse } from "next/server";
import { authOptions } from "./auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const GET = async (req: Request) => {
    const session = await getServerSession(authOptions);
    return NextResponse.json({ authenticated: !!session });
};
