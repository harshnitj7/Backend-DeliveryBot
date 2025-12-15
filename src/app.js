const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/v1/health", (req, res) => {
    res.status(200).json({ message: "ok" });
})

app.use('/api/token', require('./routes/token.routes'));

module.exports = app;
