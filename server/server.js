// Import all necessary modules for app 
require('dotenv').config(); 

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");
const NodeCache = require("node-cache");

// ===========================================================
// CREATE WEB SERVER AND SETUP SERVER CONFIGURATIONS
// ===========================================================
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
const port = 3306;

const pswrd = process.env.PASSWORD;
const cache = new NodeCache();

// Establish connection to SQL database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: pswrd,
    database: "meal_planner",
    port: port
});

// ===========================================================
// CREATE APP DATABASE AND TABLES
// ===========================================================
db.connect((err) => 
    {
        if (err) console.log(`=== ERROR: COULDN'T CONNECT TO DATABASE: ${err} ===`);
        else {
            // Create new database for user to access and store data into
            // const create_database = ` CREATE DATABASE meal_preferences`;

            // db.query(create_database, (err) => {
            //     if (err) console.log(`=== ERROR CREATING DATABASE: ${err}  ===`);
            //     else console.log(`=== DATABASE CONNECTION SUCCESSFUL ===`);
            // });

            console.log(`=== DATABASE CONNECTION SUCCESSFUL ===`);
        };
    }
);

// Create users table to store user information - id, name, and budget
// const create_users = ` CREATE TABLE IF NOT EXISTS users 
//                         (id INT AUTO_INCREMENT PRIMARY KEY, 
//                         name VARCHAR(50), 
//                         budget FLOAT)`;
// db.query(create_users, (err) => {
//     if (err) console.log(`=== ERROR CREATING USERS TABLE ${err} ===`);
//     else console.log(`=== USERS TABLE SUCCESSFULLY CREATED ===`);
// })

// Create preferences table to store user meal preferences. user_id references id in user table
// const create_preferences = ` CREATE TABLE IF NOT EXISTS preferences 
//                             (user_id INT, cuisine varchar(50))`;
// db.query(create_preferences, (err) => {
//     if (err) console.log(`=== ERROR CREATING TABLE: ${err}  ===`);
//     else console.log(`=== PREFERENCES TABLE SUCCESSFULLY CREATED ===`);
// });

// ===========================================================
// CREATE NEW USER AND STORE PREFERENCES
// ===========================================================
// Save all selected user preferences to database
function savePreferences(user_id, cuisines) {
    ` 
        Save all user's preferred meals to the database for long term storage
        Cache the preferred meals for faster data access while user on app
        Function only used when new user creates an account. Separate API function
        used to update user preferences.

        user_id - integer that uniquely identifies the user
        cuisine - array of the user's preferred cuisines (min 3 cuisines, max 5)
    `
    console.log(`=== SAVING ${cuisines} FOR USER ${user_id} === `);

    // Cache user cuisines for faster retrieval 
    cache.set("preferredCuisines", cuisines);

    // Store each listed cuisine in preferences table
    cuisines.forEach((cuisine) => {
        const insert_cuisine = `INSERT INTO preferences(user_id, cuisine) VALUES(?,?)`;

        db.query(insert_cuisine, [user_id, cuisine,], (err) => {
            if (err) return console.log(`There was an error saving your preferred cuisine`);

        });
    });

    console.log(`=== SUCCESSFULLY SAVED CUISINE PREFERENCES FOR USER ${user_id} ===`);
}

// ===========================================================
// SAVE USER DATA TO DATABASE
// ===========================================================
app.post("/create-user", (req, res) => {
    ` Save user name, budget, and cuisine preferences to database `
    console.log(`=== CREATING NEW USER ===`);

    // Parse request to get all user info
    let name = req.body.name;
    let budget = req.body.budget;
    let cuisines = req.body.cuisine;
    console.log(`Passed values: name - ${name}, budget - ${budget}, cuisines - ${cuisines}`);

    // Check that the name hasn't already been taken
    const hasName = `SELECT * FROM users WHERE name=?`;

    db.query(hasName, [name,], (err, result) => {
        console.log(`HasName result: ${JSON.stringify(result)}`);

        if (err) {
            console.log(" === ERROR LOCATING USER === ");
            return res.json({
                "status": 404,
                "body": "Error: Cannot locate provided user"});
        }

        // If a result is returned from this query, then name already taken
        if (result.length > 0) { 
            return res.json({
                "status": 401,
                "body": "Error: Username already taken"
            }); 
        }
        else {
            const insert_user = `INSERT INTO users(name, budget) VALUES(?,?)`;

            db.query(insert_user, [name, budget,], (err, result) => {
                console.log(`Insert user result: ${JSON.stringify(result)}`);

                if (err) {
                    console.log(` === ERROR CREATING NEW USER: ${err} === `);
                    return res.json({ 
                        "status": 500,
                        "body": `Error: Cannot create a new user, ${err}`
                    });
                }
                else { 
                    console.log(` === SUCCESSFULLY CREATED NEW USER === `);
                    savePreferences(result.insertId, cuisines); 
                    
                    // Store returned user ID in a new user session

                    return res.json({
                        "status": 200,
                        "id": result.insertId,
                        "body": `Successfully created User ${name}`
                    });
                }
            })
        }
    });
});

