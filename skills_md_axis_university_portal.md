# Axis University Portal - Backend API Documentation

## Project Overview

Axis University Portal is an education management platform built with Laravel 10 and MySQL. The backend provides APIs for managing faculties, courses, applications, students, enrollments, certificates, testimonials, downloads, and recognitions.

The system supports public website access for reading educational content, while administrative actions are protected using JWT authentication and policy-based authorization.

---

## Tech Stack

- Laravel 10
- PHP 8+
- MySQL
- Eloquent ORM
- JWT Authentication using `tymon/jwt-auth`
- Laravel Policies / Gates
- Laravel Public Storage Disk
- Intervention Image for image compression
- REST API structure
- Postman / Thunder Client for API testing

---

## Authentication

The system uses JWT authentication for admin users.

Only admins can login. There is no student login currently.

### Auth Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/login` | Public | Admin login |
| POST | `/api/logout` | Admin | Logout authenticated admin |
| GET | `/api/me` | Admin | Get authenticated admin profile |

### Login Body

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

### Protected Route Header

```txt id="5w120h"
Authorization: Bearer YOUR_TOKEN_HERE
Accept: application/json
```

---

## Authorization

Authorization is handled using Laravel Gate / Policy.

Current rule:

```txt id="zsic0t"
Only active admin users can manage protected admin data.
```

Gate name:

```txt id="ag8mse"
manage-admin-data
```

Protected admin routes use:

```php id="0e60a2"
middleware(['auth:api', 'can:manage-admin-data'])
```

---

## File Upload Rules

Uploads are stored using Laravel public disk.

Storage path:

```txt id="s2fkr3"
storage/app/public
```

Public URL path:

```txt id="rjo7s6"
public/storage
```

Example:

```txt id="647wci"
storage/app/public/faculties/image.webp
```

Public URL:

```txt id="0p0qjd"
http://localhost:8000/storage/faculties/image.webp
```

Required command:

```bash id="xni4fc"
php artisan storage:link
```

If the link already exists, that is not an issue.

### Upload-enabled Tables

Only these modules support uploads:

| Module | Upload Type |
|---|---|
| Faculties | Image |
| Testimonials | Photo |
| Recognitions | Photo |
| Downloads | File |

Courses and certificates currently do not upload images/files.

### Image Compression

Images are compressed and converted to `.webp`.

Recommended compression logic:

```txt id="g7pe2g"
Resize max width: 1200px
Format: webp
Quality: 75
```

---

## Database Tables

Final database tables:

```txt id="ltk74k"
users
faculties
courses
applications
students
enrollments
certificates
testimonials
downloads
recognitions
```

---

# Database Structure

## 1. users

Admin users only.

| Field | Description |
|---|---|
| id | Primary key |
| name | Admin name |
| email | Unique email |
| password | Hashed password |
| is_active | Active/inactive admin status |
| created_at | Created timestamp |
| updated_at | Updated timestamp |

---

## 2. faculties

Represents academic faculties such as IT, Business, Health Care, etc.

| Field | Description |
|---|---|
| id | Primary key |
| name | Faculty name |
| slug | Unique slug |
| short_description | Short faculty description |
| description | Full faculty description |
| image | Faculty image path |
| status | Active/inactive |
| created_at | Created timestamp |
| updated_at | Updated timestamp |

Relationship:

```txt id="swo1k2"
Faculty has many Courses
```

---

## 3. courses

Courses belong to faculties.

| Field | Description |
|---|---|
| id | Primary key |
| faculty_id | Foreign key to faculties |
| name | Course name |
| slug | Unique slug |
| code | Optional unique course code |
| level | Course level |
| duration | Course duration |
| study_mode | online / physical / hybrid |
| fee | Course fee |
| short_description | Short course description |
| description | Full course description |
| entry_requirements | Entry requirements |
| status | Active/inactive |
| created_at | Created timestamp |
| updated_at | Updated timestamp |

Relationships:

```txt id="9vgjwf"
Course belongs to Faculty
Course has many Applications
Course has many Enrollments
Course has many Downloads
```

