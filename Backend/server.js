const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// MySQL connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});


// Test API
app.get("/", (req, res) => {

    res.send("Portfolio Backend is running");

});


// Contact API
app.post("/api/contact", async (req, res) => {

    try {

        const { name, email, phone, message } = req.body;


        if (!name || !email || !message) {

            return res.status(400).json({
                success: false,
                message: "Name, email and message are required"
            });

        }


        const sql = `
            INSERT INTO contacts
            (name, email, phone, message)
            VALUES (?, ?, ?, ?)
        `;


        await db.execute(sql, [
            name,
            email,
            phone,
            message
        ]);


        res.status(201).json({
            success: true,
            message: "Contact details saved successfully"
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to save contact details"
        });

    }

});


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});