# vedio-streaming-website
# Education Platform

A full-stack learning management system built with Node.js and MongoDB, designed to provide a comprehensive online learning experience.

## Features

- **User Management**
  - Authentication & Authorization
  - Role-based access control (Student, Teacher, Admin)
  - User profile management

- **Course Management**
  - CRUD operations for courses
  - Course enrollment system
  - Video content management
  - Payment integration

- **Content Delivery**
  - Structured video lessons
  - Real-time comment systems
  - Progress tracking

- **Administration**
  - Admin interface for platform management
  - Instructor management
  - Content moderation

## Motivation

The platform was developed to create a scalable and secure educational environment that prioritizes both usability and performance. Our focus was on building a user-friendly interface supported by robust backend architecture to ensure a seamless learning experience.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/your-repo.git
```

2. Navigate to the project directory
```bash
cd your-repo
```

3. Install dependencies
```bash
npm install
```

4. Create a `.env` file in the root directory with the following variables:
```plaintext
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

5. Start the application
```bash
npm start
```

## Database Schema

### User Schema
```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
}, { timestamps: true });
```

### Course Schema
```javascript
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  topics: [String],
}, { timestamps: true });
```

### Enrollment Schema
```javascript
const enrollmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  enrolledAt: { type: Date, default: Date.now },
  completedAt: Date
});
```

### Video Schema
```javascript
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  url: { type: String, required: true },
  duration: Number,
  order: { type: Number, required: true }
}, { timestamps: true });
```

## API Documentation

### Authentication Routes

#### Register User
```
POST /api/auth/register
Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
Response:
{
  "message": "User created successfully",
  "userId": "user_id"
}
```

#### Login
```
POST /api/auth/login
Request:
{
  "email": "john@example.com",
  "password": "password123"
}
Response:
{
  "message": "Login successful",
  "userId": "user_id",
  "token": "jwt_token"
}
```

### Course Routes

#### Get All Courses
```
GET /api/courses
Response:
[
  {
    "title": "Introduction to Node.js",
    "description": "A beginner's guide",
    "instructor": {
      "name": "Instructor Name"
    }
  }
]
```

#### Create Course
```
POST /api/courses
Request:
{
  "title": "Introduction to Node.js",
  "description": "A beginner's guide",
  "instructor": "instructor_id"
}
Response:
{
  "message": "Course created successfully"
}
```

### Video Routes

#### Get Course Videos
```
GET /api/courses/:courseId/videos
Request:
Header: { "Authorization": "Bearer jwt_token" }
Response:
[
  {
    "title": "Intro to JavaScript",
    "url": "video_url",
    "duration": 120,
    "order": 1
  }
]
```

### Enrollment Routes

#### Enroll in Course
```
POST /api/enrollments/:courseId
Request:
Header: { "Authorization": "Bearer jwt_token" }
Response:
{
  "message": "Enrolled in course successfully"
}
```

### Payment Routes

#### Create Payment Session
```
POST /api/payments/create-session
Request:
{
  "Authorization": "Bearer jwt_token",
  "courseId": "courseId"
}
Response:
{
  "message": "Payment session created successfully"
}
```

## Error Handling

The application implements custom error handling middleware to manage errors effectively. All API responses follow a consistent format for both successful operations and errors.