---

## 4. applications

Stores public course applications.

When a user applies from the website, only an application is created. A student and enrollment are not created immediately.

| Field | Description |
|---|---|
| id | Primary key |
| application_number | Unique application number |
| first_name | Applicant first name |
| last_name | Applicant last name |
| passport_number | Passport number |
| date_of_birth | Date of birth |
| contact_number | Contact number |
| street_address | Street address |
| town_city | Town/city |
| country | Country |
| postcode | Postal code |
| email_address | Applicant email |
| course_id | Selected course |
| status | pending / rejected / enrolled |
| admin_note | Admin note |
| submitted_at | Submitted date/time |
| reviewed_at | Reviewed date/time |
| created_at | Created timestamp |
| updated_at | Updated timestamp |

Statuses:

```txt id="ors6zv"
pending
rejected
enrolled
```

Relationship:

```txt id="qvp9w3"
Application belongs to Course
Application may have one Enrollment after approval
```

---

## 5. students

Stores accepted students only.

Applicants should not be created as students until admin approval.

| Field | Description |
|---|---|
| id | Primary key |
| student_number | Unique student number |
| first_name | Student first name |
| last_name | Student last name |
| email_address | Unique student email |
| contact_number | Contact number |
| passport_number | Passport number |
| date_of_birth | Date of birth |
| street_address | Street address |
| town_city | Town/city |
| country | Country |
| postcode | Postal code |
| status | active / inactive / suspended |
| created_at | Created timestamp |
| updated_at | Updated timestamp |

Statuses:

```txt id="jsco17"
active
inactive
suspended
```

Relationships:

```txt id="723y0g"
Student has many Enrollments
Student belongs to many Courses through Enrollments
```

---

## 6. enrollments

Connects students and courses.

This table allows one student to take multiple courses.

| Field | Description |
|---|---|
| id | Primary key |
| enrollment_number | Unique enrollment number |
| student_id | Foreign key to students |
| course_id | Foreign key to courses |
| application_id | Optional foreign key to applications |
| enrollment_date | Enrollment date |
| start_date | Course start date |
| end_date | Course end date |
| completion_date | Completion date |
| status | active / completed / suspended / withdrawn |
| grade | Optional grade |
| admin_note | Admin note |
| created_at | Created timestamp |
| updated_at | Updated timestamp |

Statuses:

```txt id="vtantg"
active
completed
suspended
withdrawn
```

Relationships:

```txt id="qmhqep"
Enrollment belongs to Student
Enrollment belongs to Course
Enrollment may belong to Application
Enrollment has one Certificate
```

Important rule:

```txt id="vxzns7"
students should not contain course_id
students -> enrollments -> courses
```

---

## 7. certificates

Certificates belong to enrollments.

| Field | Description |
|---|---|
| id | Primary key |
| certificate_number | Unique certificate verification number |
| enrollment_id | Foreign key to enrollments |
| issue_date | Certificate issue date |
| expiry_date | Optional expiry date |
| grade | Optional grade |
| status | valid / revoked / expired |
| created_at | Created timestamp |
| updated_at | Updated timestamp |

Statuses:

```txt id="u9jybh"
valid
revoked
expired
```

Relationship:

```txt id="ca6pl1"
Certificate belongs to Enrollment
```

Recommended public certificate verification route:

```txt id="h98aio"
GET /api/certificates/verify/{certificateNumber}
```

Public users should verify one certificate number instead of browsing all certificates.

---

## 8. testimonials

Stores website testimonials with photo.

| Field | Description |
|---|---|
| id | Primary key |
| name | Person name |
| role | Student / Parent / Graduate etc. |
| message | Testimonial message |
| photo | Uploaded photo path |
| rating | Optional rating from 1 to 5 |
| status | Active/inactive |
| created_at | Created timestamp |
| updated_at | Updated timestamp |

---

## 9. downloads

Stores downloadable files related to courses.

Examples:

```txt id="ctqr7x"
Course brochure
Syllabus
Application form
Guideline PDF
```

