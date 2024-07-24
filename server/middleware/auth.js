
import jwt from "jsonwebtoken";

// In verifyToken middleware
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      console.log('No token provided');
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    } else {
      console.log('Invalid token format');
      return res.status(403).send("Access Denied");
    }

    console.log('Token received:', token);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error('Error verifying token:', err.message);
    res.status(500).json({ error: err.message });
  }
};
