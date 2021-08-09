import getConfig from '../Models/GetConfig.js'

async function generateMealPlans(meals, userId) {

    var url = "http://3.233.98.252:8080/getConfig?userId='" + String(userId) + "'";
    var configData = await getConfig(url);

    configData = configData.configData[0];

    let numMeals = configData.Num_Meals;

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

      let dummyArray = [];

      let blah = combinationUtil(meals, dummyArray, 0, meals.length-1, 0, numMeals)

      console.log(blah)
      
    }
  }

  // Based on code from https://www.geeksforgeeks.org/print-all-possible-combinations-of-r-elements-in-a-given-array-of-size-n/

  function combinationUtil(meals, generatedMealPlan, start, end, index, numMeals){
      // Current combination is ready to be printed, print it
      if (index == numMeals)
      {
        console.log(generatedMealPlan)

          return generatedMealPlan;
      }
       
      // replace index with all possible elements. The condition
      // "end-i+1 >= r-index" makes sure that including one element
      // at index will make a combination with remaining elements
      // at remaining positions
      for (let i=start; i<=end && end-i+1 >= numMeals-index; i++)
      {
        generatedMealPlan[index] = meals[i];
        combinationUtil(meals, generatedMealPlan, i+1, end, index+1, numMeals);
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