function formatMealsToIds(meals){

    let idArray = meals.map(meal => {
        return meal.Meal_Id;
    })

    return idArray;

}

export default formatMealsToIds;