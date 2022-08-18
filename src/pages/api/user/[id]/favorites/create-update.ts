import { auth, connectMongo } from "middleware";
import { favoritesModel } from "models/favorites";
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
    let { type, showId } = req?.body;

    if (!type || !showId) throw new Error("Send all parameters");

    const userExist = await favoritesModel.aggregate([
      {
        $match: {
          user: id,
        },
      },
    ]);

    // console.log(userExist);

    if (!userExist || userExist.length === 0) {
      let newData = new favoritesModel({
        user: id,
        favorites: [
          {
            showId: showId,
            showType: type,
          },
        ],
      });

      let saved = await newData?.save();

      if (!saved) throw new Error("No favorites created");

      return res.status(200).json({
        message: "Favorites created successfully",
        data: saved,
      });
    }

    const updateFavorites = await favoritesModel.updateOne(
      {
        _id: new mongoose.Types.ObjectId(userExist[0]?._id as string),
      },
      {
        $push: {
          favorites: {
            showId: showId,
            showType: type,
          },
        },
      }
    );

    if (!updateFavorites) throw new Error("Couldn't update favorites");
    return res?.status(200).json({
      data: updateFavorites,
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

export default connectMongo(auth(handler));
