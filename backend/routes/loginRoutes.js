import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate the password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        console.log(validPassword);
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'our_secret_key', { expiresIn: '1h' });
        // console.log(token);
       
        res.status(200).json({ "token" : token, "userId": user._id, userName: user.username, email: user.email });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router