import { createClient } from '@supabase/supabase-js'
import { config } from '../../config/config'

const supabaseUrl = config.supabase.url
const supabaseKey = config.supabase.key
const supabase = createClient(supabaseUrl, supabaseKey)
export const getSupabaseClient = () => supabase

export const initSupabase = () => {
  console.log('Supabase initialized');
  return supabase;
}