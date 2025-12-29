import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "http://127.0.0.1:54321";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "xxx";

if (typeof window !== "undefined") {
  console.log("[Supabase] URL:", supabaseUrl);
  console.log("[Supabase] Key:", supabaseAnonKey?.substring(0, 20) + "...");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
