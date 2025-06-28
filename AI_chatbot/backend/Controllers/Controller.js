import express from 'express'

const router = express.Router()

router.post("/api/auth/register",register);
router.post("/api/auth/login", login);
router.use("/api/feedback", isAuthenticated, feedback);
router.use("/api/history", isAuthenticated, history);



export default router
