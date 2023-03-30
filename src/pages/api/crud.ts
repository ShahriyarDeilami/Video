// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data, model, action } = req.body;

  let apiData;

  if (action === "list") {
    apiData = await supabase.from(model).select("*").match(data);
  }

  if (action === "find") {
    apiData = await supabase.from(model).select("*").match(data).limit(1);
  }

  if (action === "delete") {
    apiData = await supabase.from(model).delete(data).select("*");
  }

  if (!apiData?.error) res.json(apiData?.data);
  console.log(apiData?.error);
}
