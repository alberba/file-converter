import type { VercelRequest, VercelResponse } from "@vercel/node";
import sharp from "sharp";

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const buffer = Buffer.from(req.body);
    const output = await sharp(buffer).toFormat("webp").toBuffer();

    res.setHeader("Content-Type", "image/webp");
    res.status(200).send(output);
  } catch (error) {
    console.error("Conversion error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};
