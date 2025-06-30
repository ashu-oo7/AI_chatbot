# 🧠 AI Feedback Dashboard

A full-stack web application inspired by Google's Gemini app that allows users to input queries, get AI-generated feedback, and view previous queries through a sleek dashboard with a persistent history sidebar.

## 🚀 Features

- 🔐 JWT-based Authentication
- 💬 Gemini-like UI with:
  - Fixed top navbar showing user name and logout
  - Sidebar drawer for query history
  - Central chat-like display for question/answer
  - Input box fixed at the bottom
- ⚡ Powered by Google GenAI for responses
- 🗂️ MongoDB backend storing user queries and responses

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- Material-UI (MUI)
- React Router DOM

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens)

---

## 📁 Project Structure

```bash AI_chatbot/
📦 client/         # React Frontend
📦 server/         # Node.js/Express Backend


⚙️ Setup Instructions

1. Clone the repository

    git clone https://github.com/yourusername/ai-feedback-dashboard.git
    cd ai-feedback-dashboard

2. 
A. Start the Backend Server
    Navigate to the server directory

        cd server
        npm install

B. Create a .env file inside server/:

    PORT=5000
    MONGO_URI=mongodb://localhost:27017/yourDB
    ACCESS_SECRET=your_jwt_secret

C.
    Run the backend:

    npm start

3.3. Start the Frontend
    Navigate to the client directory 
        cd ../client
        npm install
        npm run dev

    The frontend will launch at:
    http://localhost:5173

    The backend runs at:
    http://localhost:5000


 🧪 API Endpoints
        Method	   Route	        Description
        POST	/api/auth/register	Register a new user
        POST	/api/auth/login 	Authenticate user/login
        POST	/api/feedback	    Submit query to AI model
        GET	    /api/history	    Get user's feedback history

    All protected routes require a Bearer Token in the Authorization header.

🔐 Authentication Flow

    On login, receive a JWT token and user object.
    Store token and user in localStorage.
    Use token in headers for protected API calls.
    Auto redirect to /dashboard if authenticated.

🖼️ UI Reference

    Designed to visually resemble Gemini by Google with:
    Top black navbar
    Responsive sidebar drawer
    Hover & selection styling on history
    Clean, scrollable question/answer section
    Loader while waiting for AI response    

   

       
   



