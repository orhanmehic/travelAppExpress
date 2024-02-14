const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Define routes
router.post('/login', userController.authenticateUser);
router.post('/register', userController.registerUser);
router.get('/admin/users', userController.getAllUsers);
router.post('/admin/users', userController.addUser);
router.post('/admin/users/:userId', userController.activateDeactivateUser)

module.exports = router;