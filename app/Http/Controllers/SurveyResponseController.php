<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Survey;
use App\Models\SurveyResponse;
use Illuminate\Support\Facades\Auth;

class SurveyResponseController extends Controller
{
    /**
     * Store a newly created survey response in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, Survey $survey)
    {
        $response = new SurveyResponse();
        $response->survey_id = $survey->id;
        $response->user_id = Auth::id();
        $response->responses = $request->input('responses');

        $response->save();

        return response()->json(['message' => 'Survey response submitted successfully'], 201);
    }

    public function show(Survey $survey)
    {
        $responses = $survey->responses()->with('user')->get();
        return response()->json($responses);
    }
}
