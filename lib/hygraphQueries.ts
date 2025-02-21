"use server"

const NEXT_HYGRAPH_ENDPOINT = process.env.NEXT_HYGRAPH_ENDPOINT;

export const getMeals = async () => {
    try {
        const response = await fetch(NEXT_HYGRAPH_ENDPOINT!, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `query Meals {
                    meals(first: 25, where: {bmiClassification:{id:"cm7bsfudm8tf307jtngum4z6p"}}) {
                        mealType,
                        mealName,
                        ingredients,
                        veganAlternative,
                        cookingInstructions
                    }
                }`
            }),
        })  
        const json = await response.json();
        return json
    } catch (error) {
        console.log("There is an error getting your meals", error);
        return error
    }
}