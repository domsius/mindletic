<?php

use App\Http\Controllers\SurveyController;
use App\Http\Controllers\SurveyResponseController;
use Illuminate\Support\Facades\Route;

// Route::middleware('auth:sanctum')->group(function () {
    Route::post('/surveys', [SurveyController::class, 'create']);
    Route::get('/surveys', [SurveyController::class, 'index']);
    Route::post('/surveys/{survey}/responses', [SurveyResponseController::class, 'store'])->middleware('role:user');
    Route::get('/surveys/{survey}/responses', [SurveyResponseController::class, 'show'])->middleware('role:admin');
// });