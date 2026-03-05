import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("Connected Database:", mongoose.connection.name);

    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully");
    });

  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;