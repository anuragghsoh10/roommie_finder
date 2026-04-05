const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
 host: process.env.DB_HOST,
 user: process.env.DB_USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_NAME,
 port: process.env.DB_PORT,
 ssl: { rejectUnauthorized: false }
});

db.connect(err => {
 if (err) {
  console.log("DB Connection Error:", err.message);
  return;
 }
 console.log("MySQL Connected");

 const createUsers = `CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), age VARCHAR(50), gender VARCHAR(50), occupation VARCHAR(255), college_company VARCHAR(255), region VARCHAR(255), mother_tongue VARCHAR(255), budget VARCHAR(255), preferred_location VARCHAR(255), stay_duration VARCHAR(255), mobile VARCHAR(50))`;
 const createProperties = `CREATE TABLE IF NOT EXISTS properties (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), location VARCHAR(255), price VARCHAR(255), type VARCHAR(255), description TEXT, image VARCHAR(500))`;

 db.query(createUsers, (err) => err ? console.log("Users error:", err) : console.log("Users table ready."));
 db.query(createProperties, (err) => err ? console.log("Props error:", err) : console.log("Props table ready."));
});

module.exports = db;