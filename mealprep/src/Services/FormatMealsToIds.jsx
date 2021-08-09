function formatMealsToIds(meals){

    let idArray = meals.map(meal => {
        return meal.mealId;
    })

}

export default formatMealsToIds;