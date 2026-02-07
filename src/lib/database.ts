/**
 * Database access via Supabase.
 * When Supabase is configured (see lib/supabase.ts), use:
 *
 *   import { supabase } from '@/lib/supabase';
 *   const { data, error } = await supabase.from('your_table').select('*');
 *
 * RLS (Row Level Security) and anon key apply. No UI changes required.
 */
export { supabase, isSupabaseConfigured } from "./supabase";
