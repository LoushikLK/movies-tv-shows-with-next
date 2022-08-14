import { connectMongo } from "middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { userModel } from "models/user";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { serialize } from "cookie";
type Data = {
  message: string;
  data?: object;
};
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { method, body } = req;

    if (body.email && body.password && body.name && method === "POST") {
      const findUser = await userModel.findOne({
        email: body.email,
        phone: body.phone,
        userName: body.userName,
      });

      if (findUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      } else {
        const hashPassword = await bcrypt.hash(body.password, 10);

        const user = {
          name: body.name,
          userName: body.userName,
          email: body.email,
          password: hashPassword,
          country: body.country,
          phone: body.phone,
          isEmailVerified: false,
          isPhoneVerified: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          favorites: [],
          watch_list: [],
        };

        const newUser = new userModel(user);

        const saveUser = await newUser.save();

        if (!saveUser) {
          return res.status(400).json({ message: "User could not be saved" });
        }

        let token = await jwt.sign(
          {
            _id: saveUser._id,
            userName: saveUser?.userName,
            email: saveUser?.email,
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

        res.status(200).json({
          message: "success",
          data: {
            user: saveUser,
            token: token,
          },
        });
        return;
      }
    } else {
      res.status(400).json({ message: "Bad request" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default connectMongo(handler);
