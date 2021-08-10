const dotenv = require("dotenv");
require("dotenv").config();

const express = require('express');
const cors = require('cors');
const app = express();

const mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
})

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

const PORT = 8080

app.use(cors());

app.post('/login', (req, res) => {
    var result = false;
    var getDBInfo = function(callback) {

        let sql = 'SELECT * FROM gainsday.User WHERE Username = ' + String(req.query.username) + ' AND Password = ' + String(req.query.password);
        connection.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                return callback(err);
            }

            console.log(sql)

            if (resp.length) {
                console.log("found user: ", resp[0]);
                result = true;
            }

            callback(null, result, resp);
        });
    }

    getDBInfo(function(err, result, resp) {
        console.log({ success: result })
        res.send({ loggedIn: result, userId: resp[0].User_Id });
    });
});

app.post('/uploadNewUser', (req, res) => {
    var result = false;
    var getDBInfo = function(callback) {

        let sql = 'SELECT MAX(User_id) FROM gainsday.User';
        connection.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                return callback(err);
            }

            console.log(sql)

            if (resp.length) {
                console.log("Previous highest user id: ", resp);
                result = resp;
            }

            callback(null, result);
        });
    }

    var postDBInfo = function(callback) {

        let sql = "INSERT INTO gainsday.User (User_id, Username, Password, Email) VALUES (" + maxUserID + "," + String(req.query.username) + ", " + String(req.query.password) + ", " + String(req.query.email) + ");";
    
        connection.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                return callback(err);
            }

            console.log(sql)

            if (resp.length) {
                maxUserID = resp[0];
                result = true;
            }

            callback(null, result);
        });
    }

    getDBInfo(function(err, result) {
        maxUserID = result[0]["MAX(User_id)"] + 1;

        postDBInfo(function(err, result) {
            res.send({ success: true });
        });

        console.log({ success: result })
            // res.send({ success: result });
    });
});

app.get('/getFood', (req, res) => {

    var result = false;
    var value = req.query.query
    value = value.slice(1, -1);
    var getDBInfo = function(callback) {
        let sql = "SELECT * FROM gainsday.Food WHERE Name LIKE '%" + value + "%'"
        connection.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                return callback(err);
            }

            console.log(sql)

            if (resp.length) {
                console.log("found foods: ", resp);
                result = resp;
            }

            callback(null, result);
        });
    }

    getDBInfo(function(err, result) {
        console.log({ success: result })
        res.send({ success: result });
    });
});

app.post('/uploadUserConfig', (req, res) => {
    var result = false;

    var postDBInfo = function(callback) {

        let sql = "UPDATE gainsday.User SET First_Name = " + String(req.query.firstname) +
            ", Last_Name = " + String(req.query.lastname) +
            ", Age = " + String(req.query.age) +
            ", Weight = " + String(req.query.weight) +
            ", Height = " + String(req.query.height) +
            "' WHERE User_Id = " + String(req.query.userId);

        connection.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                return callback(err);
            }

            result = true

            callback(null, result);
        });
    }

    postDBInfo(function(err, result) {
        res.send({ success: result });
    });
});

app.get('/getConfig', (req, res) => {

    var result = false;
    var getDBInfo = function(callback) {
        let sql = "SELECT * FROM gainsday.User WHERE User_Id = " + String(req.query.userId)
        connection.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                return callback(err);
            }

            console.log(sql)

            if (resp.length) {
                console.log("found user: ", resp);
                result = resp;
            }

            callback(null, result);
        });
    }

    getDBInfo(function(err, result) {
        console.log({ success: result })
        res.send({ configData: result });
    });
});

app.get('/getMeals', (req, res) => {

    var result = false;
    var userId = req.query.userId
    var getDBInfo = function(callback) {
        let sql = "SELECT * FROM gainsday.Meals WHERE User_Id LIKE " + userId;
        connection.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                return callback(err);
            }

            console.log(sql)

            if (resp.length) {
                console.log("found foods: ", resp);
                result = resp;
            }

            callback(null, result);
        });
    }

    getDBInfo(function(err, result) {
        console.log({ success: result })
        res.send({ success: result });
    });
});

app.get('/getMeal', (req, res) => {

    var result = false;
    var mealId = req.query.mealId
    var getDBInfo = function(callback) {
        let sql = "SELECT * FROM gainsday.Meals WHERE Meal_Id LIKE " + mealId;
        connection.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                return callback(err);
            }

            console.log(sql)

            if (resp.length) {
                console.log("found foods: ", resp);
                result = resp;
            }

            callback(null, result);
        });
    }

    getDBInfo(function(err, result) {
        console.log({ success: result })
        res.send({ success: result });
    });
});

