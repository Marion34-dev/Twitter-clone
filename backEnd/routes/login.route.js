import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js'; // Import the User model

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a session and store user data
    req.session.user = { id: user._id, email: user.email, name: user.name };
    res.json({ message: 'You are successfully logged in!', user });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error logging in' });
  }
});

export { router as Login };