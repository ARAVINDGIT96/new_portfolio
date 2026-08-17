const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();

// =========================
// Middleware
// =========================
app.use(cors());
app.use(express.json());


// =========================
// MySQL Connection
// =========================
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,

    // Connection pool settings
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


// =========================
// Check Database Connection
// =========================
async function checkDatabaseConnection() {

    try {

        const connection = await db.getConnection();

        console.log("Database connected successfully.");

        connection.release();

    } catch (error) {

        console.error("Database connection failed.");
        console.error("Database Error:", error.message);

    }
}


// =========================
// Test API
// =========================
app.get("/", (req, res) => {

    res.status(200).send("Backend is running");

});


// =========================
// Contact API
// =========================
app.post("/api/contact", async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            message
        } = req.body;


        // Validation
        if (!name || !email || !message) {

            return res.status(400).json({
                success: false,
                message: "Name, email and message are required"
            });

        }


        // SQL query
        const sql = `
            INSERT INTO contacts
            (name, email, phone, message)
            VALUES (?, ?, ?, ?)
        `;


        // Execute query
        await db.execute(sql, [
            name,
            email,
            phone,
            message
        ]);


        // Success response
        console.log("Contact details saved successfully.");

        res.status(201).json({
            success: true,
            message: "Contact details saved successfully"
        });


    } catch (error) {

        console.error("Database Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to save contact details"
        });

    }

});


// =========================
// Start Server
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {

    console.log(`Server running on port ${PORT}`);

    await checkDatabaseConnection();

});