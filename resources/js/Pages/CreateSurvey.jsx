import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const CreateSurvey = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([
        { question: 'Rate the quality of the consultation (1-5)', type: 'rating' },
        { question: 'Rate the professionalism of the psychologist (1-5)', type: 'rating' },
        { question: 'Rate your overall satisfaction with the service (1-5)', type: 'rating' },
        { question: 'Open-ended feedback for additional comments', type: 'text' }
    ]);

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', type: 'text' }]);
    };

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const handleRemoveQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/api/surveys', {
            title,
            description,
            questions
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    rows={4}
                />
            </div>
            <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Questions</h3>
                {questions.map((q, index) => (
                    <div key={index} className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Question {index + 1}
                        </label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={q.question}
                                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                            <select
                                value={q.type}
                                onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                                className="ml-2 mt-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            >
                                <option value="rating">Rating</option>
                                <option value="text">Text</option>
                            </select>
                            <button
                                type="button"
                                onClick={() => handleRemoveQuestion(index)}
                                className="ml-2 inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add Question
                </button>
            </div>
            <div>
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Create Survey
                </button>
            </div>
        </form>
    );
};

export default CreateSurvey;