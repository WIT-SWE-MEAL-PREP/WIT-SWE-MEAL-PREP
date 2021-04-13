const dotenv = require("dotenv");
dotenv.config();

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

            callback(null, result);
        });
    }

    getDBInfo(function(err, result) {
        console.log({ success: result })
        res.send({ success: result });
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

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));