<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\SurveyQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SurveyController extends Controller
{
    public function create(Request $request)
    {
        Log::info('SurveyController@create: Received request', $request->all());

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'questions' => 'required|array',
            'questions.*.question' => 'required|string|max:255',
            'questions.*.type' => 'required|string|in:rating,text'
        ]);

        try {
            $survey = Survey::create($request->only('title', 'description'));

            foreach ($request->questions as $question) {
                $survey->questions()->create($question);
            }

            return Inertia::render('SurveyCreated', [
                'message' => 'Survey created successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error creating survey: ' . $e->getMessage());
            return Inertia::render('ErrorPage', [
                'message' => 'Error creating survey'
            ]);
        }
    }

    public function index()
    {
        $surveys = Survey::with('questions')->get();
        return Inertia::render('SurveyList', [
            'surveys' => $surveys
        ]);
    }
}