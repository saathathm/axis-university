<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class FileUploadHelper
{
    public static function uploadImage(UploadedFile $file, string $folder): string
    {
        $filename = uniqid() . '.webp';
        $path = $folder . '/' . $filename;

        $manager = new ImageManager(new Driver());

        $image = $manager->read($file->getRealPath());

        $image->scaleDown(width: 1200);

        $encodedImage = $image->toWebp(75);

        Storage::disk('public')->put($path, (string) $encodedImage);

        return $path;
    }

    public static function uploadFile(UploadedFile $file, string $folder): string
    {
        return $file->store($folder, 'public');
    }

    public static function deleteFile(?string $path): void
    {
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}