# Axis University Portal - Project Scope Document

## 1. Project Overview

### Project Name
**Axis University Portal**

### Project Type
Educational information website with admin dashboard, application/enrollment management, certificate verification, and course workflow management.

### Main Goal
The goal of this project is to build a professional educational website where visitors can view faculties, courses, certificate programs, latest news, events, testimonials, and apply/enroll for courses online.

Admins will manage the full website through a secure dashboard, including faculties, courses, applications, certificates, testimonials, news/events, classes/cohorts, and verification records.

This is **not a course delivery platform** like Udemy. The website is mainly for educational information, student applications, admin management, and certificate verification.

---

## 2. Technology Stack

### Frontend
- React.js
- Redux / Redux Toolkit for state management
- React Router for page routing
- Axios for API requests
- Tailwind CSS for styling
- Responsive UI for desktop, tablet, and mobile

### Backend
- Node.js
- Express.js
- REST API architecture
- JWT authentication and authorization
- Role-based authorization for admin/staff permissions
- Middleware-based route protection
- File upload handling using Multer

### Database
- MySQL
- Prisma ORM for database modeling, migrations, and queries
- Relational database structure

### Authentication
- JWT-based login system
- Admin authentication
- Protected admin routes
- Role-based authorization if needed

### Hosting
- Frontend: Vercel / Netlify / shared hosting-supported option
- Backend: Node.js supported hosting such as Render, Railway, VPS, or cPanel Node.js hosting if available
- Database: MySQL hosting through Namecheap/shared hosting or cloud MySQL provider

---

## 3. User Roles

### 3.1 Visitor / Public User
Public users can:
- View homepage
- View faculties
- View courses
- View certificate programs
- View course details
- View testimonials
- View news and events
- Submit application/enrollment forms
- Subscribe to newsletter
- Verify certificates using certificate number/details

### 3.2 Admin
Admin users can:
- Login to admin dashboard
- Manage homepage content
- Manage faculties
- Manage courses
- Manage classes/cohorts
- Manage applications
- Verify applications
- Manage certificates
- Manage certificate verification records
- Manage testimonials
- Manage news and events
- Manage newsletter subscribers
- Upload and manage images/logos/photos
- Manage course/application workflow processes

### 3.3 Optional Staff Role
If needed, additional staff users can be created with limited access.

Example permissions:
- Application verification only
- Course management only
- Certificate management only
- News/event management only

---

## 4. Project Scope

The system will include two main areas:

1. **Public Website**
2. **Admin Dashboard**

The public website will display educational content, while the admin dashboard will allow authorized admins to manage all website data.

---

# Part A: Public Website Scope

## 5. Homepage Features

The homepage should be modern, professional, and responsive.

### 5.1 Hero Slider
The homepage should include a hero image slider or carousel.

Each slide can include:
- Title
- Subtitle/description
- Image
- Button text
- Button link

Admin should be able to:
- Add slider images
- Edit slider content
- Delete slider items
- Change slider order

### 5.2 Counter / Statistics Section
The homepage should display important statistics.

Example counters:
- Total students
- Total courses
- Total faculties
- Total certificates
- Years of experience

Admin should be able to update these values from the dashboard.

### 5.3 Popular Faculties Section
Display selected or popular faculties on the homepage.

Each faculty card should include:
- Faculty name
- Faculty image/logo
- Short description
- View courses button

Clicking a faculty should take the user to the faculty detail page or related course list.

### 5.4 Student Testimonials Section
Display student feedback on the homepage.

Each testimonial should include:
- Student photo
- Student name
- Course name
- Short description
- Message/feedback

### 5.5 Latest News & Events Section
Display latest news and event posts.

Each item should include:
- Title
- Image
- Date
- Short description
- Read more button

### 5.6 Newsletter Subscription
Users should be able to subscribe by entering their email address.

System should:
- Validate email address
- Save subscriber email in database
- Prevent duplicate subscriptions
- Show success/error message

---

## 6. Faculties Section

### 6.1 Faculty Listing Page
The website should have a page that displays all faculties.

