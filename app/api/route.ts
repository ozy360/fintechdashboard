import connectDB from "@/app/lib/mongodb";
import userdb from "../models/user";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const cookie = await cookies();
    const id = cookie.get("usersessionId")?.value;

    const userData = await userdb.findOne({ _id: id });

    if (userData) {
      return NextResponse.json(userData);
    }

    return NextResponse.json({ error: "Failed to get the user data" });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
