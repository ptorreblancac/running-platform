const express = require("express");
const runsRouter = require("./routes/runs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/runs", runsRouter);

app.get("/", (req, res) => {
    res.json({
        message: "Running Platform API is running!"
    });
}); 

app.use((req, res) => {
    return res.status(404).json({
        message: "Invalid route"
    });
});

module.exports = app;