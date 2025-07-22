import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/reviews"),
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, `review_${Date.now()}${extension}`);
  },
});

const fileFilter = (_req, file, cb) => {
  const validExtensions = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  cb(null, validExtensions.test(ext));
};

const upload = multer({ storage, fileFilter });

export default upload;

