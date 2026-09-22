const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM runs ORDER BY date DESC");

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query("SELECT * FROM runs WHERE id = $1 ORDER BY date DESC",[id]);

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            date, 
            distance,
            duration,
            run_type,
            elevation,
            heart_rate,
            notes
        } = req.body;

        const result = await pool.query(
            `INSERT INTO runs
            (date, distance, duration, run_type, elevation, heart_rate, notes)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [date, distance, duration, run_type, elevation, heart_rate, notes]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const {
            date, 
            distance,
            duration,
            run_type,
            elevation,
            heart_rate,
            notes
        } = req.body;

        const result = await pool.query(
            `UPDATE runs
            SET date = $1, distance = $2, duration = $3, run_type = $4, elevation = $5,
            heart_rate = $6, notes = $7
            WHERE id = $8
            RETURNING *`,
            [date, distance, duration, run_type, elevation, heart_rate, notes, id]
        );

        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query(
             `DELETE FROM runs
              WHERE id = $1`, [id]
        );

        res.json({ message : "Run deleted succesfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;