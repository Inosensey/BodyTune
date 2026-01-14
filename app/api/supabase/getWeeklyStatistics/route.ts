import { TableRow } from "@/types/database.types";
import { decryptUserId } from "@/utils/encrypter";
import { createSSR } from "@/utils/supabaseSSR";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const encryptedUserId = searchParams.get("user")?.toString();
  const activePlanId = searchParams.get("activePlanId")?.toString();
  const supabase = await createSSR();

  if (!encryptedUserId) return Response.json({ message: "No user!" });
  const decodedEncryptUserId = decodeURIComponent(encryptedUserId);
  const decryptedUserId = decryptUserId(decodedEncryptUserId);

  try {
    const { data: userActivePlansData, error } = await supabase.rpc("getuserweeklystatistics", {
      passed_created_by: decryptedUserId,
      passed_plan_id: activePlanId,
    });

    if (error) {
      return Response.json({ message: error });
    }
    const userActivePlanDataRes = userActivePlansData as unknown as Array<
      TableRow<"user_active_plan_data">
    >;

    const response = userActivePlanDataRes;

    // Respond with JSON data
    return Response.json({ response });
  } catch (error) {
    return Response.json({ message: error });
  }
}
