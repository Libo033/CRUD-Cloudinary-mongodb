import clientPromise from "@/Libs/database/mongoConnect";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db("imageuploader-api");

      const allProducts = await db.collection("products").find({}).toArray();

      res.status(200).json(allProducts);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const db = client.db("imageuploader-api");

      const newProduct = {
        images: req.body.images,
        title: req.body.title,
      };

      const insertedProduct = await db.collection("products").insertOne(newProduct);

      if (!insertedProduct) {
        throw new Error("something went wrong");
      }

      res.status(201).json({"CREATED": insertedProduct.acknowledged});
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}
