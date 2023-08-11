import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "@/Libs/database/ConnectCloudinary";
import { UploadApiResponse } from "cloudinary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      const id: string | string[] | undefined = req.query.id;

      if (id === undefined || typeof id === "object") {
        throw new Error("ID cannot be different of 'string'");
      }

      const data: UploadApiResponse = await cloudinary.uploader.destroy(
        "00-start/" + id,
        {
          resource_type: "image",
        }
      );

      return res.status(200).json({ data });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ ERROR: error.message });
      }
    }
  }
}
