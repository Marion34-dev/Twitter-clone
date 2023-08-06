import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Error logging out' });
    } else {
      res.json({ message: 'You\'ll be missed!' });
    }
  });
});

export { router as Logout };