| Field | Description |
|---|---|
| id | Primary key |
| course_id | Foreign key to courses |
| title | Download title |
| description | Optional description |
| file | Uploaded file path |
| file_type | File type |
| status | Active/inactive |
| created_at | Created timestamp |
| updated_at | Updated timestamp |

Relationship:

```txt id="6i66il"
Download belongs to Course
```

---

## 10. recognitions

Stores recognitions, accreditations, awards, approvals, memberships, and partners.

| Field | Description |
|---|---|
| id | Primary key |
| title | Recognition title |
| organization_name | Organization name |
| description | Optional description |
| photo | Uploaded image/logo path |
| issue_date | Optional issue date |
| status | Active/inactive |
| created_at | Created timestamp |
| updated_at | Updated timestamp |

---

# Main Business Flow

## Public Application Flow

```txt id="ae2sq4"
User submits course application
        ↓
Application is saved with pending status
        ↓
Admin reviews application
        ↓
Admin approves or rejects
```

## If Application is Rejected

```txt id="rudb9s"
Application status becomes rejected
No student is created
No enrollment is created
```

## If Application is Approved

```txt id="ffdjea"
Find existing student by email_address
        ↓
If student exists, use existing student
        ↓
If student does not exist, create student
        ↓
Create enrollment with selected course
        ↓
Application status becomes enrolled
```

Important:

```txt id="kn77m7"
A student is created only after admin approval.
An enrollment is created only after admin approval.
```

---

# Existing Student New Course Flow

If an existing student applies for another course:

```txt id="1waiv5"
User submits application
        ↓
Application status is pending
        ↓
Admin approves
        ↓
System finds existing student by email_address
        ↓
System creates new enrollment under same student
```

This supports:

```txt id="qr65jx"
One student can study multiple courses.
```

---

# Public API Access

The website frontend can read these without login:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/faculties` | List faculties |
| GET | `/api/faculties/{faculty}` | View faculty |
| GET | `/api/courses` | List courses |
| GET | `/api/courses/{course}` | View course |
| GET | `/api/certificates` | List certificates if enabled |
| GET | `/api/certificates/{certificate}` | View certificate if enabled |
| GET | `/api/downloads` | List downloads |
| GET | `/api/downloads/{download}` | View download |
| GET | `/api/recognitions` | List recognitions |
| GET | `/api/recognitions/{recognition}` | View recognition |
| GET | `/api/testimonials` | List testimonials |
| GET | `/api/testimonials/{testimonial}` | View testimonial |

Recommended certificate public route:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/certificates/verify/{certificateNumber}` | Verify certificate by certificate number |

---

# Public Write API

Only this write route is public:

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/applications` | Submit course application |

Application request body:

```json id="v6iams"
{
  "firstName": "Mohamad",
  "lastName": "Saadh",
  "passportNumber": "N1234567",
  "dateOfBirth": "2000-01-01",
  "contactNumber": "0771234567",
  "streetAddress": "Main Street",
  "townCity": "Colombo",
  "country": "Sri Lanka",
  "postcode": "00100",
  "emailAddress": "student@example.com",
  "courseId": 1
}
```

---

# Admin API Access

All admin routes require:

```txt id="0me90q"
Authorization: Bearer JWT_TOKEN
Accept: application/json
```

---

## Faculty APIs

Public read:

| Method | Endpoint |
|---|---|
| GET | `/api/faculties` |
| GET | `/api/faculties/{faculty}` |

Admin write:

| Method | Endpoint |
|---|---|
| POST | `/api/faculties` |
| PUT/PATCH | `/api/faculties/{faculty}` |
| DELETE | `/api/faculties/{faculty}` |

Form-data fields:

```txt id="p7zk9c"
name
shortDescription
description
image
status
```

---

## Course APIs

Public read:

| Method | Endpoint |
|---|---|
| GET | `/api/courses` |
| GET | `/api/courses/{course}` |

Admin write:

| Method | Endpoint |
|---|---|
| POST | `/api/courses` |
| PUT/PATCH | `/api/courses/{course}` |
| DELETE | `/api/courses/{course}` |

Fields:

```txt id="qcokev"
facultyId
name
code
level
duration
studyMode
fee
shortDescription
description
entryRequirements
status
```

---

## Application APIs

Public:

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/applications` | Submit application |

