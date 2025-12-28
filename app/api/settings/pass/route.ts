import connectDB from "@/app/lib/mongodb";
import userdb from "@/app/models/user";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.formData();
    const cookie = await cookies();
    const id = cookie.get("usersessionId")?.value;
    const pass = String(data.get("password"));

    const hashedPassword = await bcrypt.hash(pass, 10);

    const updatepass = await userdb.findOneAndUpdate(
      { _id: id },
      { password: hashedPassword }
    );
    if (updatepass) {
      return Response.json({ message: "password changed" });
    } else {
      return Response.json({ error: "password not changed" });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      return Response.json({ error: err.message });
    }
    return Response.json({ error: "An unknown error occurred" });
  }
}
