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
### API Endpoints

### Student

1. **Register a new student**
   - Endpoint: `POST /api/auth/register`
   - Sample Data:
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "password123"
     }
     ```

2. **Login as the student**
   - Endpoint: `POST /api/auth/login`
   - Sample Data:
     ```json
     {
       "email": "john@example.com",
       "password": "password123"
     }
   - This will return an access token that you can use for subsequent authenticated requests.

3. **Get the current user (student)**
   - Endpoint: `GET /api/auth/me`
   - Headers:
     ```
     Authorization: Bearer <access_token>
     ```

4. **Get all courses**
   - Endpoint: `GET /api/courses`

5. **Enroll in a course**
   - Endpoint: `POST /api/enrollments/:courseId`
   - Headers:
     ```
     Authorization: Bearer <access_token>
     ```

6. **Get all enrollments (student)**
   - Endpoint: `GET /api/enrollments`
   - Headers:
     ```
     Authorization: Bearer <access_token>
     ```

7. **Get a specific user (student)**
   - Endpoint: `GET /api/users/:id`
   - Headers:
     ```
     Authorization: Bearer <access_token>
     ```

8. **Update the student's profile**
   - Endpoint: `PUT /api/users/:id`
   - Headers:
     ```
     Authorization: Bearer <access_token>
     ```
   - Sample Data:
     ```json
     {
       "name": "John Doe Updated"
     }
     ```

### Teacher

1. **Register a new teacher**
   - Endpoint: `POST /api/auth/register`
   - Sample Data:
     ```json
     {
       "name": "Jane Smith",
       "email": "jane@example.com",
       "password": "password456",
       "role": "teacher"
     }
     ```

2. **Login as the teacher**
   - Endpoint: `POST /api/auth/login`
   - Sample Data:
     ```json
     {
       "email": "jane@example.com",
       "password": "password456"
     }
   - This will return an access token that you can use for subsequent authenticated requests.

3. **Get the current user (teacher)**
   - Endpoint: `GET /api/auth/me`
   - Headers:
     ```
     Authorization: Bearer <access_token>
     ```

4. **Create a new course**
   - Endpoint: `POST /api/courses`
   - Headers:
     ```
     Authorization: Bearer <access_token>
     ```
   - Sample Data:
     ```json
     {
       "title": "Introduction to Web Development",
       "description": "Learn the basics of web development from scratch.",
       "price": 99.99,
       "topics": ["HTML", "CSS", "JavaScript"]
     }
     ```

5. **Update an existing course**
   - Endpoint: `PUT /api/courses/:id`
   - Headers:
     ```
     Authorization: Bearer <access_token>
     ```
   - Sample Data:
     ```json
     {
       "title": "Advanced Web Development",
       "description": "Take your web development skills to the next level.",
       "price": 149.99
     }
     ```

6. **Delete a course**
   - Endpoint: `DELETE /api/courses/:id`
   - Headers:
     ```
     Authorization: Bearer <access_token>
     ```

7. **Create a new video for a course**
   - Endpoint: `POST /api/videos/:courseId`
   - Headers:
     ```
     Authorization: Bearer <access_token>
     ```
   - Sample Data:
     ```json
     {
       "title": "Introduction to HTML",
       "description": "Learn the basics of HTML structure and syntax.",
       "url": "https://example.com/video1.mp4",
       "duration": 900,
       "order": 1
     }
     ```

8. **Update an existing video**
   - Endpoint: `PUT /api/videos/:courseId/:videoId`
   - Headers:
     ```
     Authorization: Bearer <access_token>
     ```
   - Sample Data:
     ```json
     {
       "title": "HTML Fundamentals",
       "description": "Dive deeper into HTML elements and structure.",
       "duration": 1200
     }
     ```

9. **Delete a video**
   - Endpoint: `DELETE /api/videos/:courseId/:videoId`
   - Headers:
     ```
     Authorization: Bearer <access_token>
     ```

Make sure to replace `<access_token>` with the actual access token obtained during the login process.

You can find more sample requests and responses for the other API endpoints in the project documentation.
## Error Handling

The application implements custom error handling middleware to manage errors effectively. All API responses follow a consistent format for both successful operations and errors.
