![Build and Test](https://github.com/drphamwit/swe-sample-project-github-repo/workflows/Build%20and%20Test/badge.svg)

# WIT MEAL PREP APPLICATION

## Introduction

An online application to help you plan meals for the week

## Functions
1. Manage user accounts
	* Create a new account
	* Log in with existing account credentials
	* Input nutritional preferences or constraints
	
2. Search for foods and view their nutritional information
	* Search for food using the search bar or by scanning a foods barcode
	* The foods nutritional values will be displayed and can be converted into various units
	
3. Build meals consisting of foods selected by the user
	* Create, edit, and delete custom meals.
	* Meals will store foods selected by the user and keep track of the total nutritional value of all foods in a meal
	
4. Track user food inventory 
	* Users can add foods to their inventory and add expiration dates for any food in their inventory

5. Generate meal plans using the users preferences 
	* Generated meals will always be based on what the user can creat with their current inventory  
	* Generated meals will fit within the user's nutritional constraints 

## Getting Started
### Installation and Setup

1. Install Node.js 
2. Clone this repositoary and install dependencies 

		> git clone https://github.com/WIT-SWE-MEAL-PREP/WIT-SWE-MEAL-PREP.git
		> cd mealprep
		> npm install
		> cd ../api
		> npm install

### Run

1. In the mealprep folder run the front end component using the command 

		> npm start

2. In the api folder run the backend with the command, this will have to be re run if you make any changes to the Server.js file 
 
		> node Server.js


## Demo video

youtube.com/watch?v=wg8yniFhkMU

## Contributors

* Patrick Connolly connollyp2@wit.edu, Lead Developer
* Jake Dickinson dickinsonj1@wit.edu, Dev Ops Engineer, Developer
* Sean Crowley crowleys3@wit.edu, Dev Ops Engineer
* Naishvi Patel pateln14@wit.edu, Database Engineer 
* Elvis De Leone deleone2@wit.edu Front/Backend Development 
* Colin Hennessey hennesseyc@wit.edu Full-Stack Developer
* Andy DiCarlo dicarloa@wit.edu Full Stack Developer
