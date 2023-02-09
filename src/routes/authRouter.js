const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/update', authController.updateUser);
router.delete('/delete', authController.deleteUser);

module.exports = router;
