# ChatNova

A full-stack AI-powered chatbot application that allows users to register, authenticate, and interact with an AI through text-based communication.

## Features
1. User Authentication
- Registration: Users can create an account using the registration page.
- Login: Secure login with token-based authentication (JWT) to maintain session integrity.
- Protected Routes: Only authenticated users can access the dashboard and interact with the AI.

2. Dashboard
- AI Interaction: Users can ask questions or interact with the AI through a text-based interface.
- Real-time Responses: The AI responds to user queries instantly in a chat-like interface.

3. Text Input & Voice-to-Text
- Text-Based Interaction: Primary communication with the AI is through typing.
- Voice Recognition: Converts user speech into text for AI interaction.

4. User Information Management
- Fetch User Info: User-specific data (like name, email etc.) is fetched from the backend for personalized experience.
- Profile Display: Dashboard can show user-specific details retrieved from backend APIs.


## Tech Stack
- Frontend: React.js, CSS
- Backend: Node.js, Express.js
- Database: MySQL 
- Authentication: JWT (JSON Web Tokens)
- AI Integration: Google Gemini API
- Other: Axios for HTTP requests, Web Speech API for voice    recognition


## License 
- This project is licensed under the MIT license

### **Installation**
- Clone the repository → git clone https://github.com/psawner/chatNova.git
cd chatNova

## Set up the backend →
cd backend
npm install bcrypt cors dotenv express jsonwebtoken mysql2 @goole/gemini
npm start


## Open the Frontend
cd frontend  //except chatbackend
npm install
npm start

just Just open index.html in your browser, or serve it with a live server.
Make sure your frontend API calls point to http://localhost:4000.


## Usage
- Register a new user account.
- Login with email and password.
- After authentication, you'll land on the dashboard.
- Ask anything to the AI through the chat interface.
- use voice-to-text for speech input.
- User-specific information is displayed and fetched dynamically from the backend.

## Future Enhancements
- Multi-language support for text and voice.
- Chat history and analytics for users.
- Dark mode and responsive UI improvements.