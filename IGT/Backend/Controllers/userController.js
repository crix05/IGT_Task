import { User } from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import passwordhash from "password-hash";

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET_KEY;
  return jwt.sign({ id }, secret, { expiresIn: 86400 });
};

export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(401).json({ msg: "Email already registered" });
    }

    const encryptedPassword = passwordhash.generate(password);
    const createdUser = new User({ email, password: encryptedPassword });
    await createdUser.save();

    const authToken = generateToken(createdUser._id);
    return res.status(201).json({
      msg: "Registration successful",
      token: authToken,
      user: createdUser,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await User.findOne({ email });
    if (!userRecord) {
      return res.status(404).json({ msg: "User not found" });
    }

    const passwordMatches = passwordhash.verify(password, userRecord.password);
    if (!passwordMatches) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    const authToken = generateToken(userRecord._id);
    return res.status(200).json({
      msg: "Login successful",
      token: authToken,
      user: userRecord,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};
