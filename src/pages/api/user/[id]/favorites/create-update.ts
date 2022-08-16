import { connectMongo } from "middleware";
import { userModel } from "models/user";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message?: string;
  data?: any;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    if (req?.method !== "POST") throw new Error("Method not supported");

    let { id } = req?.query;

    const userExist = await userModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id as string),
        },
      },

      {
        $lookup: {
          from: "favorites",
          localField: "favorites",
          foreignField: "_id",
          as: "favoriteShow",
        },
      },
    ]);

    // console.log(userExist);

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
    }
    return res.status(404).json({
      message: "Internal Server Error",
    });
  }
};

export default connectMongo(handler);