Each faculty should show:
- Faculty name
- Faculty image/logo
- Description
- Related course count
- View details button

### 6.2 Faculty Detail Page
Each faculty should have a detail page.

The page should include:
- Faculty name
- Faculty image/banner
- Faculty description
- List of courses under the faculty
- Apply button or course detail links

---

## 7. Courses / Programs Section

### 7.1 Course Listing Page
The website should display all courses/programs.

Course cards should include:
- Course name
- Faculty name
- Course image
- Short overview
- Duration
- Certificate availability
- View details button
- Apply button

### 7.2 Course Filtering
Users should be able to filter courses by:
- Faculty
- Certificate availability
- Course type
- Search keyword

### 7.3 Course Detail Page
Each course should have a dedicated detail page.

The course detail page should include:
- Course title
- Course banner/image
- Faculty name and information
- Course overview
- Course description
- Duration
- Entry requirements
- Course fee, if applicable
- Certificate information
- Available classes/cohorts
- Application/enrollment button

### 7.4 Course Overview Tabs
Course details should be organized using tabs.

Example tabs:
- Overview
- Curriculum / Details
- Requirements
- Fees
- Certificate
- Apply Now

---

## 8. Certificate Programs

The website should support certificate program information.

Certificate program details can include:
- Certificate title
- Related course
- Duration
- Description
- Requirements
- Certificate verification availability

Users should be able to:
- View certificate programs
- Apply for certificate programs
- Verify certificates

---

## 9. Application / Enrollment System

Users should be able to submit an online application form for a selected course.

### 9.1 Application Form Fields
The application form should include:
- Full name
- Email address
- Phone number
- Address
- Date of birth, if required
- Selected faculty
- Selected course
- Selected class/cohort
- Education qualification
- Additional message
- Document upload, if needed

### 9.2 Form Validation
Frontend and backend validation should be included.

Validation examples:
- Full name is required
- Email must be valid
- Phone number is required
- Course selection is required
- Duplicate application checking, if needed

### 9.3 Application Submission
After submitting the form:
- Application should be saved in the MySQL database
- User should see a success message
- Admin should receive a notification or dashboard alert
- User can receive an email confirmation if email service is configured

### 9.4 Application Status
Application status can include:
- Pending
- Under Review
- Verified
- Approved
- Rejected
- Enrolled

---

## 10. Certificate Verification System

The website should include a public certificate verification page.

### 10.1 Verification Search
Users should be able to verify a certificate using:
- Certificate number
- Student name, if required
- Course name, if required

### 10.2 Verification Result
If the certificate is valid, the system should display:
- Student name
- Course/program name
- Certificate number
- Issue date
- Expiry date, if applicable
- Certificate status

If invalid, the system should show:
- Certificate not found message
- Invalid certificate message

### 10.3 Certificate Status
Certificate status can include:
- Valid
- Expired
- Revoked
- Invalid

---

## 11. News & Events

### 11.1 News/Event Listing Page
The website should display all news and events.

Each post should include:
- Title
- Image
- Date
- Category/type
- Short description
- Read more button

### 11.2 News/Event Detail Page
Each news or event post should have a detail page.

The detail page should include:
- Title
- Featured image
- Date
- Full description/content
- Related posts, if needed

---

## 12. Testimonials

The website should display student testimonials.

Each testimonial should include:
- Student photo
- Student name
- Course name
- Description
- Message/feedback

Admin should be able to add, edit, delete, and manage testimonial content.

---

# Part B: Admin Dashboard Scope

## 13. Admin Authentication

The admin dashboard should be protected using JWT authentication.

### 13.1 Admin Login
Admin login should include:
- Email
- Password

After successful login:
- JWT token should be generated
- Token should be stored securely on frontend
- Admin can access protected dashboard pages

### 13.2 Authorization
Protected routes should verify:
- Valid JWT token
- User role/permission

The system should use role-based authorization to control access based on user roles such as admin, staff, or verifier.

Unauthorized users should not be able to access admin APIs or pages.

---

## 14. Dashboard Overview

Admin dashboard should show quick summary cards.

