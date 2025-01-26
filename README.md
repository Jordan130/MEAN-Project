# Blogger Application

## Project Description
Welcome to the Blogger App, a simple and intuitive blogging platform built using the MEAN Stack (MongoDB, Express, Angular, and Node.js) and adhering to the MVC (Model-View-Controller) architecture. 
This application allows users to manage blog posts and interact through likes.

## Prerequisites

Before using the application, ensure the following are installed and configured on your system:

1. **Install [Node.js and npm (Node Package Manager)](https://nodejs.org/en):**  
   Node.js is required to run the application, and npm is used to manage dependencies.

2. **Install [MongoDB](https://www.mongodb.com/try/download/community):**  
   MongoDB is the database system used for this application. Follow the link for installation instructions.

3. **Create a Database in MongoDB:**  
   After installing MongoDB, follow these steps to create the required database:
   - Open your terminal and run `mongosh` to access the MongoDB shell.
   - Switch to your desired database (replace `<DB>` with the name of your database):  
     ```shell
     use <DB>
     ```
   - Create a user for the database with the following command:  
     ```javascript
     db.createUser({
       user: "blogger",
       pwd: "coolBlogger",
       roles: ["dbOwner"]
     })
     ```
     This creates a user named `blogger` with the password `coolBlogger` and assigns the `dbOwner` role.

---



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
   JWT_SECRET=your_secure_secret_key_here
```
+ Replace `<username>`, `<password>`, and `<DB>` with your actual MongoDB credentials and database name.
+ The `JWT_SECRET` should be a secure, unique string.
### Step 5: Run The Application
```sh
   npm start
```
### Step 6: View the App
- Open your browser and go to `http://localhost:80` to access the application.
- Log in or register to start managing blog posts!

