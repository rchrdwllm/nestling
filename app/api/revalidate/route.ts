import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { pathname } = await req.json();

    revalidatePath(pathname);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error revalidating path" });
  }
}
