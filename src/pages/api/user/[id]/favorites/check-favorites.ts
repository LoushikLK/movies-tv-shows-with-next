import { auth, connectMongo } from "middleware";
import { favoritesModel } from "models/favorites";
import mongoose, { ObjectId } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message?: string;
  data?: any;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    if (req?.method !== "POST") throw new Error("Method not supported");

    let { id } = req?.query;
    let { type, showId } = req?.body;

    if (!type || !showId) throw new Error("Send all parameters");

    const showExist = await favoritesModel.aggregate([
      {
        $match: {
          user: id,
        },
      },
      {
        $unwind: "$favorites",
      },
      {
        $match: {
          "favorites.showId": String(showId),
          "favorites.showType": String(type).toUpperCase(),
        },
      },
    ]);

    if (!showExist || showExist?.length === 0) {
      return res.status(200).json({
        message: "Show Does not exist",
        data: {
          exist: false,
        },
      });
    }

    return res.status(200).json({
      message: "Show Exist",
      data: {
        exist: true,
      },
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

export default connectMongo(auth(handler));