Admin:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/applications` | List applications |
| GET | `/api/applications/{application}` | View application |
| PATCH | `/api/applications/{application}/approve` | Approve application |
| PATCH | `/api/applications/{application}/reject` | Reject application |

Reject body:

```json id="0zvbwo"
{
  "adminNote": "Reason for rejection"
}
```

---

## Student APIs

Admin only.

| Method | Endpoint |
|---|---|
| GET | `/api/students` |
| POST | `/api/students` |
| GET | `/api/students/{student}` |
| PUT/PATCH | `/api/students/{student}` |
| DELETE | `/api/students/{student}` |

Fields:

```txt id="r7l6qr"
firstName
lastName
emailAddress
contactNumber
passportNumber
dateOfBirth
streetAddress
townCity
country
postcode
status
```

---

## Enrollment APIs

Admin only.

| Method | Endpoint |
|---|---|
| GET | `/api/enrollments` |
| POST | `/api/enrollments` |
| GET | `/api/enrollments/{enrollment}` |
| PUT/PATCH | `/api/enrollments/{enrollment}` |
| DELETE | `/api/enrollments/{enrollment}` |

Fields:

```txt id="50eov2"
studentId
courseId
applicationId
enrollmentDate
startDate
endDate
completionDate
status
grade
adminNote
```

Use this when admin manually adds a course under an existing student.

---

## Certificate APIs

Public read may be enabled, but recommended public access is verification only.

Admin write:

| Method | Endpoint |
|---|---|
| GET | `/api/certificates` |
| POST | `/api/certificates` |
| GET | `/api/certificates/{certificate}` |
| PUT/PATCH | `/api/certificates/{certificate}` |
| DELETE | `/api/certificates/{certificate}` |

Fields:

```txt id="4875sz"
enrollmentId
certificateNumber
issueDate
expiryDate
grade
status
```

Recommended public verification:

| Method | Endpoint |
|---|---|
| GET | `/api/certificates/verify/{certificateNumber}` |

---

## Testimonial APIs

Public read:

| Method | Endpoint |
|---|---|
| GET | `/api/testimonials` |
| GET | `/api/testimonials/{testimonial}` |

Admin write:

| Method | Endpoint |
|---|---|
| POST | `/api/testimonials` |
| PUT/PATCH | `/api/testimonials/{testimonial}` |
| DELETE | `/api/testimonials/{testimonial}` |

Form-data fields:

```txt id="we6r7t"
name
role
message
photo
rating
status
```

---

## Download APIs

Public read:

| Method | Endpoint |
|---|---|
| GET | `/api/downloads` |
| GET | `/api/downloads/{download}` |

Admin write:

| Method | Endpoint |
|---|---|
| POST | `/api/downloads` |
| PUT/PATCH | `/api/downloads/{download}` |
| DELETE | `/api/downloads/{download}` |

Form-data fields:

```txt id="wbsq7f"
courseId
title
description
file
fileType
status
```

---

## Recognition APIs

Public read:

| Method | Endpoint |
|---|---|
| GET | `/api/recognitions` |
| GET | `/api/recognitions/{recognition}` |

Admin write:

| Method | Endpoint |
|---|---|
| POST | `/api/recognitions` |
| PUT/PATCH | `/api/recognitions/{recognition}` |
| DELETE | `/api/recognitions/{recognition}` |

Form-data fields:

```txt id="xjwusb"
title
organizationName
description
photo
issueDate
status
```

---

# API Response Format

All successful responses should follow this format:

```json id="z0877g"
{
  "success": true,
  "statusCode": 200,
  "message": "Success message",
  "data": {}
}
```

Created response:

```json id="1clhl1"
{
  "success": true,
  "statusCode": 201,
  "message": "Created successfully",
  "data": {}
}
```

Error response:

```json id="p6ix7e"
{
  "success": false,
  "statusCode": 400,
  "message": "Error message",
  "errors": {}
}
```

---

# Route Structure

Recommended `routes/api.php` structure:

```php id="y9fyuz"
Route::post('/login', [AuthController::class, 'login']);