app.post('/updateFoodsInMeal', (req, res) => {
    var result = false;

    var postDBInfo = function(callback) {

        let sql = "INSERT INTO gainsday.FoodsInMeal (Meal_Id, Food_Id, Serving, Unit) VALUES (" + String(req.query.mealId) +
            "," + String(req.query.foodId) +
            "," + String(req.query.serving) +
            "," + String(req.query.unit) +
            ")";

        connection.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                return callback(err);
            }

            result = true

            callback(null, result);
        });
    }

    postDBInfo(function(err, result) {
        res.send({ success: result });
    });
});

app.post('/updateMealData', (req, res) => {
    var result = false;

    console.log("INFO")
    console.log(req.query.mealID)

    var postDBInfo = function(callback) {

        let sql = "UPDATE gainsday.Meals SET Name = " + String(req.query.mealName) +
            ", Calories = " + String(req.query.calories) +
            ", Protein = " + String(req.query.protein) +
            ", Carbs = " + String(req.query.carbs) +
            ", Total_Fat = " + String(req.query.fat) +
            ", Fiber = " + String(req.query.fiber) +
            ", Sugar = " + String(req.query.sugar) +
            "  WHERE Meal_Id = " + String(req.query.mealId);

        connection.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                return callback(err);
            }

            result = true

            callback(null, result);
        });
    }

    postDBInfo(function(err, result) {
        res.send({ success: result });
    });
});

app.get('/getFoodsInMeal', (req, res) => {

    var result = false;
    var mealId = req.query.mealId
    var getDBInfo = function(callback) {
        let sql = "SELECT Food_Id, Serving, Unit FROM gainsday.FoodsInMeal WHERE Meal_Id LIKE " + mealId;
        connection.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                return callback(err);
            }

            console.log(sql)

            if (resp.length) {
                console.log("found foods: ", resp);
                result = resp;
            }

            callback(null, result);
        });
    }

    getDBInfo(function(err, result) {
        console.log({ success: result })
        res.send({ success: result });
    });
});

app.post('/uploadNewMeal', (req, res) => {

    var result = false;

    var getDBInfo = function(callback) {

        let sql = 'SELECT MAX(Meal_Id) FROM gainsday.Meals';
        connection.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                return callback(err);
            }

            console.log(sql)

            if (resp.length) {
                console.log("Previous highest meal id: ", resp);
                result = resp;
            }

            callback(null, result);
        });
    }

    var postDBInfo = function(callback) {
        let sql = "INSERT INTO gainsday.Meals (Meal_Id, User_Id, Name, Calories, Protein, Carbs, Total_Fat, Fiber, Sugar) VALUES" +
            " (" + String(maxMealId) +
            ", " + String(req.query.userId) +
            ", " + String(req.query.mealName) +
            ", " + String(req.query.calories) +
            ", " + String(req.query.protein) +
            ", " + String(req.query.carbs) +
            ", " + String(req.query.fat) +
            ", " + String(req.query.fiber) +
            ", " + String(req.query.sugar) + ");"

        connection.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                return callback(err);
            }

            console.log(sql)

            if (resp.length) {
                console.log("found foods: ", resp);
                result = resp;
            }

            callback(null, result);
        });
    }

    postNewDBInfo = function(callback) {
        let sql = "INSERT INTO gainsday.FoodsInMeal (Meal_Id, Food_Id, Serving, Unit) VALUES" +
            " (" + String(maxMealId) +
            ", " + String(req.query.foodId) +
            ", " + String(req.query.serving) +
            ", " + String(req.query.unit) + ");"

        connection.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                return callback(err);
            }

            console.log(sql)

            if (resp.length) {
                console.log("found foods: ", resp);
                result = resp;
            }

            callback(null, result);
        });
    }

    getDBInfo(function(err, result) {

        console.log("Result search here: ")
        console.log(result[0]["MAX(Meal_Id)"])

        maxMealId = result[0]["MAX(Meal_Id)"] + 1;

        console.log("Meal Id" + maxMealId)

        postDBInfo(function(err, result) {
            console.log(result)
        });

        postNewDBInfo(function(err, result) {
            res.send({ success: maxMealId });
        });

        console.log({ success: result })
            // res.send({ success: result });
    });
});

