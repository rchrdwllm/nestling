import { pusherServer } from "@/lib/pusher";
import { getOptimisticUser } from "@/lib/user";
import { streamToString } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import querystring from "querystring";

export async function POST(req: NextRequest) {
  const data = await streamToString(req.body);
  const { socket_id, channel_name } = querystring.parse(data);

  if (!socket_id) {
    return NextResponse.json({ error: "Invalid socket_id" }, { status: 400 });
  }

  const user = await getOptimisticUser();
  const presenceData = {
    user_id: user.id,
    user_info: { ...user },
  };

  const authResponse = pusherServer.authorizeChannel(
    socket_id as string,
    channel_name as string,
    presenceData
  );

  return NextResponse.json({ success: authResponse });
}
