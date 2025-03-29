// models/user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
});

// Define and export the User model
const User = mongoose.model('User', userSchema);

export default User;  // Use ES6 export default
