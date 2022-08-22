import { auth, connectMongo } from "middleware";
import { favoritesModel } from "models/favorites";
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

    let dataAlreadyExist = await favoritesModel.aggregate([
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

    if (!dataAlreadyExist || dataAlreadyExist.length !== 0) {
      let newData = await favoritesModel.findOneAndUpdate(
        {
          user: id,
        },
        {
          $pull: {
            favorites: {
              showId: String(showId),
              showType: String(type).toUpperCase(),
            },
          },
        }
      );

      if (!newData) throw new Error(`Could not update favorites`);

      return res.status(200).json({
        message: "Favorites removed successfully",
        data: newData,
      });
    }

    let setNewMovie = await favoritesModel.updateOne(
      {
        user: id,
      },
      {
        $push: {
          favorites: {
            showId: showId,
            showType: type,
          },
        },
      },
      {
        new: true,
      }
    );

    if (!setNewMovie) throw new Error("Couldn't update favorites");

    res.status(200).json({
      message: "Favorites updated successfully",
      data: setNewMovie,
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
