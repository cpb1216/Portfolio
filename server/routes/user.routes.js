import express from 'express';
import userCtrl from '../controllers/user.controller.js';  // Ensure correct import

const router = express.Router();

// Route for creating a user (POST)
router.route('/api/users').post(userCtrl.createUser);

// Route for listing all users (GET)
router.route('/api/users').get(userCtrl.listUsers);

// Route for removing many users (DELETE)
router.route('/api/users').delete(userCtrl.removeManyUsers);

// Route param to handle user by ID
router.param('userId', userCtrl.userByID);

// Route for getting a user by ID (GET)
router.route('/api/users/:userId').get(userCtrl.readUser);

// Route for updating a user by ID (PUT)
router.route('/api/users/:userId').put(userCtrl.updateUser);

// Route for deleting a user by ID (DELETE)
router.route('/api/users/:userId').delete(userCtrl.removeUser);

export default router;
