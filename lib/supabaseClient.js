import { createClient } from "@supabase/supabase-js";

// مهم جداً: هدول لازم تضيفهم في Vercel Project (وليس في Supabase)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// ما رح نعمل throw لو فاضيين مشان ما يخرب الـ build
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
