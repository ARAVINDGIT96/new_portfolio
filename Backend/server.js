const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();


// =================================
// Middleware
// =================================

app.use(cors());
app.use(express.json());


// =================================
// MongoDB Configuration
// =================================

const mongoURI = process.env.MONGODB_URI;

const dbName = process.env.DB_NAME;


// Check MongoDB URI
if (!mongoURI) {

    console.error("MONGODB_URI is missing.");

    process.exit(1);

}


const client = new MongoClient(mongoURI);

let db;
let contacts;


// =================================
// Connect MongoDB
// =================================

async function connectDatabase() {

    try {

        await client.connect();

        console.log("MongoDB connected successfully.");

        db = client.db(dbName);

        // Create/access contacts collection
        contacts = db.collection("contacts");

        // Test database connection
        await db.command({
            ping: 1
        });

        console.log("Database:", dbName);

        console.log("Collection: contacts");

    } catch (error) {

        console.error(
            "MongoDB connection failed:",
            error.message
        );

        process.exit(1);

    }

}


// =================================
// Home Route
// =================================

app.get("/", (req, res) => {

    res.status(200).send(
        "Backend is running successfully"
    );

});


// =================================
// Database Status Route
// =================================

app.get("/api/db-status", async (req, res) => {

    try {

        await db.command({
            ping: 1
        });

        res.status(200).json({

            success: true,

            message:
                "MongoDB connected successfully"

        });

    } catch (error) {

        console.error(
            "Database Status Error:",
            error.message
        );

        res.status(500).json({

            success: false,

            message:
                "MongoDB connection failed"

        });

    }

});


// =================================
// Contact API
// =================================

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

                message:
                    "Name, email and message are required"

            });

        }


        // Create contact document
        const contactData = {

            name: name.trim(),

            email: email.trim(),

            phone: phone ? phone.trim() : "",

            message: message.trim(),

            createdAt: new Date()

        };


        // Insert into MongoDB
        const result =
            await contacts.insertOne(contactData);


        console.log(
            "Contact saved successfully."
        );

        console.log(
            "Inserted ID:",
            result.insertedId
        );


        res.status(201).json({

            success: true,

            message:
                "Contact details submitted successfully"

        });

    } catch (error) {

    console.error("FULL ERROR:");
    console.error(error);

    res.status(500).json({
        success: false,
        message: error.message
    });

}

});


// =================================
// Start Server
// =================================

const PORT = process.env.PORT;


async function startServer() {

    // First connect MongoDB
    await connectDatabase();


    // Then start Express server
    app.listen(
        PORT,
        "0.0.0.0",
        () => {

            console.log(
                `Server running on port ${PORT}`
            );

        }
    );

}


startServer();