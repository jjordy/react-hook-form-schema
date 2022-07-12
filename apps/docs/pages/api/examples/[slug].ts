import getExampleJson from "lib/getExampleJson";
import { NextApiRequest, NextApiResponse } from "next";

export default function GetExampleBySlugAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { slug = "" },
  } = req;
  const example = getExampleJson(slug as string);

  if (example) {
    return res.status(200).json(example);
  }
  return res.status(404).json({ message: "Not Found" });
}
