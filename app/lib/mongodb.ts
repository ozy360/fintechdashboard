import mongoose from "mongoose";

export default async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
  }

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri);
      console.log("DB connected");
    }
  } catch (err) {
    console.error(err);
  }
}
