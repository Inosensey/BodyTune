const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID; // your supabase project id

export default function supabaseLoader({ src, width, quality }:{src: string, width: number, quality?: number}) {
  return `https://${projectId}.supabase.co/Exercise Demo/v1/render/image/public/${src}?width=${width}&quality=${quality || 75}`
}