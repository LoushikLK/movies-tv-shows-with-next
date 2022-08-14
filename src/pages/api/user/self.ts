import { connectMongo } from "middleware";
import auth from "middleware/auth";
import { userModel } from "models/user";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data?: any;
  message: string;
};

const getUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    let userId = req?.body?.user;

    console.log(userId);

    let userData = await userModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          phone: 1,
          country: 1,
          username: 1,
          isEmailVerified: 1,
          isPhoneVerified: 1,
        },
      },
    ]);

    console.log(userData);

    if (!userData) throw new Error(`User ${userId} is not found`);

    res.status(200).json({ data: userData, message: "Success" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({ message: "Something went wrong" });
  }
};

export default connectMongo(auth(getUser));
