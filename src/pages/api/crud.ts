// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
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
    apiData = await supabase.from(model).select("*").match(data).single();
  }

  if (action === "create") {
    apiData = await supabase.from(model).insert(data);
  }

  if (action === "update") {
    apiData = await supabase.from(model).update(data).match({ id: data.id });
  }

  if (action === "delete") {
    apiData = await supabase.from(model).delete().match(data).select("*");
  }

  if (!apiData?.error) res.json(apiData?.data);
  console.log(apiData?.error);
}
