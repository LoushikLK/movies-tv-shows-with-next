import { connectMongo } from "middleware";
import { userModel } from "models/user";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message?: string;
  data?: any;
};

const getUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    if (req.method !== "GET") throw new Error("Method not supported");

    const { id } = req.query;

    const userExist = await userModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id as string),
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          phone: 1,
          country: 1,
          userName: 1,
          isEmailVerified: 1,
          isPhoneVerified: 1,
          created_at: 1,
        },
      },
    ]);

    if (!userExist) throw new Error("User not found");

    return res?.status(200).json({
      data: userExist[0],
      message: "Success",
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({
        message: error.message,
      });
    } else {
      return res.status(404).json({
        message: "Internal Server Error",
      });
    }
  }
};

export default connectMongo(getUser);
