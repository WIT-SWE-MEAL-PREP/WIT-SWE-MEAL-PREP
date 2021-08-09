import getConfig from '../Models/GetConfig.js'

async function generateMealPlans(meals, userId) {

    var url = "http://3.233.98.252:8080/getConfig?userId='" + String(userId) + "'";
    var configData = await getConfig(url);

    configData = configData.configData[0];

    var constraintCal = configData.Calories;
    var constraintProtein = configData.Protein;
    var constraintCarbs = configData.Carbs;
    var constraintFat = configData.Fat;
    var constraintSugar = configData.Sugar;
    var constraintFiber = configData.Fiber;

    if(configData.Calories === null){
      //Some error message 
    }else{
      var mealPlans = [];

      if(meals.length < configData.Num_Meals){
          // Add Error
      }

      let maxCombos = getNumCombo(meals.length, 2)

      let i = 0; //Used to keep track of index in Meals

      do{

        let mealPlan = [];

        mealPlan[0] = meals[i];

        console.log(mealPlan)

        let plans = [await generateMealPlan(meals, i+1, mealPlan, 1, configData.Num_Meals)];

        // console.log(plans)

        mealPlans = mealPlans.concat(plans)

        // console.log(mealPlans.length)

        i++;

      }while(i < 1);

      console.log(mealPlans)
      
    }
  }

async function generateMealPlan(meals, index, generatedMealPlan, mealPlanIndex, numMeals){

    console.log(generatedMealPlan)

    let returnArray = [];

    if(index < meals.length && mealPlanIndex < numMeals){

        
        console.log(generatedMealPlan)

        // returnArray = returnArray.concat(generatedMealPlan)

        // returnArray = await generateMealPlan(meals, index+1, generatedMealPlan, mealPlanIndex+1, numMeals)

        console.log(returnArray)

    }

    let i = 0;

    


    return returnArray;
}

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}


  function getFactorial(num){

    if(num === 0) {
        return 1;
    }

    return num * getFactorial(num - 1);

  }

  function getNumCombo(options, numMeals){

    return ( (getFactorial(options)) / ((getFactorial(numMeals)) * (getFactorial((options - numMeals)))))

  }

  export default generateMealPlans;