import connectDB from "@/app/lib/mongodb";
import userdb from "@/app/models/user";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.formData();
    const cookie = await cookies();
    const id = cookie.get("usersessionId")?.value;
    const profile = JSON.parse(data.get("profile"));

    const updateFields = {};

    if (profile.firstname) updateFields.firstname = profile.firstname;
    if (profile.lastname) updateFields.lastname = profile.lastname;
    if (profile.mobile) updateFields.mobile = profile.mobile;
    if (profile.country) updateFields.country = profile.country;
    if (profile.address) updateFields.address = profile.address;
    if (profile.state) updateFields.state = profile.state;
    if (profile.city) updateFields.city = profile.city;
    if (profile.zip) updateFields.zip = profile.zip;

    const update = await userdb.findOneAndUpdate(
      { _id: String(id) },
      { $set: updateFields },
      { new: true } // optional: returns the updated document
    );

    if (update) {
      if (
        update.username ||
        update.firstname ||
        update.lastname ||
        update.mobile ||
        update.country ||
        update.state ||
        update.city ||
        update.zip ||
        update.address !== ""
      ) {
        await userdb.findOneAndUpdate({ _id: String(id) }, { isValid: true });
      }
      return Response.json({ message: "Update successful" });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      return Response.json({ error: err.message });
    }
    return Response.json({ error: "An unknown error occurred" });
  }
}