Dashboard cards can include:
- Total faculties
- Total courses
- Total applications
- Pending applications
- Verified applications
- Approved applications
- Total certificates
- Total testimonials
- Total news/events
- Newsletter subscribers

Dashboard should also show:
- Recent applications
- Recent certificate records
- Pending verification list

---

## 15. Faculty Management

Admin should be able to manage faculties.

### Features
- Add faculty
- Edit faculty
- Delete faculty
- View faculty list
- Upload faculty image/logo
- Mark faculty as popular
- Activate/deactivate faculty

### Faculty Fields
- Faculty name
- Slug
- Short description
- Full description
- Image/logo
- Status
- Popular status

---

## 16. Course Management

Admin should be able to manage courses/programs.

### Features
- Add course
- Edit course
- Delete course
- View course list
- Assign course to faculty
- Upload course image/banner
- Manage course details
- Activate/deactivate course

### Course Fields
- Course name
- Slug
- Faculty ID
- Short overview
- Full description
- Duration
- Entry requirements
- Course fee
- Certificate availability
- Course image/banner
- Status

### Automatic Course Relation
When a course is created, it should be assigned to a faculty.

Course hierarchy:

```text
Faculty -> Courses -> Classes/Cohorts -> Applications
```

---

## 17. Class / Cohort Management

Admin should be able to manage classes or batches for courses.

### Features
- Add class/cohort
- Edit class/cohort
- Delete class/cohort
- Assign class to course
- Manage batch/group details
- Set class start date and end date
- Set available seats, if required

### Class/Cohort Fields
- Class/cohort name
- Course ID
- Start date
- End date
- Schedule
- Available seats
- Status

---

## 18. Application Management

Admin should be able to manage submitted applications.

### Features
- View all applications
- Search applications
- Filter by course/faculty/status
- View application details
- Update application status
- Verify application details
- Approve application
- Reject application
- Mark as enrolled
- View uploaded documents

### Application Status Flow
```text
Pending -> Under Review -> Verified -> Approved -> Enrolled
```

Alternative flow:

```text
Pending -> Under Review -> Rejected
```

### Application Details
Admin can view:
- Student personal details
- Selected faculty
- Selected course
- Selected class/cohort
- Education details
- Uploaded documents
- Application status
- Verification status
- Submitted date

---

## 19. Application Verification

The admin dashboard should include application verification features.

### Features
- View pending verification list
- Check applicant details
- Mark application as verified
- Mark application as rejected
- Add verification notes
- Generate automatic verification list
- Track verified and unverified applications

### Verification Fields
- Application ID
- Verified by admin ID
- Verification status
- Verification notes
- Verified date

---

## 20. Certificate Management

Admin should be able to manage student certificates.

### Features
- Add certificate record
- Edit certificate record
- Delete certificate record
- Assign certificate to student/application
- Generate certificate number
- Manage certificate status
- Verify certificate records

### Certificate Fields
- Certificate number
- Student name
- Course ID
- Application ID, if available
- Issue date
- Expiry date, if applicable
- Certificate status
- Notes

### Certificate Status
- Valid
- Expired
- Revoked

---

## 21. Certificate Verification Management

Admin should be able to manage the certificate verification records used by the public verification page.

### Features
- Add verification record
- Edit verification record
- Delete verification record
- Search certificate records
- Update certificate status

Public users can verify certificates using the verification page.

---

## 22. Process / Workflow Management

The system should support application and course process management.

### Features
- Add process step
- Edit process step
- Delete process step
- Assign process to course/application workflow
- Track current process status

### Example Process Steps
- Application Received
- Document Checking
- Application Verification
- Payment Pending
- Payment Completed
- Approved
- Enrolled
- Certificate Issued

### Workflow Usage
Admin should be able to update the progress of each application based on process steps.

---

## 23. Testimonial Management

Admin should be able to manage student testimonials.

### Features
- Add testimonial
- Edit testimonial
- Delete testimonial
- Upload student photo
- Crop/manage photo
- Activate/deactivate testimonial

### Testimonial Fields
- Student name
- Course name
- Description
- Message/feedback
- Student photo
- Status

