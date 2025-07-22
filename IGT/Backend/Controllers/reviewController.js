import ReviewModel from "../Models/reviewModel.js";

export const createCourseReview = async (req, res) => {
  try {
    const { stars, title, numberOfStudentsWatched } = req.body;
    // console.log("req.user:", req.user);
    const imagePath = req.file?.path || null;
    const newReview = await ReviewModel.create({
      user: req.user._id,
      image: imagePath,
      stars,
      title,
      numberOfStudentsWatched
    });
    return res.status(201).json(newReview);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateCourseReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const reviewDoc = await ReviewModel.findById(reviewId);

    console.log(reviewId, reviewDoc)

    if (!reviewDoc) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (reviewDoc.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this review" });
    }

    const { stars, title, numberOfStudentsWatched } = req.body;

    reviewDoc.image = req.file?.path || reviewDoc.image;
    reviewDoc.stars = stars ?? reviewDoc.stars;
    reviewDoc.title = title ?? reviewDoc.title;
    reviewDoc.numberOfStudentsWatched = numberOfStudentsWatched ?? reviewDoc.numberOfStudentsWatched;

    await reviewDoc.save();
    return res.json(reviewDoc);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCourseReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const reviewDoc = await ReviewModel.findById(reviewId);

    console.log(reviewId, reviewDoc)

    if (!reviewDoc) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (reviewDoc.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }

    await reviewDoc.deleteOne();
    return res.json({ message: "Review deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllCourseReviews = async (req, res) => {
  try {
    const allReviews = await ReviewModel.find();
    return res.json(allReviews);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
