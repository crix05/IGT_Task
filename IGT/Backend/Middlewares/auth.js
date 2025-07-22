import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const token = req.header("authorization");

  if (!token) {
    return res.status(401).json({ msg: "Token is missing" });
  }

  const key = process.env.JWT_SECRET_KEY;
  if (!key) {
    return res.status(500).json({ msg: "Internal server error" });
  }

  try {
    const decoded = jwt.verify(token, key);
    req.user = { _id: decoded.id };  
    console.log(decoded, req.user._id)
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
