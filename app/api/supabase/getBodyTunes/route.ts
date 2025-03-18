
import { createSSR } from "@/utils/supabaseSSR";

export async function GET() {
    const supabase = await createSSR();

    try {
        const {data, error} = await supabase.from("bodytune_plan").select(`
                mealPlanId,
                exercisePlanId,
                created_by,
                personal_information (
                    name
                ),
                meal_plan (
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
                    )
                ),
                exercise_plan (
                    id,
                    planName,
                    created_by,
                    visibility,
                    plan_visibility (
                        visibility
                    ),
                    exercise_plan_tag (
                        exercise_tags (
                            id,
                            exerciseTagName
                        )
                    ),
                    created_by,
                    personal_information (
                        name
                    ),
                    exercise (
                        exerciseName,
                        bodyPart,
                        equipment,
                        day,
                        exerciseDemo,
                        youtubeLink,
                        measurement,
                        instruction,
                        bmiClassification,
                        exerciseMeasurementType,
                        exercise_measurement_type (
                            id,
                            measurement
                        ),
                        bmi_classification (
                            classification
                        )
                    )
                )
            `);
        if (error) {
            console.log(error);
        }

        return Response.json({ data });
    } catch (error) {
        return Response.json({ message: error });
    }
}