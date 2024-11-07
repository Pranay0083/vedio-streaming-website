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

## API Endpoints

Here are the available API endpoints:

### Auth Routes

- `POST /api/auth/register` - Register a new user
  ```` 
  {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
  }
  ````
- `POST /api/auth/login` - Login a user
  ````
  {
  "email": "john@example.com",
  "password": "password123"
  }
  ````
- `GET /api/auth/me` - Get the currently authenticated user
  ````
  Authorization: Bearer <access_token>
  ````

### Courses Routes

- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get a specific course
- `POST /api/courses` - Create a new course (requires 'teacher' role)
- `PUT /api/courses/:id` - Update a course (requires 'teacher' role)
- `DELETE /api/courses/:id` - Delete a course (requires 'teacher' role)

### Enrollments Routes

- `GET /api/enrollments` - Get all enrollments (authenticated user)
- `POST /api/enrollments/:courseId` - Create a new enrollment (authenticated user)
- `DELETE /api/enrollments/:courseId` - Delete an enrollment (authenticated user)

### Instructors Routes

- `GET /api/instructors` - Get all instructors
- `GET /api/instructors/:id` - Get a specific instructor

### Users Routes

- `GET /api/users/:id` - Get a specific user (authenticated user)
- `PUT /api/users/:id` - Update a user (authenticated user)
- `DELETE /api/users/:id` - Delete a user (authenticated user)

### Videos Routes

- `GET /api/videos/:courseId` - Get all videos for a course (authenticated user)
- `GET /api/videos/:courseId/:videoId` - Get a specific video (authenticated user)
- `POST /api/videos/:courseId` - Create a new video (requires 'teacher' role)
- `PUT /api/videos/:courseId/:videoId` - Update a video (requires 'teacher' role)
- `DELETE /api/videos/:courseId/:videoId` - Delete a video (requires 'teacher' role)

### Payments Routes

- `POST /api/payments` - Handle payments

You can find more sample requests and responses for the other API endpoints in the project documentation.
## Error Handling

The application implements custom error handling middleware to manage errors effectively. All API responses follow a consistent format for both successful operations and errors.
