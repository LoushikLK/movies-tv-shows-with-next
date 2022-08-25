import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

type Data = {
  message: string;
  data?: object;
};
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    if (req?.method !== "POST") throw new Error("Invalid method");
    res.setHeader(
      "Set-Cookie",
      serialize("authToken", "", {
        path: "/",
      })
    );
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
