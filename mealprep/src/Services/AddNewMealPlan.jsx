import uploadNewMealPlan from '../Models/UploadNewMealPlan.js'

async function addNewMealPlan(data, userId) {

    if(data.mealPlanId == 0){

        var mealPlanId = data.mealPlanId

        var url = "http://3.233.98.252:8080/uploadNewMealPlan?userId='" + String(userId) + "'&mealPlanId='" + String(mealPlanId) + "'";

        var uploadedMealPlan = await uploadNewMealPlan(url);
    }

}

export default addNewMealPlan;