// pages/api/auth/store-token.ts
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken } = req.body;

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    }),
  );

  res.status(200).json({ success: true });
}