app.post('/deleteMeal', (req, res) => {

    var result = false;
    var mealId = req.query.mealId


    var removeFromFoodsInMealMealTable = function(callback) {
        let sql = "DELETE FROM gainsday.FoodsInMeal WHERE Meal_Id LIKE " + mealId;

        console.log("FoodsInMeal SQL")
        console.log(sql)
        connection.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                return callback(err);
            }

            console.log(sql)

            if (resp.length) {
                result = true;
            }

            callback(null, result);
        });
    }

    var removeFromMealTable = function(callback) {
        let sql = "DELETE FROM gainsday.Meals WHERE Meal_Id LIKE " + mealId;
        console.log("Meals SQL")
        console.log(sql)
        connection.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                return callback(err);
            }

            console.log(sql)

            if (resp.length) {
                result = true;
            }

            callback(null, result);
        });
    }


    removeFromFoodsInMealMealTable(function(err, result) {
        console.log({ success: result })

        removeFromMealTable(function(err, result) {
            console.log({ success: result })
            res.send({ success: true });
        });
    });
});

app.post('/removeFoodFromMeal', (req, res) => {
    var result = false;

    console.log("INFO")
    console.log(req.query.mealId)

    var postDBInfo = function(callback) {

        let sql = "DELETE FROM gainsday.FoodsInMeal WHERE Meal_Id LIKE " + req.query.mealId + " AND Food_Id LIKE " + String(req.query.foodId);

        connection.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                return callback(err);
            }

            result = true

            callback(null, result);
        });
    }

    postDBInfo(function(err, result) {
        res.send({ success: result });
    });
});

app.get('/getUserInventory', (req, res) => {

    var result = false;
    var userId = req.query.userId
    var getDBInfo = function(callback) {
        let sql = "SELECT * FROM gainsday.Inventory WHERE User_Id LIKE " + userId;
        connection.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                return callback(err);
            }

            console.log(sql)

            if (resp.length) {
                console.log("found foods in inventory: ", resp);
                result = resp;
            }

            callback(null, result);
        });
    }

    getDBInfo(function(err, result) {
        console.log({ success: result })
        res.send({ success: result });
    });
});

app.get('/getShoppingList', (req, res) => {

    var result = false;
    var userId = req.query.userId
    var getDBInfo = function(callback) {
        let sql = "Select * From gainsday.FoodsInMeal Where FoodsInMeal.Meal_Id IN (  Select MealsInPlan.Meal_Id From gainsday.MealsInPlan Where MealsInPlan.MealPlan_Id = (SELECT MealPlans.MealPlan_Id FROM gainsday.MealPlans WHERE User_Id LIKE " + userId + ") ) AND Food_Id Not in (SELECT Food_Id From gainsday.Inventory Where User_Id LIKE " + userId + ")";
        connection.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                return callback(err);
            }

            console.log(sql)

            if (resp.length) {
                console.log("shopping list: ", resp);
                result = resp;
            }

            callback(null, result);
        });
    }

    getDBInfo(function(err, result) {
        console.log({ success: result })
        res.send({ success: result });
    });
});

app.post('/updateUserInventory', (req, res) => {

    var result = false;
    var userId = req.query.userId
    var foodId = req.query.foodId
    var serving = req.query.serving
    var unit = req.query.unit
    var daysLeft = req.query.daysLeft


    var getDBInfo = function(callback) {
        let sql = "INSERT INTO gainsday.Inventory (User_Id, Food_Id, Serving, Unit, Days_Left) VALUES" +
            " (" + String(userId) +
            ", " + String(foodId) +
            ", " + String(serving) +
            ", " + String(unit) + 
            ", " + String(daysLeft) + "');"

        connection.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                return callback(err);
            }

            console.log(sql)

            if (resp.length) {
                result = resp;
            }

            callback(null, result);
        });
    }

    getDBInfo(function(err, result) {
        console.log({ success: result })
        res.send({ success: result });
    });
});

app.post('/deleteInventoryItem', (req, res) => {
    var result = false;

    console.log("INFO")
    console.log(req.query.foodId)

    var postDBInfo = function(callback) {

        let sql = "DELETE FROM gainsday.Inventory WHERE Food_Id LIKE " + String(req.query.foodId) + " AND User_Id LIKE " + String(req.query.userId) + "';";

        connection.query(sql, (err, resp) => {
            if (err) {
                console.log("error: ", err);
                return callback(err);
            }

            result = true

            callback(null, result);
        });
    }

    postDBInfo(function(err, result) {
        res.send({ success: result });
    });
});

app.listen(PORT, () => console.log('API is running on mealprepapp.colnsoq0t3zb.us-east-1.rds.amazonaws.com'));