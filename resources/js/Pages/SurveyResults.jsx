import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { Bar } from 'react-chartjs-2';
import { Typography, Container, Box } from '@mui/material';

const SurveyResults = ({ survey }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const labels = survey.questions.map(q => q.question);
        const data = survey.questions.map(q => {
            const responses = survey.responses.map(r => r.responses[q.id]);
            const average = responses.reduce((a, b) => a + b, 0) / responses.length;
            return average;
        });

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Survey Results',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        });
    }, [survey]);

    return (
        <Container maxWidth="sm">
            <Box mb={4}>
                <Typography component="h1" variant="h5">Survey Results</Typography>
                <Bar data={chartData} />
            </Box>
        </Container>
    );
};

export default SurveyResults;