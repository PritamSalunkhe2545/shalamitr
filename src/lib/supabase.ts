import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client-side Supabase client (public, anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (service role — bypasses RLS)
// Only use in API routes / server-side code
export function createServerSupabaseClient() {
  return createClient(supabaseUrl, supabaseServiceRoleKey)
}

export const CERTIFICATES_BUCKET = "certificates"

export async function uploadCertificate(
  filename: string,
  buffer: Buffer
): Promise<string> {
  const client = createServerSupabaseClient()
  const { data, error } = await client.storage
    .from(CERTIFICATES_BUCKET)
    .upload(filename, buffer, {
      contentType: "application/pdf",
      upsert: true,
    })

  if (error) {
    throw new Error(`Failed to upload certificate: ${error.message}`)
  }

  const { data: urlData } = client.storage
    .from(CERTIFICATES_BUCKET)
    .getPublicUrl(data.path)

  return urlData.publicUrl
}
