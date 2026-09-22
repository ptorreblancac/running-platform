const express = require("express");
const pool = require("./db");
const runsRouter = require("./routes/runs");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/runs", runsRouter);

app.get("/", (req, res) => {
    res.json({
        message: "Running Platform API is running!"
    });
}); 

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});