---

## 24. News & Events Management

Admin should be able to manage news and event posts.

### Features
- Add news/event
- Edit news/event
- Delete news/event
- Upload featured image
- Publish/unpublish post

### News/Event Fields
- Title
- Slug
- Type/category
- Short description
- Full content
- Featured image
- Date
- Status

---

## 25. Homepage Content Management

Admin should be able to manage homepage content.

### Manageable Sections
- Hero slider
- Counter/statistics
- Popular faculties
- Testimonials
- News/events
- University logo
- Homepage images

---

## 26. Newsletter Management

Admin should be able to view newsletter subscribers.

### Features
- View subscriber list
- Search subscribers
- Delete subscriber
- Export list, if needed

### Subscriber Fields
- Email
- Subscribed date
- Status

---

## 27. Media Upload Management

Admin should be able to upload and manage images and files.

### Upload Types
- University logo
- Faculty images
- Course images
- Student testimonial photos
- News/event images
- Homepage slider images
- Application documents

### File Upload Requirements
- File type validation
- File size validation
- Secure file storage
- Image preview
- Delete/replace file option

---

## 28. Optional Payment Gateway Integration

Payment gateway integration can be added if required.

### Features
- Course/application payment
- Payment status tracking
- Payment confirmation
- Admin payment view

### Payment Status
- Pending
- Paid
- Failed
- Refunded

### Notes
A free or low-cost payment gateway is preferred. The final payment gateway can be selected based on Sri Lankan availability, cost, and integration support.

---

# Part C: API Scope

## 29. REST API Structure

The backend should follow REST API standards.

Base API example:

```text
/api/auth
/api/faculties
/api/courses
/api/classes
/api/applications
/api/certificates
/api/testimonials
/api/news-events
/api/newsletter
/api/dashboard
/api/uploads
/api/processes
```

---

## 30. Authentication APIs

### Admin Login
```http
POST /api/auth/login
```

Request body:

```json
{
  "email": "admin@example.com",
  "password": "password"
}
```

Response:

