<?php

namespace Database\Seeders;

use App\Models\Certificate;
use App\Models\Faculty;
use App\Models\Program;
use App\Models\Student;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class InitialDataSeeder extends Seeder
{
    public function run(): void
    {
        $faculties = collect([
            ['name' => 'Business & Management', 'slug' => 'business', 'description' => 'Build leadership skills for a global economy.', 'icon' => 'Briefcase', 'color' => 'text-accent'],
            ['name' => 'Information Technology', 'slug' => 'it', 'description' => 'Software, data, AI and modern computing.', 'icon' => 'Cpu', 'color' => 'text-primary'],
            ['name' => 'Health Sciences', 'slug' => 'health', 'description' => 'Care, research and modern healthcare practice.', 'icon' => 'HeartPulse', 'color' => 'text-accent'],
            ['name' => 'Law & Public Policy', 'slug' => 'law', 'description' => 'Justice, governance and international law.', 'icon' => 'Scale', 'color' => 'text-primary'],
            ['name' => 'Arts & Design', 'slug' => 'arts', 'description' => 'Creativity, media and visual communication.', 'icon' => 'Palette', 'color' => 'text-accent'],
            ['name' => 'Education', 'slug' => 'edu', 'description' => 'Teaching, learning and educational leadership.', 'icon' => 'GraduationCap', 'color' => 'text-primary'],
        ])->mapWithKeys(fn ($faculty) => [$faculty['slug'] => Faculty::query()->updateOrCreate(['slug' => $faculty['slug']], $faculty)]);

        $programs = [
            ['faculty' => 'business', 'code' => 'P1', 'title' => 'BBA in Marketing', 'level' => 'Bachelor', 'duration' => '4 years', 'overview' => 'Build a strong foundation in marketing strategy, consumer behavior, digital campaigns, and brand management.', 'description' => 'Strategic marketing, branding and digital channels.', 'curriculum' => ['Principles of Marketing', 'Consumer Behavior', 'Digital Marketing', 'Brand Strategy'], 'requirements' => ['High school diploma or equivalent', 'Basic English proficiency', 'Interview for final shortlist']],
            ['faculty' => 'business', 'code' => 'P2', 'title' => 'MBA Executive', 'level' => 'Master', 'duration' => '2 years', 'overview' => 'Designed for working professionals who want to strengthen strategic leadership and executive decision-making.', 'description' => 'Advanced leadership for senior managers.', 'curriculum' => ['Strategic Management', 'Leadership & Change', 'Financial Decision Making', 'Executive Project'], 'requirements' => ['Bachelor\'s degree', 'Professional experience preferred', 'CV and interview']],
            ['faculty' => 'it', 'code' => 'P3', 'title' => 'BSc Computer Science', 'level' => 'Bachelor', 'duration' => '4 years', 'overview' => 'Study computing from the ground up with a strong balance of theory, coding practice, and modern AI foundations.', 'description' => 'Algorithms, software engineering and AI foundations.', 'curriculum' => ['Programming Fundamentals', 'Data Structures', 'Software Engineering', 'AI Foundations'], 'requirements' => ['High school diploma or equivalent', 'Mathematics background', 'Placement review']],
            ['faculty' => 'it', 'code' => 'P4', 'title' => 'MSc Data Science', 'level' => 'Master', 'duration' => '2 years', 'overview' => 'Explore data pipelines, machine learning, and analytics workflows used in real-world decision making.', 'description' => 'Machine learning, analytics and big data.', 'curriculum' => ['Python for Data Science', 'Machine Learning', 'Data Visualization', 'Big Data Analytics'], 'requirements' => ['Bachelor\'s degree in a related field', 'Programming familiarity', 'Transcript review']],
            ['faculty' => 'health', 'code' => 'P6', 'title' => 'BSc Nursing', 'level' => 'Bachelor', 'duration' => '4 years', 'overview' => 'Prepare for professional nursing practice through evidence-based study and supervised clinical experience.', 'description' => 'Clinical practice and patient care.', 'curriculum' => ['Anatomy & Physiology', 'Clinical Nursing', 'Community Health', 'Patient Care'], 'requirements' => ['Science background', 'Health screening', 'Interview and placement assessment']],
        ];

        $createdPrograms = collect();

        foreach ($programs as $program) {
            $createdPrograms[$program['code']] = Program::query()->updateOrCreate(
                ['code' => $program['code']],
                [
                    'faculty_id' => $faculties[$program['faculty']]->id,
                    'title' => $program['title'],
                    'level' => $program['level'],
                    'duration' => $program['duration'],
                    'overview' => $program['overview'],
                    'description' => $program['description'],
                    'curriculum' => $program['curriculum'],
                    'requirements' => $program['requirements'],
                    'intake' => 25,
                ]
            );
        }

        $students = [
            [
                'student_number' => 'AXIS-2024-0001',
                'first_name' => 'Sara',
                'last_name' => 'Ahmed',
                'email' => 'sara.ahmed@example.com',
                'program_code' => 'P1',
                'cert_id' => 'AXIS-2024-001',
                'year' => '2024',
            ],
            [
                'student_number' => 'AXIS-2024-0002',
                'first_name' => 'Caral',
                'last_name' => 'Davis',
                'email' => 'caral.davis@example.com',
                'program_code' => 'P3',
                'cert_id' => 'AXIS-2024-002',
                'year' => '2024',
            ],
        ];

        foreach ($students as $studentData) {
            $program = $createdPrograms[$studentData['program_code']] ?? null;

            if (! $program) {
                continue;
            }

            $student = Student::query()->updateOrCreate(
                ['student_number' => $studentData['student_number']],
                [
                    'first_name' => $studentData['first_name'],
                    'last_name' => $studentData['last_name'],
                    'email' => $studentData['email'],
                    'program_id' => $program->id,
                    'enrolled_at' => now(),
                    'status' => 'active',
                ],
            );

            Certificate::query()->updateOrCreate(
                ['cert_id' => $studentData['cert_id']],
                [
                    'student_id' => $student->id,
                    'program_id' => $program->id,
                    'year' => $studentData['year'],
                    'issued_at' => now(),
                    'meta' => [],
                ],
            );
        }

        $testimonials = [
            ['name' => 'Sara Ahmed', 'program' => 'BBA Marketing, 2024', 'quote' => 'Axis gave me the tools and the global perspective I needed to start my career with confidence.', 'approved' => true],
            ['name' => 'Omar Hassan', 'program' => 'MSc Data Science, 2023', 'quote' => 'Brilliant faculty and modern facilities. The data science program changed my career path entirely.', 'approved' => true],
            ['name' => 'Layla Mansour', 'program' => 'LLB Law, 2025', 'quote' => 'The professors care, the community is strong, and the international exposure is unmatched.', 'approved' => true],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::query()->updateOrCreate(
                ['name' => $testimonial['name'], 'program' => $testimonial['program']],
                $testimonial
            );
        }
    }
}
