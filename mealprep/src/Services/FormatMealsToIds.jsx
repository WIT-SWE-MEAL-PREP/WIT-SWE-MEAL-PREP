function formatMealsToIds(meals){

    console.log(meals)

    let idArray = meals.map(meal => {
        return meal.Meal_Id;
    })

    return idArray;

}

export default formatMealsToIds;