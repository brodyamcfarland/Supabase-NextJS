import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!;

if (!url || !anonKey) {
    throw new Error('supabase Client Error.')
}

const supabase = createClient(url, anonKey);

export default supabase;

