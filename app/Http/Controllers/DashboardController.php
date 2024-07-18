<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $surveys = Survey::with('questions')->get();

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user
            ],
            'surveys' => $surveys
        ]);
    }
}