Blog API
A RESTful Blog API built to handle core blogging features such as user authentication, blog post management, and interactions like comments and likes. This project demonstrates backend development best practices including clean architecture, secure authentication, and proper error handling.
🚀 Overview
This API allows users to:
Register and log in securely
Create, read, update, and delete blog posts
Comment on blog posts
Like and unlike blog posts
Access protected routes using JWT authentication
It is designed to be scalable, easy to maintain, and suitable for real-world applications.
✨ Features
User authentication (JWT)
Password hashing with bcrypt
CRUD operations for blog posts
Comment system
Like / Unlike functionality
Role-based authorization (User / Admin)
Input validation and centralized error handling
🛠 Tech Stack
Node.js – Runtime environment
Express.js – Web framework
MongoDB – NoSQL database
Mongoose – ODM for MongoDB
JWT (JSON Web Tokens) – Authentication
bcrypt – Password hashing
dotenv – Environment variable management
📦 Installation & Setup
1. Clone the repository
git clone https://github.com/emmanuelxkyval-png/blog-api.git 
2. Navigate into the project directory
cd blog-api 
3. Install dependencies
npm install 
4. Create a .env file
PORT=5000 MONGO_URI=your_mongodb_connection_string JWT_SECRET=your_jwt_secret 
5. Start the server
npm run dev 
The API will be available at:
http://localhost:5000 
🔑 Authentication
This API uses JWT (JSON Web Tokens) for authentication.
For protected routes, include the token in the request header:
Authorization: Bearer <your_token> 
📚 API Endpoints
Auth Routes
MethodEndpointDescriptionPOST/api/auth/registerRegister a new userPOST/api/auth/loginLogin a user 
Blog Post Routes
MethodEndpointDescriptionGET/api/postsGet all blog postsGET/api/posts/:idGet a single postPOST/api/postsCreate a new postPATCH/api/posts/:idUpdate a postDELETE/api/posts/:idDelete a post 
Comment Routes
MethodEndpointDescriptionPOST/api/posts/:id/commentsAdd a commentGET/api/posts/:id/commentsGet all comments for a post 
Like Routes
MethodEndpointDescriptionPOST/api/posts/:id/likeLike or unlike a post 
📤 Example Request
Create a new blog post
POST /api/posts { "title": "Understanding REST APIs", "content": "This article explains the basics of RESTful APIs." } 
✅ Example Response
{ "status": "success", "data": { "id": "65abc123", "title": "Understanding REST APIs", "content": "This article explains the basics of RESTful APIs", "author": "userId", "createdAt": "2026-01-15T10:30:00Z" } } 
⚠️ Error Handling
All errors follow a consistent format:
{ "status": "error", "message": "Resource not found" } 
Common HTTP status codes used:
400 – Bad Request
401 – Unauthorized
403 – Forbidden
404 – Not Found
500 – Server Error
🔮 Future Improvements
Pagination and search filtering
Image upload for blog posts
API documentation with Swagger
Rate limiting and request throttling
User profile management
👨‍💻 Author
Ekwem Chidumaga Emmanuel
Backend Developer (Junior / Intern Level)
GitHub: https://github.com/emmanuelxkyval-png
📄 License
This project is licensed for learning and personal use.
