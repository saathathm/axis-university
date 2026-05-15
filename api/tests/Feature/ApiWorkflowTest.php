<?php

namespace Tests\Feature;

use App\Models\Application;
use App\Models\Certificate;
use App\Models\Download;
use App\Models\Faculty;
use App\Models\Program;
use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ApiWorkflowTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_login_returns_token_and_profile(): void
    {
        $admin = User::query()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => 'Password123!',
            'role' => 'admin',
        ]);

        $loginResponse = $this->postJson('/api/v1/admin/login', [
            'email' => $admin->email,
            'password' => 'Password123!',
        ]);

        $loginResponse->assertOk();
        $loginResponse->assertJsonStructure([
            'access_token',
            'token_type',
            'expires_in',
            'user' => ['id', 'name', 'email', 'role'],
        ]);

        $token = $loginResponse->json('access_token');

        $profileResponse = $this->withHeader('Authorization', 'Bearer '.$token)
            ->getJson('/api/v1/admin/profile');

        $profileResponse->assertOk();
        $profileResponse->assertJsonPath('user.email', $admin->email);
        $profileResponse->assertJsonPath('user.role', 'admin');
    }

    public function test_non_admin_login_is_denied(): void
    {
        User::query()->create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => 'Password123!',
            'role' => 'user',
        ]);

        $response = $this->postJson('/api/v1/admin/login', [
            'email' => 'user@example.com',
            'password' => 'Password123!',
        ]);

        $response->assertForbidden();
        $response->assertJsonPath('message', 'Admin access required.');
    }

    public function test_application_submission_stores_attachments(): void
    {
        Storage::fake('public');

        $faculty = Faculty::query()->create([
            'name' => 'Faculty of Science',
            'slug' => 'science',
            'description' => 'Science programs',
            'icon' => 'atom',
            'color' => 'text-primary',
        ]);

        $program = Program::query()->create([
            'faculty_id' => $faculty->id,
            'code' => 'BSC-CS',
            'title' => 'BSc Computer Science',
            'level' => 'Undergraduate',
            'duration' => '4 Years',
            'overview' => 'Computer science overview',
            'description' => 'Computer science description',
            'curriculum' => ['Programming'],
            'requirements' => ['High school diploma'],
            'intake' => 100,
        ]);

        $file = UploadedFile::fake()->create('passport.pdf', 256, 'application/pdf');

        $response = $this->post('/api/v1/applications', [
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'passport_number' => 'P1234567',
            'date_of_birth' => '2001-01-01',
            'contact_number' => '123456789',
            'street_address' => '12 Main Street',
            'town_city' => 'London',
            'country' => 'United Kingdom',
            'postcode' => 'SW1A 1AA',
            'email_address' => 'jane@example.com',
            'program_id' => $program->id,
            'attachments' => [$file],
        ]);

        $response->assertCreated();
        $response->assertJsonPath('data.first_name', 'Jane');
        $response->assertJsonCount(1, 'data.attachments');

        $application = Application::query()->firstOrFail();
        $attachments = $application->attachments;

        $this->assertIsArray($attachments);
        $this->assertCount(1, $attachments);
        $this->assertStringStartsWith('applications/', $attachments[0]['path']);
        Storage::disk('public')->assertExists($attachments[0]['path']);
    }

    public function test_download_index_exposes_public_urls(): void
    {
        Storage::fake('public');

        Download::query()->create([
            'category' => 'Admissions',
            'title' => 'Application Guide',
            'path' => 'downloads/application-guide.pdf',
            'size' => '256 KB',
            'published' => true,
        ]);

        $response = $this->getJson('/api/v1/downloads');

        $response->assertOk();
        $response->assertJsonPath('data.0.title', 'Application Guide');
        $response->assertJsonPath('data.0.url', '/storage/downloads/application-guide.pdf');
    }

    public function test_admin_can_approve_application_creating_student(): void
    {
        $admin = User::query()->create([
            'name' => 'Admin User',
            'email' => 'admin2@example.com',
            'password' => 'Password123!',
            'role' => 'admin',
        ]);

        $token = $this->postJson('/api/v1/admin/login', [
            'email' => $admin->email,
            'password' => 'Password123!',
        ])->json('access_token');

        $faculty = Faculty::query()->create([
            'name' => 'Faculty of Business',
            'slug' => 'business',
            'description' => 'Business programs',
            'icon' => 'briefcase',
            'color' => 'text-primary',
        ]);

        $program = Program::query()->create([
            'faculty_id' => $faculty->id,
            'code' => 'MBA',
            'title' => 'Master of Business Administration',
            'level' => 'Postgraduate',
            'duration' => '2 Years',
            'overview' => 'Business overview',
            'description' => 'Business description',
            'curriculum' => ['Leadership'],
            'requirements' => ['Bachelor degree'],
            'intake' => 50,
        ]);

        $application = Application::query()->create([
            'uuid' => (string) \Illuminate\Support\Str::uuid(),
            'first_name' => 'John',
            'last_name' => 'Smith',
            'passport_number' => 'A9876543',
            'date_of_birth' => '2000-05-01',
            'contact_number' => '555123456',
            'street_address' => '88 College Road',
            'town_city' => 'Nairobi',
            'country' => 'Kenya',
            'postcode' => '00100',
            'email_address' => 'john@example.com',
            'program_id' => $program->id,
            'faculty_id' => $faculty->id,
            'attachments' => [],
            'status' => 'pending',
            'submitted_at' => now(),
        ]);

        $response = $this->withHeader('Authorization', 'Bearer '.$token)
            ->postJson('/api/v1/admin/applications/'.$application->id.'/approve');

        $response->assertOk();
        $response->assertJsonPath('data.application.status', 'approved');
        $response->assertJsonPath('data.student.first_name', 'John');

        $this->assertDatabaseHas('applications', [
            'id' => $application->id,
            'status' => 'approved',
        ]);

        $student = Student::query()->where('application_id', $application->id)->firstOrFail();
        $this->assertSame('active', $student->status);
        $this->assertSame($program->id, $student->program_id);
        $this->assertSame('john@example.com', $student->email);
        $this->assertNotEmpty($student->student_number);
    }

    public function test_admin_can_create_student_manually(): void
    {
        $admin = User::query()->create([
            'name' => 'Admin User',
            'email' => 'admin3@example.com',
            'password' => 'Password123!',
            'role' => 'admin',
        ]);

        $token = $this->postJson('/api/v1/admin/login', [
            'email' => $admin->email,
            'password' => 'Password123!',
        ])->json('access_token');

        $faculty = Faculty::query()->create([
            'name' => 'Faculty of Technology',
            'slug' => 'technology',
            'description' => 'Technology programs',
            'icon' => 'cpu',
            'color' => 'text-primary',
        ]);

        $program = Program::query()->create([
            'faculty_id' => $faculty->id,
            'code' => 'DIP-IT',
            'title' => 'Diploma in IT',
            'level' => 'Diploma',
            'duration' => '1 Year',
            'overview' => 'IT overview',
            'description' => 'IT description',
            'curriculum' => ['Computing'],
            'requirements' => ['School certificate'],
            'intake' => 30,
        ]);

        $response = $this->withHeader('Authorization', 'Bearer '.$token)
            ->postJson('/api/v1/admin/students', [
                'first_name' => 'Maya',
                'last_name' => 'Perera',
                'contact_number' => '0771234567',
                'street_address' => '10 Main Road',
                'town_city' => 'Colombo',
                'country' => 'Sri Lanka',
                'postcode' => '00100',
                'email' => 'maya@example.com',
                'program_id' => $program->id,
                'status' => 'active',
            ]);

        $response->assertCreated();
        $response->assertJsonPath('data.first_name', 'Maya');
        $response->assertJsonPath('data.program.id', $program->id);
        $this->assertMatchesRegularExpression('/^AXIS-\d{4}-\d{4}$/', $response->json('data.student_number'));

        $this->assertDatabaseHas('students', [
            'email' => 'maya@example.com',
            'program_id' => $program->id,
            'status' => 'active',
        ]);
    }

    public function test_certificate_verification_returns_verified_payload(): void
    {
        $faculty = Faculty::query()->create([
            'name' => 'Faculty of Computing',
            'slug' => 'computing',
            'description' => 'Computing programs',
            'icon' => 'cpu',
            'color' => 'text-primary',
        ]);

        $program = Program::query()->create([
            'faculty_id' => $faculty->id,
            'code' => 'BSC-DS',
            'title' => 'BSc Data Science',
            'level' => 'Bachelor',
            'duration' => '4 Years',
            'overview' => 'Data science overview',
            'description' => 'Data science description',
            'curriculum' => ['Analytics'],
            'requirements' => ['High school diploma'],
            'intake' => 25,
        ]);

        $student = Student::query()->create([
            'student_number' => 'AXIS-2024-0099',
            'first_name' => 'Caral',
            'last_name' => 'Davis',
            'email' => 'caral@example.com',
            'program_id' => $program->id,
            'status' => 'active',
        ]);

        Certificate::query()->create([
            'cert_id' => 'AXIS-2024-002',
            'student_id' => $student->id,
            'program_id' => $program->id,
            'year' => '2024',
            'issued_at' => now(),
            'meta' => [],
        ]);

        $response = $this->getJson('/api/v1/certificates/verify?cert_id=AXIS-2024-002&full_name=Caral%20Davis');

        $response->assertOk();
        $response->assertJsonPath('status', 'verified');
        $response->assertJsonPath('data.name', 'Caral Davis');
        $response->assertJsonPath('data.program', 'BSc Data Science');
        $response->assertJsonPath('data.year', '2024');
    }

    public function test_certificate_verification_not_found_returns_ok_status(): void
    {
        $response = $this->getJson('/api/v1/certificates/verify?cert_id=missing&full_name=No%20One');

        $response->assertOk();
        $response->assertJsonPath('status', 'not_found');
    }
}
