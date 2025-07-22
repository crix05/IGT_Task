import express from "express";
const router = express.Router();
import {
  createCourseReview,
  updateCourseReview,
  deleteCourseReview,
  getAllCourseReviews,
} from '../Controllers/reviewController.js';

import { authenticateUser } from "../Middlewares/auth.js";
import uploadMiddleware from "../Middlewares/imgUpload.js";
import { registerUser, loginUser } from "../Controllers/userController.js";

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/reviewadd", authenticateUser, uploadMiddleware.single("image"), createCourseReview);
router.put("/reviewUpdate/:id", authenticateUser, uploadMiddleware.single("image"), updateCourseReview);
router.delete("/:id", authenticateUser, deleteCourseReview);
router.get("/getAll", getAllCourseReviews);

export default router;
