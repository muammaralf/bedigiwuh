import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
const SUPABASE_KEY = process.env.SUPABASE_KEY ?? '';

export const config = {
  supabase: {
    key: SUPABASE_KEY,
    url: SUPABASE_URL,
  }
}