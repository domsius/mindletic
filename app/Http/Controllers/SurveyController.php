<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\SurveyQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SurveyController extends Controller
{
    public function create(Request $request)
    {
        Log::info('Received request to create survey', $request->all());

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

            return response()->json(['message' => 'Survey created successfully'], 201);
        } catch (\Exception $e) {
            Log::error('Error creating survey: ' . $e->getMessage());
            return response()->json(['message' => 'Error creating survey'], 500);
        }
    }

    public function index()
    {
        $surveys = Survey::with('questions')->get();
        return response()->json($surveys);
    }
}