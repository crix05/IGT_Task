import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  image: { 
    type: String 
  },
  stars: { 
    type: Number, 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  numberOfStudentsWatched: { 
    type: Number, 
    required: true 
  },
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
