import feedback from "../models/feedback.js";
import { GoogleGenAI } from "@google/genai";

const sendFeedback = async (req, res) => {
  try {
    const { userInput } = req.body;
    const ai = new GoogleGenAI({});

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userInput,
    });

    let responseText = sanitizeResponse(response.text);

    const feedbackData = await feedback.create({
      userId: req.user.id,
      user_input: userInput,
      feedback: responseText,
    });

    res.status(200).json({ user_input: userInput,feedback: responseText });
  } catch (error) {
    console.error("Error sending feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getFeedbackHistory = async (req, res) => {
  try {
  
    const history = await feedback
      .find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    
    res.status(200).json({ history });
  } catch (err) {
    console.error("Error fetching feedback history:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


function sanitizeResponse(text) {
  return text
    .replace(/[#*_`~>-]+/g, "")
    .replace(/\n{2,}/g, "\n")
    .trim();
}
export { sendFeedback, getFeedbackHistory };
