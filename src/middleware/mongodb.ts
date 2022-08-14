import mongoose, { ConnectOptions } from "mongoose";

const MONGO_URI: any = process.env.MONGO_URL;

const dbConnect = (handler: any) => async (req: any, res: any) => {
  try {
    if (mongoose.connections[0].readyState) {
      // Use current db connection
      return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions);
    return handler(req, res);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default dbConnect;
