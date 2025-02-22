import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { pathname } = await req.json();
    if (!pathname) throw new Error("Pathname is required");

    revalidatePath(pathname);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error || "Error revalidating path" },
      { status: 500 }
    );
  }
}
