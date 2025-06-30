
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import feedbackRoutes from './routes/feedbackroutes.js';  
import cookieParser from 'cookie-parser'; 
import cors from 'cors' 
import connectDB from './db.js'; 

import dotenv from 'dotenv';

const app = express()
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use('/api/auth/', authRoutes);
app.use('/api/', feedbackRoutes);

connectDB().then(() => {
  
  
})

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});



