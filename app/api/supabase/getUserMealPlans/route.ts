import { mealPlanQuery } from "@/types/planTypes";
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
    const { data, error } = await supabase.from("meal_plan").select(`
        id,
        planName,
        created_by,
        visibility,
        created_by,
        personal_information (
            name
        ),
        meal_plan_tags (
            meal_tags (
                id,
                mealTagName
            )
        ),
        plan_visibility (
            visibility
        ),
        daily_meals (
            plan_id,
            day,
            breakFast,
            lunch,
            dinner,
            breakFast:meal!meal_plan_breakFast_fkey (
                id, 
                mealName,
                mealType,
                veganAlternative,
                instructions,
                mealType:meal_type (
                    mealType
                ),
                meal_ingredients (
                    mealId,
                    ingredientName,
                    calories,
                    carbs,
                    fat,
                    protein
                )  
            ),
            lunch:meal!meal_plan_lunch_fkey (
                id, 
                mealName,
                mealType,
                veganAlternative,
                instructions,
                mealType:meal_type (
                    mealType
                ),
                meal_ingredients (
                    mealId,
                    ingredientName,
                    calories,
                    carbs,
                    fat,
                    protein
                )  
            ),
            dinner:meal!meal_plan_dinner_fkey (
                id, 
                mealName,
                mealType,
                veganAlternative,
                instructions,
                mealType:meal_type (
                    mealType
                ),
                meal_ingredients (
                    mealId,
                    ingredientName,
                    calories,
                    carbs,
                    fat,
                    protein
                )  
            )
        )`).eq("created_by", decryptedUserId);
    if (error) {
      return Response.json({ message: error });
    }
    const mealPlanRes = data as unknown as mealPlanQuery[];

    return Response.json({ mealPlanRes });
  } catch (error) {
    if (error) {
      return Response.json({ message: error });
    }
  }
}
