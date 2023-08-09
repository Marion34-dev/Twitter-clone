import express from 'express';
import User from '../models/user.model.js'; // Import the User model
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password, username, name } = req.body;

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: 'User already exists' });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.json({ message: 'This username already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      username,
    });

    // Save the new user to the database
    await newUser.save();

    res.json({ message: 'Registration successful' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

export { router as Register };