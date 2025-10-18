
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Connect to MongoDB 
    await mongoose.connect(process.env.MONGODB_URL, {
      ssl: true,
    });

    mongoose.connection.on("connected", () => {
      console.log(" Database connected successfully");
    });

  } catch (error) {
    console.error(" MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