```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### Get Logged-in Admin Profile
```http
GET /api/auth/profile
```

Protected route.

---

## 31. Faculty APIs

```http
GET /api/faculties
GET /api/faculties/:id
POST /api/faculties
PUT /api/faculties/:id
DELETE /api/faculties/:id
```

Admin-only APIs:
- POST
- PUT
- DELETE

---

## 32. Course APIs

```http
GET /api/courses
GET /api/courses/:id
GET /api/faculties/:facultyId/courses
POST /api/courses
PUT /api/courses/:id
DELETE /api/courses/:id
```

Admin-only APIs:
- POST
- PUT
- DELETE

---

## 33. Class / Cohort APIs

```http
GET /api/classes
GET /api/classes/:id
GET /api/courses/:courseId/classes
POST /api/classes
PUT /api/classes/:id
DELETE /api/classes/:id
```

---

## 34. Application APIs

### Public Application Submit
```http
POST /api/applications
```

### Admin Application Management
```http
GET /api/applications
GET /api/applications/:id
PUT /api/applications/:id/status
PUT /api/applications/:id/verify
DELETE /api/applications/:id
```

Protected admin routes.

---

## 35. Certificate APIs

### Public Certificate Verification
```http
GET /api/certificates/verify/:certificateNumber
```

### Admin Certificate Management
```http
GET /api/certificates
GET /api/certificates/:id
POST /api/certificates
PUT /api/certificates/:id
DELETE /api/certificates/:id
```

---

## 36. Testimonial APIs

```http
GET /api/testimonials
POST /api/testimonials
PUT /api/testimonials/:id
DELETE /api/testimonials/:id
```

---

## 37. News & Events APIs

```http
GET /api/news-events
GET /api/news-events/:id
POST /api/news-events
PUT /api/news-events/:id
DELETE /api/news-events/:id
```

---

## 38. Newsletter APIs

### Public Subscribe
```http
POST /api/newsletter/subscribe
```

### Admin View Subscribers
```http
GET /api/newsletter
DELETE /api/newsletter/:id
```

---

## 39. Dashboard APIs

```http
GET /api/dashboard/stats
GET /api/dashboard/recent-applications
GET /api/dashboard/pending-verifications
```

Protected admin routes.

---

# Part D: Database Scope

## 40. Main Database Tables

The MySQL database should include the following main tables:

1. users
2. faculties
3. courses
4. classes
5. applications
6. application_verifications
7. certificates
8. testimonials
9. news_events
10. newsletter_subscribers
11. hero_sliders
12. statistics
13. processes
14. application_process_logs
15. media_uploads

---

## 41. Suggested Database Tables

### users
Stores admin and staff login details.

Fields:
- id
- name
- email
- password
- role
- status
- created_at
- updated_at

### faculties
Stores faculty details.

Fields:
- id
- name
- slug
- short_description
- full_description
- image
- is_popular
- status
- created_at
- updated_at

### courses
Stores course/program details.

Fields:
- id
- faculty_id
- name
- slug
- short_overview
- description
- duration
- requirements
- fee
- has_certificate
- image
- status
- created_at
- updated_at

### classes
Stores course class/cohort details.

Fields:
- id
- course_id
- name
- start_date
- end_date
- schedule
- available_seats
- status
- created_at
- updated_at

### applications
Stores student application details.

Fields:
- id
- full_name
- email
- phone
- address
- date_of_birth
- faculty_id
- course_id
- class_id
- education_qualification
- message
- document_path
- status
- verification_status
- created_at
- updated_at

### application_verifications
Stores application verification details.

Fields:
- id
- application_id
- verified_by
- status
- notes
- verified_at
- created_at
- updated_at

### certificates
Stores certificate details.

Fields:
- id
- certificate_number
- application_id
- student_name
- course_id
- issue_date
- expiry_date
- status
- notes
- created_at
- updated_at

### testimonials
Stores student testimonials.

Fields:
- id
- student_name
- course_name
- description
- message
- photo
- status
- created_at
- updated_at

### news_events
Stores news and event posts.

Fields:
- id
- title
- slug
- type
- short_description
- content
- featured_image
- event_date
- status
- created_at
- updated_at

### newsletter_subscribers
Stores newsletter subscribers.

Fields:
- id
- email
- status
- created_at
- updated_at

### hero_sliders
Stores homepage slider data.

Fields:
- id
- title
- subtitle
- image
- button_text
- button_link
- sort_order
- status
- created_at
- updated_at

### statistics
Stores homepage counter/statistics values.

Fields:
- id
- title
- value
- icon
- sort_order
- status
- created_at
- updated_at

### processes
Stores workflow process steps.

Fields:
- id
- name
- description
- sort_order
- status
- created_at
- updated_at

### application_process_logs
Stores application workflow tracking.

Fields:
- id
- application_id
- process_id
- status
- notes
- updated_by
- created_at
- updated_at

### media_uploads
Stores uploaded media details.

Fields:
- id
- file_name
- file_path
- file_type
- file_size
- uploaded_by
- created_at
- updated_at

---

# Part E: Frontend Scope

## 42. Public Frontend Pages

The React frontend should include:

1. Home page
2. About page, if required
3. Faculties page
4. Faculty detail page
5. Courses page
6. Course detail page
7. Certificate programs page
8. Application/enrollment page
9. Certificate verification page
10. News/events page
11. News/event detail page
12. Contact page

---

## 43. Admin Frontend Pages

The admin dashboard should include:

1. Admin login page
2. Dashboard page
3. Faculty management page
4. Add/edit faculty page
5. Course management page
6. Add/edit course page
7. Class/cohort management page
8. Application management page
9. Application detail page
10. Verification management page
11. Certificate management page
12. Add/edit certificate page
13. Testimonial management page
14. News/events management page
15. Newsletter subscribers page
16. Hero slider management page
17. Statistics management page
18. Process/workflow management page
19. Media upload management page
20. Settings page, if needed

---

## 44. Redux State Management Scope

Redux should be used to manage global frontend state.

### Suggested Redux Slices
- authSlice
- facultySlice
- courseSlice
- classSlice
- applicationSlice
- certificateSlice
- testimonialSlice
- newsEventSlice
- newsletterSlice
- dashboardSlice
- processSlice
- uploadSlice

### Auth State Example
```js
{
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null
}
```

### Course State Example
```js
{
  courses: [],
  selectedCourse: null,
  loading: false,
  error: null
}
```

---

## 45. Axios API Handling

Axios should be used for all API requests.

### Axios Instance
Create a reusable Axios instance.

Example:

```js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
```

---

## 46. Route Protection

Admin routes should be protected.

### Public Routes
- `/`
- `/faculties`
- `/faculties/:slug`
- `/courses`
- `/courses/:slug`
- `/apply/:courseId`
- `/certificate-verification`
- `/news-events`
- `/news-events/:slug`
- `/contact`

### Admin Routes
- `/admin/login`
- `/admin/dashboard`
- `/admin/faculties`
- `/admin/courses`
- `/admin/classes`
- `/admin/applications`
- `/admin/certificates`
- `/admin/testimonials`
- `/admin/news-events`
- `/admin/newsletter`
- `/admin/processes`
- `/admin/settings`

---

# Part F: Backend Scope

## 47. Backend Folder Structure

Suggested Node.js backend structure using Prisma:

```text
backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── facultyController.js
│   │   ├── courseController.js
│   │   ├── classController.js
│   │   ├── applicationController.js
│   │   ├── certificateController.js
│   │   ├── testimonialController.js
│   │   ├── newsEventController.js
│   │   ├── newsletterController.js
│   │   ├── dashboardController.js
│   │   └── processController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Faculty.js
│   │   ├── Course.js
│   │   ├── Class.js
│   │   ├── Application.js
│   │   ├── Certificate.js
│   │   ├── Testimonial.js
│   │   └── NewsEvent.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── facultyRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── classRoutes.js
│   │   ├── applicationRoutes.js
│   │   ├── certificateRoutes.js
│   │   ├── testimonialRoutes.js
│   │   ├── newsEventRoutes.js
│   │   ├── newsletterRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── processRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   ├── sendEmail.js
│   │   └── generateCertificateNumber.js
│   ├── app.js
│   └── server.js
├── uploads/
├── .env
├── package.json
└── README.md
```

---

## 48. Frontend Folder Structure

Suggested React frontend structure:

```text
frontend/
├── src/
│   ├── api/
│   │   └── axios.js
│   ├── app/
│   │   └── store.js
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── public/
│   │   └── admin/
│   ├── features/
│   │   ├── auth/
│   │   ├── faculties/
│   │   ├── courses/
│   │   ├── applications/
│   │   ├── certificates/
│   │   ├── testimonials/
│   │   ├── newsEvents/
│   │   └── dashboard/
│   ├── pages/
│   │   ├── public/
│   │   └── admin/
│   ├── routes/
│   │   ├── PublicRoutes.jsx
│   │   ├── AdminRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
└── README.md
```

---

# Part G: Security Requirements

## 49. Security Scope

The project should include basic security best practices.

### Authentication Security
- Passwords must be hashed using bcrypt
- JWT token should be signed using a secure secret key
- Protected APIs should verify JWT token
- Admin-only APIs should check user role

### API Security
- Validate all request data
- Handle errors properly
- Prevent unauthorized access
- Use CORS configuration
- Limit file upload types and sizes

### File Upload Security
- Validate file type
- Validate file size
- Rename uploaded files
- Store files safely
- Prevent executable file uploads

### Database Security
- Use Prisma ORM for database queries
- Avoid raw SQL unless required
- Validate all user inputs before database operations
- Store database credentials in `.env`

---

# Part H: Non-Functional Requirements

## 50. Performance Requirements

- Website should load quickly
- Images should be optimized
- API responses should be efficient
- Pagination should be used for large lists
- Search and filter should be optimized

## 51. Responsive Design

The website should work properly on:
- Desktop
- Laptop
- Tablet
- Mobile devices

## 52. Usability Requirements

- Clean and simple navigation
- Easy course browsing
- Simple application form
- Clear admin dashboard
- User-friendly forms and validation messages

## 53. Maintainability Requirements

- Clean folder structure
- Reusable components
- Separate controllers and routes
- Environment variables for configuration
- Consistent API response format

---

# Part I: Development Phases

## 54. Phase 1 - Project Setup

Tasks:
- Setup React frontend
- Setup Tailwind CSS
- Setup Node.js backend
- Setup MySQL database
- Setup Prisma ORM
- Configure Prisma schema and migrations
- Configure environment variables
- Setup folder structure
- Setup Axios
- Setup Redux store
- Setup Express server

## 55. Phase 2 - Authentication

Tasks:
- Create users table
- Create admin login API
- Hash passwords using bcrypt
- Generate JWT token
- Create auth middleware
- Create admin login page
- Create protected admin routes

## 56. Phase 3 - Public Website

Tasks:
- Build homepage
- Build faculties page
- Build courses page
- Build course detail page
- Build news/events page
- Build testimonials section
- Build newsletter subscription

## 57. Phase 4 - Admin Content Management

Tasks:
- Faculty CRUD
- Course CRUD
- Class/cohort CRUD
- Hero slider CRUD
- Statistics CRUD
- News/events CRUD
- Testimonials CRUD
- Media uploads

## 58. Phase 5 - Application System

Tasks:
- Create application form
- Save application data
- Upload documents
- View applications in admin dashboard
- Update application status
- Add application verification
- Generate verification list

## 59. Phase 6 - Certificate System

Tasks:
- Add certificate management
- Generate certificate numbers
- Create public certificate verification page
- Display valid/invalid certificate result
- Manage certificate status

## 60. Phase 7 - Workflow & Process Management

Tasks:
- Create process management
- Assign processes to application workflow
- Track application progress
- Add process logs

## 61. Phase 8 - Payment Gateway, If Required

Tasks:
- Select payment gateway
- Integrate payment API
- Store payment records
- Update payment status
- Show payment status in admin dashboard

## 62. Phase 9 - Testing & Deployment

Tasks:
- Test public pages
- Test admin dashboard
- Test APIs
- Test authentication
- Test file uploads
- Test application workflow
- Test certificate verification
- Fix bugs
- Deploy frontend
- Deploy backend
- Connect MySQL database

---

# Part J: Minimum Viable Product Scope

## 63. MVP Features

The first version of the project should include:

### Public Website
- Homepage
- Faculty listing
- Course listing
- Course detail page
- Application form
- Certificate verification page
- Testimonials
- News/events
- Newsletter subscription

### Admin Dashboard
- Admin login
- Dashboard overview
- Faculty management
- Course management
- Application management
- Application verification
- Certificate management
- Testimonial management
- News/events management

### Backend
- REST APIs
- JWT authentication
- MySQL database
- File upload support

---

# Part K: Future Enhancements

## 64. Optional Future Features

The following features can be added later:

- Student login portal
- Student application tracking
- Online payment gateway
- Email/SMS notification system
- Advanced role-based permissions
- Certificate PDF generation
- Report export to Excel/PDF
- Advanced analytics dashboard
- Multi-language support
- SEO management from admin dashboard
- Blog system
- Live chat/contact integration

---

# 65. Final Project Scope Summary

Axis University Portal will be built using **React.js** for the frontend and **Node.js with Express.js** for the backend. **Redux** will be used for frontend state management, **Axios** for API communication, **Tailwind CSS** for styling, **JWT** for authentication, **role-based authorization** for permission control, **Multer** for file uploads, **Prisma ORM** for database operations, and **MySQL** for database storage.

The system will include a public educational website and a secure admin dashboard. Public users can view faculties, courses, certificate programs, testimonials, news/events, apply for courses, subscribe to newsletters, and verify certificates. Admin users can manage all website content, faculties, courses, classes, applications, verifications, certificates, testimonials, news/events, media uploads, workflow processes, and dashboard statistics.

This project is designed as a practical, scalable, and maintainable educational website management system suitable for an institution that needs online course information, student application handling, admin control, and certificate verification.

