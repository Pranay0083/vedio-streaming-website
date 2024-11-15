# Learning Management System API

A robust education platform API built with Node.js, Express, and MongoDB for managing courses, enrollments, and user interactions.

## Features
- 🔐 **Authentication & Authorization**
- 👥 **User Management** (Student/Teacher/Admin roles)
- 📚 **Course Management**
- ✍️ **Enrollment System**
- 💳 **Payment Integration** (Coming soon)
- 🎯 **Role-based Access Control**

## Tech Stack
- Node.js
- Express
- MongoDB
- JWT Authentication
- bcryptjs
- Mongoose

## Installation

### Clone the repository
```bash
git clone <repository-url>
```

### Navigate to the project directory
```bash
cd your-repo
```

### Install dependencies
```bash
npm install
```

### Environment Setup
Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Start the server
#### Development
```bash
npm run dev
```

#### Production
```bash
npm start
```

## Usage

Start the server:
```bash
npm start
```

Server runs on: [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Authentication
- **POST /api/auth/register** - Register user
- **POST /api/auth/login** - Login user
- **POST /api/auth/logout** - Logout user
- **GET /api/auth/me** - Get current user

### Courses
- **GET /api/courses** - Get all courses
- **GET /api/courses/:id** - Get specific course
- **POST /api/courses** - Create course (Teacher only)
- **PUT /api/courses/:id** - Update course (Teacher only)
- **DELETE /api/courses/:id** - Delete course (Teacher only)

### Enrollments
- **GET /api/enrollments** - Get user enrollments
- **POST /api/enrollments/:courseId** - Enroll in course
- **DELETE /api/enrollments/:courseId** - Cancel enrollment

### Users
- **GET /api/users/:id** - Get user profile
- **PUT /api/users/:id** - Update user profile
- **DELETE /api/users/:id** - Delete user

### Payments
- **POST /api/payments/create-session** - Create payment session (Coming soon)

## Data Models

### User
```json
{
  "name": "String",
  "email": "String",
  "password_hash": "String",
  "role": ["student", "teacher", "admin"],
  "image": "String",
  "expertise": "String",
  "rating": "Number",
  "students": "Number",
  "courses": "Number",
  "bio": "String",
  "about": "String",
  "achievements": ["String"],
  "socialLinks": {
    "linkedin": "String",
    "twitter": "String"
  }
}
```

### Course
```json
{
  "title": "String",
  "description": "String",
  "instructor": "ObjectId",
  "price": "Number",
  "isPaid": "Boolean",
  "topics": ["String"]
}
```

### Enrollment
```json
{
  "user": "ObjectId",
  "course": "ObjectId",
  "enrolledAt": "Date",
  "completedAt": "Date"
}
```

### Payment
```json
{
  "user": "ObjectId",
  "course": "ObjectId",
  "amount": "Number",
  "status": ["pending", "completed", "failed"],
  "paymentMethod": "String",
  "transactionId": "String"
}
```

## Error Handling
Centralized error handling middleware for consistent error responses across the API.

## Contributing

1. Fork the repository
2. Create a feature branch:
```bash
git checkout -b feature/your-feature
```
3. Commit your changes:
```bash
git commit -m "Add your feature"
```
4. Push to the branch:
```bash
git push origin feature/your-feature
```
5. Open a pull request

## Contact
For any inquiries, please contact [pranay.vishwakarma7400@gmail.com].
