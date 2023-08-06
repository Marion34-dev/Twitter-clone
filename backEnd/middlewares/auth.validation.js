export const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    // If the user is logged in, proceed to the next middleware or route handler
    next();
  } else {
    // If the user is not logged in, redirect to the login page or send an error response
    res.status(401).json({ message: 'Unauthorized' });
  }
};
