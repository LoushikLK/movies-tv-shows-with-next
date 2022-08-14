import { connectMongo } from "middleware";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const getUser = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { id } = req.query;
    console.log(id);
    console.log(req.body.hi);
    res.status(200).json({ name: "John Doe" });
  } catch (error) {
    console.log(error);
  }
};

export default connectMongo(getUser);
