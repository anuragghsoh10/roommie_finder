const mysql = require('mysql2');
require('dotenv').config();

// Attempt connection using Aiven credentials from .env
const db = mysql.createConnection({
 host: process.env.DB_HOST,
 user: process.env.DB_USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_NAME,
 port: process.env.DB_PORT || 25060,
 ssl: { rejectUnauthorized: false }
});

console.log("Attempting to connect to host:", process.env.DB_HOST);

db.connect(err => {
 if (err) {
  console.error("❌ BOOM! Connection Failed:");
  console.error(err.message);
  process.exit(1);
 }
 console.log("✅ Successfully connected to cloud database!");

 // Test if tables exist
 db.query("SHOW TABLES", (err, result) => {
  if (err) {
    console.error("❌ Failed to read tables:", err.message);
    process.exit(1);
  }
  
  console.log("✅ Tables found in Database:", result.map(r => Object.values(r)[0]));
  
  // Test if users table specifically exists and has the right columns
  db.query("DESCRIBE users", (err, cols) => {
    if(err) {
      console.error("❌ 'users' table DOES NOT EXIST! Error:", err.message);
      console.log("   --> You must create the table using the SQL script!");
      process.exit(1);
    }
    console.log("✅ 'users' table exists! Columns:", cols.map(c => c.Field));
    process.exit(0);
  });
 });
});
