/*
 ~~ Model ~~
Contains the logical operations between the Database and Node.js:
Specifically the User Table
*/

// userID
// firstName
// lastName
// userAge
// gender
// userRole
// emailAdd
// userPass
// userProfile

// Import the mysql2 Library/Framework
import mysql from 'mysql2'
// import {pool} from '../config/config.js'

import {config} from 'dotenv'
config()

const pool = mysql.createPool({
    port: process.env.MYSQL_ADDON_PORT,   
    host: process.env.MYSQL_ADDON_HOST,   
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    uri: process.env.MYSQL_ADDON_URI,
  }).promise();
// .promise() ??

// Retrieving all the data from the user table in mysql database
const getUsers = async () => {
  // Setting a variable to save the result of the prepared statement 
  const [allUsers] = await pool.query(`
    SELECT * FROM userTable
    `); // Prepared Statement: retrieves all users
  return allUsers;
};

// Retrieving a single record by its id from the user table in mysql database
const getUser = async (userID) => {
  // Setting a variable to save the result of the prepared statement
  const [singleUser] = await pool.query(
    `
    SELECT  * FROM userTable WHERE userID = ?
    `,
    [userID]
  ); // Prepared Statement: retrieves a single user by its ID
  return singleUser;
};

// Adding a new user to the table of the mysql database
const addUser = async (
  firstName,
  lastName,
  userAge,
  gender,
  emailAdd,
  userPass,
  userProfile
) => {
  //
  const [newUser] = await pool.query(
    `
    INSERT INTO userTable (firstName,lastName,userAge,gender,emailAdd,userPass,userProfile) VALUES (?,?,?,?,?,?,?)
    `,
    [firstName, lastName, userAge, gender, emailAdd, userPass, userProfile]
  ); // Prepared Statement:
  //
  return newUser.insertId;
};

// Adding a new user to the table of the mysql database
const updateUser = async (firstName, userAge, userID) => {
  //
  const [alteredUser] = await pool.query(
    ` 
    UPDATE userTable SET firstName=?,userAge=? WHERE (userID=?)
    `,
    [firstName, userAge, userID]
  ); //
  return alteredUser;
};

// Removing a user from the table of the mysql database
const deleteUser = async (userID) => {
  //
  const [deletedUser] = await pool.query(
    `
    DELETE FROM userTable WHERE (userID = ?)
    `,
    [userID]
  ); // Prepared Statement:
  return deletedUser;
};

// Removing all users from the table of the mysql database
const deleteUsers = async () => {
  //
  await pool.query(`TRUNCATE userTable`); // Prepared Statement:
  //
  const [deletedUsers] = await pool.query(`
    SELECT userID,emailAdd,userProfile
    `); // Prepared Statement:
  return deletedUsers;
};

// Retrieve users data, Retrieve user hashPassword, Check users data matches

// Test code
// console.log(await deleteUsers())
console.log(process.env.MYSQL_ADDON_PORT);

// console.log(await getUsers());
// console.log(await addUser('Seth','Tobias',20,'Male','email@add','1234','Rain'));
// firstName,lastName,userAge,gender,emailAdd,userPass,userProfile

// Exporting the function expressions for later use in the server.js and/or index.js
