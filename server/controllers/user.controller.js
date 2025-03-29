// controllers/user.controller.js
import User from '../models/user.model.js';  // Ensure correct import

// Create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: 'Error creating user' });
    }
};

// List all users
const listUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: 'Error retrieving users' });
    }
};

// Delete multiple users
const removeManyUsers = async (req, res) => {
    try {
        const { ids } = req.body;
        await User.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ message: 'Users deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error deleting users' });
    }
};

// Get user by ID
const userByID = async (req, res, next, id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        req.profile = user;  // Attach user to request object
        next();
    } catch (error) {
        res.status(400).json({ error: 'Error retrieving user' });
    }
};

// Read a specific user by ID
const readUser = (req, res) => {
    res.status(200).json(req.profile);
};

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.profile._id,
            { name, email, password, updated: Date.now() },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: 'Error updating user' });
    }
};

// Delete a user by ID
const removeUser = async (req, res) => {
    try {
        await req.profile.remove();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error deleting user' });
    }
};

export default {
    createUser,
    listUsers,
    removeManyUsers,
    userByID,
    readUser,
    updateUser,
    removeUser
};
