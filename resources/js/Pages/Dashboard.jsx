import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import CreateSurvey from './CreateSurvey'; 
import SubmitSurvey from './SubmitSurvey'; 
import SurveyResults from './SurveyResults'; 

export default function Dashboard() {
    const { auth, surveys } = usePage().props; 

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {auth.user.role === 'admin' && (
                                <>
                                    <CreateSurvey />
                                    {surveys.map(survey => (
                                        <SurveyResults key={survey.id} survey={survey} />
                                    ))}
                                </>
                            )}
                            {auth.user.role === 'user' && (
                                <>
                                    {surveys.map(survey => (
                                        <SubmitSurvey key={survey.id} survey={survey} />
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}