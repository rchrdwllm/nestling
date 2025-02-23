import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { pathname, tags }: { pathname: string; tags: string[] } =
      await req.json();

    if (pathname) {
      revalidatePath(pathname);
    } else if (tags) {
      tags.forEach((tag) => {
        revalidateTag(tag);
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error || "Error revalidating path" },
      { status: 500 }
    );
  }
}
