import { connectMongo } from "middleware";
import { favoritesModel } from "models/favorites";
import { userModel } from "models/user";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message?: string;
  data?: any;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    if (req?.method !== "GET") throw new Error("Method not supported");

    let { id } = req?.query;

    const userFavorites = await favoritesModel
      .findOne({
        user: id,
      })
      .limit(20);

    if (!userFavorites) throw new Error("No favorites found");

    return res.status(200).json({
      message: "Favorites",
      data: userFavorites,
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
