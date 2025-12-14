const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/token', require('./routes/token.routes'));

module.exports = app;
