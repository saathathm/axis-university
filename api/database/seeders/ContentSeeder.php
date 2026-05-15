<?php

namespace Database\Seeders;

use App\Models\Download;
use App\Models\News;
use Illuminate\Database\Seeder;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $news = [
            ['title' => 'Axis University signs partnership with European research network', 'date' => '2026-04-18', 'excerpt' => 'A new agreement opens up joint research opportunities for students and faculty.', 'body' => 'A new agreement opens up joint research opportunities for students and faculty.'],
            ['title' => 'Annual Innovation Week returns with 40+ student startups', 'date' => '2026-04-02', 'excerpt' => 'Students from every faculty pitch ideas to industry mentors and investors.', 'body' => 'Students from every faculty pitch ideas to industry mentors and investors.'],
            ['title' => 'New scholarships announced for the 2026/2027 intake', 'date' => '2026-03-22', 'excerpt' => 'Merit and need-based scholarships covering up to 100% of tuition.', 'body' => 'Merit and need-based scholarships covering up to 100% of tuition.'],
        ];

        foreach ($news as $item) {
            News::query()->updateOrCreate(['title' => $item['title']], $item);
        }

        $downloads = [
            ['category' => 'Brochures', 'title' => 'University Prospectus 2026', 'path' => 'downloads/prospectus-2026.pdf', 'size' => '4.2 MB', 'published' => true],
            ['category' => 'Brochures', 'title' => 'Academic Programs Catalog', 'path' => 'downloads/programs-catalog.pdf', 'size' => '2.8 MB', 'published' => true],
            ['category' => 'Forms', 'title' => 'Admission Application Form', 'path' => 'downloads/admission-form.pdf', 'size' => '320 KB', 'published' => true],
            ['category' => 'Forms', 'title' => 'Scholarship Request Form', 'path' => 'downloads/scholarship-form.pdf', 'size' => '210 KB', 'published' => true],
            ['category' => 'Handbooks', 'title' => 'Student Handbook', 'path' => 'downloads/student-handbook.pdf', 'size' => '1.6 MB', 'published' => true],
        ];

        foreach ($downloads as $item) {
            Download::query()->updateOrCreate(['title' => $item['title']], $item);
        }
    }
}