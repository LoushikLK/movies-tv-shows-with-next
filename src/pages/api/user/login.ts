import { connectMongo } from "middleware";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const login = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    console.log("at login");
  } catch (error) {}
};

export default connectMongo(login);
