import { Router } from "express";
import { upload } from "../middleware/uploadMiddleware.js";

import {
  getUserInfo,
  loginUser,
  registerUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", (req, res) => {
  console.log("from updlo", req.file)
  // upload.single("image")(req, res, (err) => {
  //   if (err) {
  //     // Multer error (file too large, wrong type)
  //     return res.status(400).json({ message: err.message });
  //   }

  //   if (!req.file) {
  //     return res.status(400).json({ message: "No file uploaded" });
  //   }

  //   try {
  //     const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  //     return res.status(200).json({ imageUrl });
  //   } catch (error) {
  //     console.error("Error generating image URL:", error);
  //     return res.status(500).json({ message: "Server error. Please try again later." });
  //   }
  // });
});

export const AuthRouter = router
