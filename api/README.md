# Axis University Backend

This directory contains the Laravel API backend for the Axis University portal frontend.

The frontend expects an API-driven backend with:
- Laravel
- MySQL
- JWT authentication for the admin user
- Public endpoints for site content and application submission
- Admin endpoints for managing faculties, courses, applications, students, certificates, testimonials, and other content

## System Architecture

- React/Vite frontend consumes JSON APIs from Laravel
- Laravel provides public and admin API routes
- MySQL stores persistent data
- JWT protects admin routes
- Files such as application attachments are stored with Laravel Storage
- Queue workers handle emails and background jobs

## Role Model

Only one authenticated role is required now:
- `admin`

Students do not log in. They submit application forms publicly.

## Core Models

- `User`
  - Admin account only
  - Fields: `name`, `email`, `password`, `role`

- `Faculty`
  - Fields: `name`, `slug`, `description`, `icon`, `color`
  - Relationships: hasMany `Program`

- `Program`
  - Fields: `faculty_id`, `code`, `title`, `level`, `duration`, `overview`, `description`, `curriculum`, `requirements`, `intake`
  - Relationships: belongsTo `Faculty`, hasMany `Application`, hasMany `Student`

- `Application`
  - Fields: applicant details, `program_id`, `faculty_id`, `attachments`, `status`, `admin_note`, `processed_by`, `submitted_at`, `processed_at`
  - Relationships: belongsTo `Program`, belongsTo `Faculty`
  - Statuses: `pending`, `approved`, `rejected`

- `Student`
  - Fields: `student_number`, `application_id`, applicant details, `program_id`, `enrolled_at`, `status`
  - Relationship: belongsTo `Program`, belongsTo `Application`

- `Certificate`
  - Fields: `cert_id`, `student_id`, `program_id`, `year`, `issued_at`, `meta`
  - Relationship: belongsTo `Student`

- `Testimonial`
  - Fields: `name`, `program`, `quote`, `approved`

- Optional support tables
  - `downloads`
  - `news`
  - `settings`

## Database Tables

Suggested tables:

- `users`
- `faculties`
- `programs`
- `applications`
- `students`
- `certificates`
- `testimonials`
- `downloads`
- `news`

Important constraints:

- `faculties.slug` must be unique
- `applications.uuid` must be unique
- `students.student_number` must be unique
- `certificates.cert_id` must be unique
- Add indexes on search fields such as applicant email, passport number, and certificate ID

## Approval Flow

1. Student submits an application publicly.
2. Application is stored with `status = pending`.
3. Admin reviews the application in the admin panel.
4. If approved:
   - Update application status to `approved`
   - Store the admin decision and timestamp
   - Create a record in `students`
5. If rejected:
   - Update application status to `rejected`
   - Store rejection note if needed

## API Endpoints

Base path: `/api`

Public endpoints:

- `GET /api/faculties`
- `GET /api/programs`
- `GET /api/programs/{id}`
- `GET /api/testimonials`
- `GET /api/news`
- `GET /api/downloads`
- `POST /api/applications`
- `GET /api/certificates/verify`

Admin endpoints:

- `POST /api/admin/login`
- `POST /api/admin/logout`
- `POST /api/admin/refresh`
- `GET /api/admin/profile`
- `GET /api/admin/faculties`
- `POST /api/admin/faculties`
- `PUT /api/admin/faculties/{id}`
- `DELETE /api/admin/faculties/{id}`
- `GET /api/admin/programs`
- `POST /api/admin/programs`
- `PUT /api/admin/programs/{id}`
- `DELETE /api/admin/programs/{id}`
- `GET /api/admin/applications`
- `GET /api/admin/applications/{id}`
- `POST /api/admin/applications/{id}/approve`
- `POST /api/admin/applications/{id}/reject`
- `GET /api/admin/students`
- `POST /api/admin/students`
- `PUT /api/admin/students/{id}`
- `DELETE /api/admin/students/{id}`
- `GET /api/admin/certificates`
- `POST /api/admin/certificates`
- `GET /api/admin/testimonials`
- `POST /api/admin/testimonials`

## JWT Authentication Flow

1. Admin submits email and password to `/api/admin/login`.
2. Laravel validates credentials.
3. Server returns a JWT token.
4. Admin requests must include `Authorization: Bearer <token>`.
5. Middleware protects admin routes.
6. An admin-only middleware checks that the authenticated user has role `admin`.

Recommended package:
- `php-open-source-saver/jwt-auth` (compatible drop-in replacement)

## Folder Structure

Recommended Laravel structure inside `api/`:

```text
app/
  Http/
    Controllers/
      Api/
        Public/
        Admin/
    Requests/
    Resources/
  Models/
  Services/
  Actions/
database/
  migrations/
  seeders/
routes/
  api.php
```

## Setup Notes

Install dependencies:

```bash
composer install
```

Configure `.env`:

- `DB_CONNECTION=mysql`
- `DB_HOST`
- `DB_PORT`
- `DB_DATABASE`
- `DB_USERNAME`
- `DB_PASSWORD`
- `JWT_SECRET`

Run migrations and seeders:

```bash
php artisan migrate
php artisan db:seed
```

Generate JWT secret if using `php-open-source-saver/jwt-auth`:

```bash
php artisan jwt:secret
```

## Implementation Suggestions

- Use Form Requests for validation.
- Use API Resources for consistent JSON responses.
- Move business logic into Services or Actions.
- Use queues for emails and notifications.
- Add rate limiting to public endpoints.
- Add pagination to list endpoints.

## Next Steps

I can scaffold the missing Laravel files next:
- seeders for faculties, programs, and testimonials
- JWT auth configuration and admin seeder
- controllers for public and admin APIs
