# StudyNotion Backend Readme

## Introduction

StudyNotion is a fully functional ed-tech platform that enables users to create, consume, and rate educational content. The platform is built using the MERN stack which includes ReactJS, NodeJS, MongoDB, and ExpressJS.

## Table of Contents
1. [System Architecture](#system-architecture)
2. [Front-end Overview](#front-end-overview)
3. [Back-end Overview](#back-end-overview)
   - [Features and Functionalities](#features-and-functionalities)
   - [Frameworks, Libraries, and Tools](#frameworks-libraries-and-tools)
   - [Data Models and Database Schema](#data-models-and-database-schema)
4. [API Design](#api-design)
   - [Endpoints and Functionalities](#endpoints-and-functionalities)
   - [Sample API Requests and Responses](#sample-api-requests-and-responses)
5. [Deployment](#deployment)
6. [Testing](#testing)
7. [Future Enhancements](#future-enhancements)
8. [Conclusion](#conclusion)

## System Architecture

The StudyNotion platform consists of three main components: the front end, the back end, and the database. The platform follows a client-server architecture with the front end serving as the client and the back end and database serving as the server.

## Front-end Overview

The front end is built using ReactJS to create dynamic and responsive user interfaces. It communicates with the back end through RESTful API calls. The design is crafted using Figma for a clean and minimal user experience.

### Pages
- **For Students:**
  - Homepage
  - Course List
  - Wishlist
  - Cart Checkout
  - Course Content
  - User Details
  - User Edit Details
- **For Instructors:**
  - Dashboard
  - Insights
  - Course Management Pages
  - View and Edit Profile Details
- **For Admin (Future Scope):**
  - Dashboard
  - Insights
  - Instructor Management
  - User Management
  - Course Management

## Back-end Overview

The back end is built using NodeJS and ExpressJS. It handles the application logic, API creation, user authentication, course management, and media storage.

### Features and Functionalities
- **User Authentication and Authorization:** Sign up, log in, OTP verification, and password reset.
- **Course Management:** Create, read, update, delete courses, and manage course content.
- **Payment Integration:** Handle course purchases using Razorpay.
- **Cloud-based Media Management:** Use Cloudinary for media storage.
- **Markdown Formatting:** Store and render course content in Markdown format.

### Frameworks, Libraries, and Tools
- **Node.js:** Primary framework for the back end.
- **Express.js:** Web application framework.
- **MongoDB:** Primary database for flexible and scalable data storage.
- **JWT:** Authentication and authorization.
- **Bcrypt:** Password hashing.
- **Mongoose:** Object Data Modeling (ODM) library.

### Data Models and Database Schema
- **Student Schema:** Fields for name, email, password, and course details.
- **Instructor Schema:** Fields for name, email, password, and course details.
- **Course Schema:** Fields for course name, description, instructor details, and media content.

## API Design

The API follows REST architectural style using JSON for data exchange. It supports standard HTTP request methods (GET, POST, PUT, DELETE).

### Endpoints and Functionalities
- **Auth:**
  - `POST /api/auth/signup`: Create a new user account.
  - `POST /api/auth/login`: Log in and generate a JWT token.
  - `POST /api/auth/verify-otp`: Verify OTP.
  - `POST /api/auth/forgot-password`: Send password reset link.
- **Courses:**
  - `GET /api/courses`: List all courses.
  - `GET /api/courses/:id`: Get course details by ID.
  - `POST /api/courses`: Create a new course.
  - `PUT /api/courses/:id`: Update course by ID.
  - `DELETE /api/courses/:id`: Delete course by ID.
  - `POST /api/courses/:id/rate`: Add a rating to a course.

### Sample API Requests and Responses
- **Get all courses:**
  - `GET /api/courses`
  - **Response:** List of all courses.
- **Get course by ID:**
  - `GET /api/courses/:id`
  - **Response:** Details of the specified course.
- **Create a course:**
  - `POST /api/courses`
  - **Request:** Course details in the body.
  - **Response:** Newly created course.
- **Update a course:**
  - `PUT /api/courses/:id`
  - **Request:** Updated course details in the body.
  - **Response:** Updated course.
- **Delete a course:**
  - `DELETE /api/courses/:id`
  - **Response:** Success message.

## Deployment

The deployment process involves hosting the application on cloud-based services:
- **Front-end:** Deployed using Vercel.
- **Back-end:** Hosted on Render or Railway.
- **Media Files:** Hosted on Cloudinary.
- **Database:** Hosted on MongoDB Atlas.

## Testing

Testing is crucial for ensuring the platform's reliability and performance. The process involves various types of testing using frameworks and tools:
- **Unit Testing:** Test individual components.
- **Integration Testing:** Ensure components work together.
- **End-to-End Testing:** Simulate real user scenarios.

## Future Enhancements

Potential future improvements include:
- **Gamification Features:** Increase user engagement with badges, points, and leaderboards.
- **Personalized Learning Paths:** Tailor learning experiences based on interests and styles.
- **Social Learning Features:** Add group discussions, peer feedback, and collaborative projects.
- **Mobile App:** Create a mobile app for convenient access.
- **Machine Learning Recommendations:** Provide personalized course suggestions.
- **VR/AR Integration:** Enhance learning with immersive technologies.

## Conclusion

StudyNotion is a versatile and intuitive ed-tech platform designed to provide an immersive learning experience for students and a platform for instructors to showcase their expertise. This document outlines the technical architecture, features, functionalities, and future enhancements of the platform.