Route::post('/applications', [ApplicationController::class, 'store']);

Route::get('/faculties', [FacultyController::class, 'index']);
Route::get('/faculties/{faculty}', [FacultyController::class, 'show']);

Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{course}', [CourseController::class, 'show']);

Route::get('/certificates/verify/{certificateNumber}', [CertificateController::class, 'verify']);

Route::get('/downloads', [DownloadController::class, 'index']);
Route::get('/downloads/{download}', [DownloadController::class, 'show']);

Route::get('/recognitions', [RecognitionController::class, 'index']);
Route::get('/recognitions/{recognition}', [RecognitionController::class, 'show']);

Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/testimonials/{testimonial}', [TestimonialController::class, 'show']);

Route::middleware(['auth:api'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::middleware('can:manage-admin-data')->group(function () {
        Route::apiResource('/faculties', FacultyController::class)->except(['index', 'show']);
        Route::apiResource('/courses', CourseController::class)->except(['index', 'show']);
        Route::apiResource('/certificates', CertificateController::class)->except(['index', 'show']);
        Route::apiResource('/downloads', DownloadController::class)->except(['index', 'show']);
        Route::apiResource('/recognitions', RecognitionController::class)->except(['index', 'show']);
        Route::apiResource('/testimonials', TestimonialController::class)->except(['index', 'show']);

        Route::apiResource('/students', StudentController::class);
        Route::apiResource('/enrollments', EnrollmentController::class);

        Route::get('/applications', [ApplicationController::class, 'index']);
        Route::get('/applications/{application}', [ApplicationController::class, 'show']);
        Route::patch('/applications/{application}/approve', [ApplicationController::class, 'approve']);
        Route::patch('/applications/{application}/reject', [ApplicationController::class, 'reject']);
    });
});
```

---

# Current Verified Progress

The following parts are already confirmed working:

```txt id="6a0e41"
Database migration successful
Database axis_university created
Storage link already exists
JWT login working
GET /api/me working
Faculty create API working
Faculty image upload working
Image compression to .webp working
Public disk path working
API response format working
```

---

# Environment Notes

Important `.env` values:

```env id="6i2z9g"
APP_NAME="Axis University"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=axis_university
DB_USERNAME=root
DB_PASSWORD=

FILESYSTEM_DISK=public

JWT_SECRET=YOUR_JWT_SECRET
```

After changing `.env`, run:

```bash id="t47qq3"
php artisan config:clear
php artisan cache:clear
```

---

# Development Rules

Whenever a new adjustment happens, update this `skills.md` file.

Examples of updates that must be added:

```txt id="me9d30"
New database table added
New field added to a table
New relationship changed
New API route added
Route access changed from public to protected
Upload rule changed
Validation rule changed
Application approval flow changed
Certificate verification logic changed
Authentication or authorization rule changed
Frontend API requirement changed
```

This file should be treated as the main project reference document.

Before adding new backend code, check this file first.

After changing backend code, update this file immediately.

---

# Important Project Rules

1. Public users can submit applications.
2. Public users can read faculties, courses, downloads, recognitions, and testimonials.
3. Admin login is required for create, update, and delete actions.
4. Students are created only after application approval.
5. Enrollments are created only after application approval or admin manual creation.
6. Existing students are identified by email address.
7. A student can have many enrollments.
8. A course can have many students through enrollments.
9. Certificates belong to enrollments.
10. Uploaded images should be compressed to `.webp`.
11. Downloads belong to courses.
12. Applications should not directly create students.
13. Applications should not directly create enrollments before approval.
14. Admin can manually add students.
15. Admin can manually add a course under an existing student by creating an enrollment.

