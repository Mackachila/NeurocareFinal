// Middleware to ensure the user is authenticated (has email and role in session)
function isAuthenticated(req, res, next) {
  if (!req.session || !req.session.email || !req.session.role) {
    return res.redirect('/auth'); // Redirect to login if not authenticated
  }
  next();
}

// Middleware to check if the user has the required role
function hasRole(requiredRole) {
  return (req, res, next) => {
    if (req.session.role !== requiredRole) {
      return res.redirect('/auth');
        }
    next(); // Proceed to the requested page if they have the correct role
  };
}

module.exports = { isAuthenticated, hasRole };
