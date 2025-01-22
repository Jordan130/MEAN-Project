# Blogger Application

## Project Description
Welcome to the Blogger App, a simple and intuitive blogging platform built using the MEAN Stack (MongoDB, Express, Angular, and Node.js) and adhering to the MVC (Model-View-Controller) architecture. 
This application allows users to manage blog posts and interact through comments and reactions. 

## Prerequisites
Make sure you have the following installed on your system before using the application.
1) Install [Node.js and npm (Node Package Manager)](https://nodejs.org/en)
2) Install [MongoDB](https://www.mongodb.com/try/download/community)
3) Create a DB in MongoDB
+ Run `mongosh` in your terminal
+ use <DB>
+  db.createUser({
...   user: "blogger",
...   pwd: "coolBlogger",
...   roles: ["dbOwner"]
... })


## Instructions
### Step 1: Clone the Repository
```sh
   git clone https://github.com/Jordan130/MEAN-Project.git
```
### Step 2: Navigate to the Project Directory
```sh
   cd MEAN-Project
```
### Step 3: Install Dependencies
```sh
   npm install
```
### Step 4: Set Up Environment Variables
+ Create a `.env` file in the root directory and update it with your MongoDB URI and any other configurations you might need:
```sh
   DB_URI=mongodb://<username>:<password>@localhost/<DB>
   JWT_SECRET=secret
```
+ Replace `<username>`, `<password>`, and `<DB>` with your actual MongoDB credentials and database name.
+ The `JWT_SECRET` should be a secure, unique string.
### Step 5: Run The Application
```sh
   npm start
```
### Step 6: View the App
+ Navigate to `http://localhost` (Port 80) to view the app.
