import connectDB from "@/app/lib/mongodb";
import userdb from "@/app/models/user";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const cookie = await cookies();
    const data = await req.formData();

    const email = data.get("email");
    const password = String(data.get("password"));

    if (!email || !password)
      return Response.json({ error: "Invalid login details" });

    const getuser = await userdb.findOne({ email: email });

    const isPasswordValid = await bcrypt.compare(password, getuser?.password);

    if (!getuser) {
      return Response.json({ error: "Invalid login details" });
    } else if (getuser.email !== email) {
      return Response.json({ error: "Incorrect email address" });
    } else if (!isPasswordValid) {
      return Response.json({ error: "Incorrect password" });
    }

    if (getuser.email === email && isPasswordValid) {
      cookie.set("usersessionId", String(getuser._id));
      return Response.json({ value: String(getuser._id) });
    }
  } catch (err: unknown) {
    return Response.json({ err: err });
  }
}
