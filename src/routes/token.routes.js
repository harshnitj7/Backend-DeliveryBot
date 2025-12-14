const express = require('express');
const router = express.Router();
const controller = require('../controllers/token.controller');

router.post('/store', controller.storeToken);     // React
router.post('/verify', controller.verifyToken);   // R-pi

module.exports = router;
