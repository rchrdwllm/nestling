import { pusherServer } from "@/lib/pusher";
import { getOptimisticUser } from "@/lib/user";
import { streamToString } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import querystring from "querystring";

export async function POST(req: NextRequest) {
  const data = await streamToString(req.body);
  const { socket_id } = querystring.parse(data);

  if (!socket_id) {
    return NextResponse.json({ error: "Invalid socket_id" }, { status: 400 });
  }

  const currentUser = await getOptimisticUser();

  const user = {
    id: currentUser.id,
    user_info: {
      ...currentUser,
    },
  };

  const authResponse = pusherServer.authenticateUser(socket_id as string, user);

  return NextResponse.json({ success: authResponse });
}
