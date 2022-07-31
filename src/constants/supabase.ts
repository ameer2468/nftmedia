import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://rmgkkukzcwaywhvkwmky.supabase.co",
  process.env.REACT_APP_SUPABASE_API_KEY as string
);
