function calculateValues(qty, unit, foodData) {

    var conversionRate;

    if(unit === "gram"){
        conversionRate = 1;
    }else if(unit === "ounce"){
        conversionRate = 28;
    }else if(unit === "pound"){
        conversionRate = 453.592;
    }else if(unit === "kilogram"){
        conversionRate = 1000;
    }else if(unit === "pinch"){
        conversionRate = 0.355625;
    }else if(unit === "liter"){
        conversionRate = 1000;
    }else if(unit === "fluid ounce"){
        conversionRate = 29.57352956;
    }else if(unit === "gallon"){
        conversionRate = 3785.411784;
    }else if(unit === "pint"){
        conversionRate = 473.176475;
    }else if(unit === "quart"){
        conversionRate = 946.352946;
    }else if(unit === "milliliter"){
        conversionRate = 1;
    }else if(unit === "drop"){
        conversionRate = 0.05;
    }else if(unit === "cup"){
        conversionRate = 128;
    }else if(unit === "teaspoon"){
        conversionRate = 5.69;
    }else if(unit === "tablespoon"){
        conversionRate = 17.07;
    }

    foodData.calories = (foodData.calories * conversionRate) * qty;
    foodData.protein = (foodData.protein * conversionRate) * qty;
    foodData.carbs = (foodData.carbs * conversionRate) * qty;
    foodData.fat = (foodData.fat * conversionRate) * qty;
    foodData.fiber = (foodData.fiber * conversionRate) * qty;
    foodData.sugar = (foodData.sugar * conversionRate) * qty;
    foodData.serving = qty;
    foodData.unit = unit;

    return foodData;

}

export default calculateValues;