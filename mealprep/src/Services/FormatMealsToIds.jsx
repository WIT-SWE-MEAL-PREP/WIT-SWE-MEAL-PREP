function formatMealsToIds(meals){

    let idArray = meals.map(meal => {
        return meal.mealId;
    })

    return idArray;

}

export default formatMealsToIds;