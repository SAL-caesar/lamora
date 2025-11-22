import { createClient } from "@supabase/supabase-js";

// استخدم المتغيرات العامة (لازم تضيفها في Vercel)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase env variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
