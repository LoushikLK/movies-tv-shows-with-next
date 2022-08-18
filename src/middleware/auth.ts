import * as jwt from "jsonwebtoken";

const auth = (handler: any) => async (req: any, res: any, next: any) => {
  try {
    let token = req.cookies.authToken;

    if (!token) throw new Error("No token provided");

    let jwtToken: any = await jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );

    if (!jwtToken) throw new Error("Provided token is not valid");
    req.body = {
      ...req.body,
      user: jwtToken._id,
    };
    return handler(req, res, next);
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error?.message,
        data: {},
      });
    }
    res.status(500).json({
      message: "Something went wrong!",
      data: {},
    });
  }
};

export default auth;
