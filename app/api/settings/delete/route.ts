import connectDB from "@/app/lib/mongodb";
import userdb from "@/app/models/user";
import { cookies } from "next/headers";
// import { NextRequest } from "next/server";

export async function POST() {
  try {
    await connectDB();
    const cookie = await cookies();
    const id = cookie.get("usersessionId")?.value;

    if (!id) {
      return Response.json(
        { error: "Missing or invalid user ID" },
        { status: 400 }
      );
    }

    await userdb.findOneAndDelete({ _id: id }, {});

    return Response.json({ message: "Operation successfull" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return Response.json({ error: err.message });
    }
    return Response.json({ error: "An unknown error occurred" });
  }
}
