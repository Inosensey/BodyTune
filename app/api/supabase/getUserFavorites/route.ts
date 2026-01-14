import { decryptUserId } from "@/utils/encrypter";
import { createSSR } from "@/utils/supabaseSSR";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const encryptedUserId = searchParams.get("user")?.toString();
  const supabase = await createSSR();

  if (!encryptedUserId) return Response.json({ message: "No user!" });
  const decodedEncryptUserId = decodeURIComponent(encryptedUserId);
  const decryptedUserId = decryptUserId(decodedEncryptUserId);

  try {
    const { data, error } = await supabase
      .from("user_favorites")
      .select("plantype, planId, planAuthorId, created_by")
      .eq("created_by", decryptedUserId);

    

    if (error) {
      console.log(error);
    }

    const response = data;
    // Respond with JSON data
    return Response.json({ response });
  } catch (error) {
    return Response.json({ message: error });
  }
}
