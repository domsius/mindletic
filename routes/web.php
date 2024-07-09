<?php

use App\Http\Controllers\ProfileController;
use App\Models\Survey;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use Inertia\Inertia;

// Root route, welcome page
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/surveys/create', function () {
        return Inertia::render('CreateSurvey');
    })->name('surveys.create');
});

Route::middleware(['auth:sanctum', 'role:user'])->group(function () {
    Route::get('/surveys/{survey}/submit', function (Survey $survey) {
        return Inertia::render('SubmitSurvey', ['survey' => $survey->load('questions')]);
    })->name('surveys.submit');
});

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/surveys/{survey}/results', function (Survey $survey) {
        return Inertia::render('SurveyResults', ['survey' => $survey->load(['questions', 'responses'])]);
    })->name('surveys.results');
});

require __DIR__.'/auth.php';