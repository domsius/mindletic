<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Survey;

class DashboardController extends Controller
{
    public function index()
    {
        $surveys = Survey::with('questions', 'responses')->get(); 
        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => auth()->user(),
            ],
            'surveys' => $surveys,
        ]);
    }
}