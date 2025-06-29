import express from "express";
import verifyToken from "../middlewares/authmiddleware.js";
import {
  sendFeedback,
  getFeedbackHistory,
} from "../Controllers/feedbackController.js";


const router = express.Router();


router.post("/feedback", verifyToken, sendFeedback);
router.get("/history", verifyToken, getFeedbackHistory);

export default router;