// ===========================================================
// API REQUESTS
// ===========================================================
// Sanitize data from API request
function parseResponse(meal) {
    `  
        Extract necessary data from API request and save data for each meal as an object
        where each key specifies the type of data being saved. Key values include:
        name - name of the meal, instructions - meal recipe, ingredients - meal
        ingredients, serving_size - meal serving size, ...

        The values are the actual values pulled from the API respone. When parsing the
        data, the keys come directly from the Tasty API documentation. The new object is then cached.
        The cache key is the name of the meal being saved and the value is the object containing
        the parsed API data.
    `
    try {
        console.log(`Current meal: ${meal}`);
        let newMeal = new Object();

        newMeal["name"] = meal["name"];
        newMeal["instructions"] = meal["instructions"];
        newMeal["ingredients"] = meal["sections"][0]["components"];

        newMeal["serving_size"] = meal["num_servings"];
        newMeal["cook_time"] = meal["total_time_minutes"];

        newMeal["mealPrice"] = meal["price"]["total"];
        newMeal["mealImage"] = meal["thumbnail_url"];
        newMeal["mealAltText"] = meal["thumbnail_alt_text"];

        console.log(`Parsed data: ${JSON.stringify(newMeal)}`);

        // Cache all necessary data associated with each meal 
        cache.set(meal, newMeal);
    } catch {
        console.error("There was an error parsing the data");
    }
}

// Fetch data for a specific cuisine and parse response data
async function getCuisines(cuisine) {
    try {
        const response = await fetch(`${process.env.MEALS_ENDPOINT}?from=0&size=7&tags=${cuisine}`,
            {
                headers: {
                    "x-rapidapi-host": "tasty.p.rapidapi.com",
                    "x-rapidapi-key" : process.env.API_AUTH_KEY
                }
            }
        );
        const data = await response.json();
        console.log(`API fetch result: ${data}`);

        // Sanitize each response returned from API call and save to cache
        let meals = data["results"].forEach((meal) => parseData(meal));

        return meals;
    } 
    catch {
        console.error(`New Error`);
    }
};

// Fetch meal data for each preferred cuisine
app.get("/get-cuisines", (req, res) => {
    try {
        // Get list of cuisines from user
        const cuisines = req.body.cuisines;
        console.log(`User Cuisines: ${cuisines}`);

        // For each cuisine, make API call to endpoint if cuisine data not already saved
        cuisines.forEach((cuisine) => {
            // Check if the current cuisine has already been cached before making a new API call
            const hasCuisine = cache.get(cuisine);
            console.log(`Cached cuisine from hasCuisine: ${hasCuisine}`);

            if (hasCuisine === undefined) {
                let newCuisine = getCuisines(cuisine);

                res.json({
                            "status": 200, 
                            "message": `Successfully fetched new cuisine ${cuisine}`,
                            "body": newCuisine
                        });
            }
            else { 
                res.json({
                            "status": 200, 
                            "message": `Successfully fetched cached cuisine ${cuisine}`,
                            "body": hasCuisine
                        });
            }
        });
    } catch (error) {
        res.json({
                    "status": 500, 
                    "message": `Failed to fetch cuisines: ${error}`,
                    "body": hasCuisine
                });
    }
    
});

app.listen(3000, () => {
    console.log("=== WEB SERVER STARTED ===");
});