import { connectMongo } from "middleware";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectMongo();

  try {
    const { id } = req.query;
    console.log(id);
    console.log(req.body.hi);
    res.status(200).json({ name: "John Doe" });
  } catch (error) {
    console.log(error);
  }
}
