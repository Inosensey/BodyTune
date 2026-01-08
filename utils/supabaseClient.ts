"use client";

import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_ANON_KEY ?? "";

// export const useSupabase = createBrowserClient(
//   supabaseUrl,
//   supabaseAnonKey
// );

export function createClient() {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  );
}