import { connectMongo } from "middleware";
import { userModel } from "models/user";
import type { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { serialize } from "cookie";

type Data = {
  message?: string;
  data?: any;
};

const login = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    if (req?.method !== "POST") throw new Error("Invalid method");

    let { email, password } = req.body;

    if (!email || !password)
      throw new Error("Provide all the required parameters");

    let userExit = await userModel?.findOne({ email: email });

    if (!userExit) throw new Error("User not found");

    let passwordMatch = await bcrypt.compare(password, userExit?.password);

    if (!passwordMatch) throw new Error("Invalid credentials");

    let userData = {
      email: userExit?.email,
      phone: userExit?.phone,
      country: userExit?.country,
      userName: userExit?.userName,
      _id: userExit?._id,
      name: userExit?.name,
      isEmailVerified: userExit?.isEmailVerified,
      isPhoneVerified: userExit?.isPhoneVerified,
    };

    let token = await jwt.sign(
      {
        _id: userExit._id,
        userName: userExit?.userName,
        email: userExit?.email,
      },
      String(process?.env?.JWT_SECRET_KEY),
      {
        expiresIn: 3600 * 24,
      }
    );

    res.setHeader(
      "Set-Cookie",
      serialize("authToken", token, {
        path: "/",
      })
    );

    res?.status(200).json({
      data: {
        user: userData,
        token: token,
      },
      message: "Success",
    });
  } catch (error: any) {
    return res?.status(404).json({
      message: error.message || "Something went wrong",
    });
  }
};

export default connectMongo(login);
