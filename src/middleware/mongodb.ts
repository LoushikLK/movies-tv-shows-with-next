import mongoose, { ConnectOptions } from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(
      MONGO_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );

    connection.connection.on("error", (error) => {
      console.error(error);
      process.exit(1);
    });
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default dbConnect;
