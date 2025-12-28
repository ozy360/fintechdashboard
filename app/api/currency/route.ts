import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `https://currencyconversionapi.com/api/v1/live?access_key=${process.env.CURR_API}`
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
