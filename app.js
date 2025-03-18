
const express = require("express");
const mysql = require("mysql2");
const app = express();

const pool = mysql.createPool({
    host: "Anars-MacBook-Pro.local",
    user: "root",
    password: "kllko",
    database: "e_commerse",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }

    console.log("Connected to MySQL!");
    connection.release();
});

app.get("/users", (req, res) => {
    pool.query("SELECT * FROM users", (err, rows) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Error fetching data from database");
            return;
        }
        res.json(rows);
    });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
