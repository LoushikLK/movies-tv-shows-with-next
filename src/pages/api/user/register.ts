import { connectMongo } from "middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { userModel } from "models/user";
type Data = {
  message: string;
  data?: object;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const connection = await connectMongo();
    console.log(connection);
    const { method, body } = req;

    if (body.email && body.password && body.name && method === "POST") {
      const user = await userModel.create({
        name: body.name,
        email: body.email,
        password: body.password,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        favorites: [],
        watch_list: [],
      });

      console.log(user);

      res.status(200).json({ message: "success", data: user });
      return;
    } else {
      res.status(400).json({ message: "Bad request" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
