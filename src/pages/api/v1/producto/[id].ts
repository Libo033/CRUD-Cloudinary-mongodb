import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "@/Libs/database/ConnectCloudinary";
import clientPromise from "@/Libs/database/mongoConnect";
import { MongoClient, ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const client: MongoClient = await clientPromise;
    const db = client.db("imageuploader-api");
    const id: string | string[] | undefined = req.query.id;

    if (typeof id !== "string") {
      throw new Error("ID cannot be different of 'string'");
    }

    const product = await db
      .collection("products")
      .find(new ObjectId(id))
      .toArray();

    res.status(200).json(product[0]);
  }
  if (req.method === "PUT") {
    try {
      const client = await clientPromise;
      const db = client.db("imageuploader-api");
      const id: string | string[] | undefined = req.query.id;

      if (typeof id !== "string") {
        throw new Error("ID cannot be different of 'string'");
      }

      const product = {
        images: req.body.images,
        title: req.body.title,
      };

      const modifyProduct = await db
        .collection("products")
        .updateOne({ _id: new ObjectId(id) }, { $set: product });

      if (!modifyProduct) {
        throw new Error("something went wrong");
      }

      res.status(200).json({ CREATED: modifyProduct.acknowledged });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
  if (req.method === "DELETE") {
    try {
      const client: MongoClient = await clientPromise;
      const db = client.db("imageuploader-api");
      const id: string | string[] | undefined = req.query.id;

      if (typeof id !== "string") {
        throw new Error("ID cannot be different of 'string'");
      }

      const product: any = await db
        .collection("products")
        .find(new ObjectId(id))
        .toArray();

      if (!product) {
        throw new Error("Trouble getting the product");
      }

      product[0].images.forEach(async (img: any) => {
        const public_id: string = img.slice(
          img.indexOf("00-start/") + "00-start/".length,
          img.length - 4
        );

        await cloudinary.uploader.destroy(
          "00-start/" + public_id,
          {
            resource_type: "image",
          }
        );
      });

      const deleted = await db.collection("products").findOneAndDelete({_id: new ObjectId(id)});

      return res.status(200).json({"deleted": deleted.ok});
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).json({"ERROR": error.message});
      }
    }
  }
}
