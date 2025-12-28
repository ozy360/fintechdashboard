import connectDB from "@/app/lib/mongodb";
import userdb from "@/app/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.formData();

    const username = data.get("username")?.toString() || "";
    const emailInput = data.get("email")?.toString() || "";
    const passwordRaw = data.get("password")?.toString() || "";

    const existingUser = await userdb.findOne({ email: emailInput });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already in use" }));
    }

    const randString = (
      Date.now() + Math.floor(Math.random() * 1000000)
    ).toString(36);
    const hashedPassword = await bcrypt.hash(passwordRaw, 10);

    const newUser = new userdb({
      username,
      email: emailInput,
      password: hashedPassword,
      referralID: randString,
    });

    const savedUser = await newUser.save();
    if (!savedUser) {
      return new Response(JSON.stringify({ error: "Error, try again" }));
    }

    const today = new Date().toISOString().split("T")[0];
    const transactions = [
      {
        name: "Payment for services",
        date: today,
        amount: 100,
        currency: "NGN",
        deposit: false,
        withdraw: true,
        pending: true,
      },
      {
        name: "Refund",
        date: today,
        amount: 100,
        currency: "NGN",
        deposit: true,
        withdraw: false,
        approved: true,
      },
    ];

    await userdb.findByIdAndUpdate(savedUser._id, {
      $push: { transactions: { $each: transactions } },
    });

    return new Response(JSON.stringify({ message: "User Registered" }));
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMsg }));
  }
}
