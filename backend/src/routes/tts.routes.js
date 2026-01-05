import { Router } from "express";
import multer from "multer";

import {
  generateAudioFromText,
  pdfToText,
  previewSpeech
} from "../controllers/tts.controller.js";

const router = Router();

/* =============================
   Multer (PDF only)
============================= */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  }
});

/* =============================
   Routes
============================= */
router.post("/text", generateAudioFromText);
router.post("/pdf", upload.single("file"), pdfToText);
router.post("/preview", previewSpeech);

export default router;