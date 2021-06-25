import updateFoodsInMeal from '../Models/UpdateFoodsInMeal.js'
import updateMealData from '../Models/UpdateMealData.js'
import uploadNewMeal from '../Models/UploadNewMeal.js'
import getMeal from '../Models/GetMeal.js'


async function updateMeal(data, userId) {

    if(data.mealId != 0){

        var url = "http://3.233.98.252:8080/getMeal?mealId='" + String(data.mealId) + "'";
    
        var mealInfo = await getMeal(url);
    
        var calories = mealInfo.success[0].Calories + data.foodInfo.calories;
        var protein = mealInfo.success[0].Protein + data.foodInfo.protein;
        var carbs = mealInfo.success[0].Carbs + data.foodInfo.carbs;
        var fat = mealInfo.success[0].Total_Fat + data.foodInfo.fat;
        var fiber = mealInfo.success[0].Fiber + data.foodInfo.fiber;
        var sugar = mealInfo.success[0].Sugar + data.foodInfo.sugar;
    
        url = "http://3.233.98.252:8080/updateMealData?mealId='"   + String(data.mealId) 
                                               + "'&calories='" + String(calories) 
                                               + "'&protein='"  + String(protein) 
                                               + "'&carbs='"    + String(carbs) 
                                               + "'&fat='"      + String(fat)
                                               + "'&fiber='"    + String(fiber)
                                               + "'&sugar='"    + String(sugar) 
                                               + "'&mealName='" + String(mealInfo.success[0].Name) + "'";
    
        var mealUpdated = await updateMealData(url);
    
        if(!mealUpdated.success){
            //TO-DO Add error handling here 
        }
    
        url = "http://3.233.98.252:8080/updateFoodsInMeal?mealId='" + String(data.mealId) 
                                                + "'&foodId='"   + String(data.foodInfo.id) 
                                                + "'&serving='"  + String(data.foodInfo.serving) 
                                                + "'&unit='"     + String(data.foodInfo.unit) + "'";
    
        var foodInMealUpdated = await updateFoodsInMeal(url);
    
        if(!foodInMealUpdated.success){
            //TO-DO Add error handling here 
        }
    
        return data.mealId
    }else{

        var calories = data.foodInfo.calories;
        var protein = data.foodInfo.protein;
        var carbs = data.foodInfo.carbs;
        var fat = data.foodInfo.fat;
        var fiber = data.foodInfo.fiber;
        var sugar = data.foodInfo.sugar;
        var name = data.mealName
        var serving = data.foodInfo.serving;
        var unit = data.foodInfo.unit;
        var foodId = data.foodInfo.id;
    
        url = "http://3.233.98.252:8080/uploadNewMeal?userId='"    + String(userId)
                                               + "'&calories='" + String(calories) 
                                               + "'&protein='"  + String(protein) 
                                               + "'&carbs='"    + String(carbs) 
                                               + "'&fat='"      + String(fat)
                                               + "'&fiber='"    + String(fiber)
                                               + "'&sugar='"    + String(sugar) 
                                               + "'&mealName='" + String(name)
                                               + "'&foodId='"   + String(foodId) 
                                               + "'&serving='"  + String(serving) 
                                               + "'&unit='"     + String(unit) + "'";
    
        var mealUploaded = await uploadNewMeal(url);
        
        if(mealUploaded.success != 0){
            return mealUploaded.success
        }else{
            return false
        }
    }

    

}

export default updateMeal;