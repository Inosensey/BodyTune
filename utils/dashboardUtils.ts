export const getBmi = (weight: number, height: number): {
    id: string,
    bmiClassification: string,
} => {
    const bmi = weight / (height * height);
    if (bmi < 18.5) {
        return {
            id: "cm7brtlun8hw907mnqb6mlng9",
            bmiClassification: "Underweight",
        };
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return {
            id: "cm7bs0dpa8i1908l6rpo4n3vv",
            bmiClassification: "Healthy weight",
        };
    } else {
        return {
            id: "cm7bsfudm8tf307jtngum4z6p",
            bmiClassification: "Overweight",    
        };
    }
}