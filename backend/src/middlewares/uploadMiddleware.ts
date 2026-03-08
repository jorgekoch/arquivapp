import multer from "multer";
import { AppError } from "../errors/AppError";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    const allowedMimeTypes = [
      "application/pdf",
      "audio/mpeg",
      "audio/wav",
      "image/jpeg",
      "image/png",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/msword" // .doc (antigo)
    ];


    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new AppError("File type not allowed", 400));
    }

    cb(null, true);
  },
});