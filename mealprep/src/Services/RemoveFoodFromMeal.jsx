import removeFoodFromMeal from '../Models/RemoveFoodFromMeal.js'
import updateMealData from '../Models/UpdateMealData.js'

async function removeFoodFromMealService(foodInfoToRemove, mealToRemoveFrom) {

    var url;

    var calories = mealToRemoveFrom.Calories - foodInfoToRemove.foodInfo.calories;
    var protein = mealToRemoveFrom.Protein - foodInfoToRemove.foodInfo.protein;
    var carbs = mealToRemoveFrom.Carbs - foodInfoToRemove.foodInfo.carbs;
    var fat = mealToRemoveFrom.Total_Fat - foodInfoToRemove.foodInfo.fat;
    var fiber = mealToRemoveFrom.Fiber - foodInfoToRemove.foodInfo.fiber;
    var sugar = mealToRemoveFrom.Sugar - foodInfoToRemove.foodInfo.sugar;

    url = "http://3.233.98.252:8080/updateMealData?mealId='"   + String(mealToRemoveFrom.Meal_Id) 
                                            + "'&calories='" + String(calories) 
                                            + "'&protein='"  + String(protein) 
                                            + "'&carbs='"    + String(carbs) 
                                            + "'&fat='"      + String(fat)
                                            + "'&fiber='"    + String(fiber)
                                            + "'&sugar='"    + String(sugar) 
                                            + "'&mealName='" + String(mealToRemoveFrom.Name) + "'";

    var mealUpdated = await updateMealData(url);

    if(!mealUpdated.success){

        alert("An error occurred while updating the users meal. Please try again later.") 
    }

    url = "http://3.233.98.252:8080/removeFoodFromMeal?mealId='" + String(mealToRemoveFrom.Meal_Id) 
                                            + "'&foodId='"   + String(foodInfoToRemove.Food_Id) + "'";

    var foodInMealUpdated = await removeFoodFromMeal(url);

    if(!foodInMealUpdated.success){
        
        alert("An error occurred while removing an item from the users meal. Please try again later.") 
    }

    return foodInfoToRemove.mealId
    
}

export default removeFoodFromMealService;