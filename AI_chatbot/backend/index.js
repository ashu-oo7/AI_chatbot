
import express from 'express';
import { GoogleGenAI } from "@google/genai";
import router from './Controllers/Controller.js'

import dotenv from 'dotenv';

const app = express()
dotenv.config();

app.use('/',router);

const ai = new GoogleGenAI({});


async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

await main();




app.listen(3000,()=>console.log("Server is running"));