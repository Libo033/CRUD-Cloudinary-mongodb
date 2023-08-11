import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "@/Libs/database/ConnectCloudinary";
import { UploadApiResponse } from "cloudinary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data: UploadApiResponse = await cloudinary.uploader.upload(
      req.body.url,
      { upload_preset: "00-start" }
    );

    return res.status(201).json({ data });
  }
}
