import mongoose from "mongoose";

export const connectDB = async () => {
  const {
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_HOST,
    MONGODB_DB,
    MONGODB_APPNAME,
  } = process.env;

  if (
    !MONGODB_USER ||
    !MONGODB_PASSWORD ||
    !MONGODB_HOST ||
    !MONGODB_DB ||
    !MONGODB_APPNAME
  ) {
    throw new Error("Missing MongoDB environment variables.");
  }

  const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DB}?retryWrites=true&w=majority&appName=${MONGODB_APPNAME}`;

  // Setup listeners first
  mongoose.connection.on("connected", () => {
    console.log("🥭 MongoDB connected successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("ℹ️  MongoDB disconnected");
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("👋 MongoDB connection closed through app termination");
    process.exit(0);
  });

  // Then try to connect
  try {
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    };

    console.log("🔌 Attempting to connect to MongoDB...");

    await mongoose.connect(uri, options);
  } catch (error) {
    console.error("❌ Could not connect to MongoDB:", error);
    process.exit(1); // Exit process on connection failure
  }
};

export default connectDB;
