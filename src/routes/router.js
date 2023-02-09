const express = require('express');
const Controller = require('../controllers/controller');

const router = express.Router();

router.get('/hello', Controller.helloWorld);

module.exports = router;
