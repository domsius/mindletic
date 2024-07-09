import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import { TextField, Button, Typography, Container, Box, Rating } from '@mui/material';

const SubmitSurvey = ({ survey }) => {
    const [responses, setResponses] = useState({});

    useEffect(() => {
        const initialResponses = {};
        survey.questions.forEach(q => {
            initialResponses[q.id] = q.type === 'rating' ? 0 : '';
        });
        setResponses(initialResponses);
    }, [survey]);

    const handleResponseChange = (questionId, value) => {
        setResponses({ ...responses, [questionId]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(`/api/surveys/${survey.id}/responses`, {
            responses,
        });
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Typography component="h1" variant="h5">{survey.title}</Typography>
                {survey.questions.map((q) => (
                    <Box key={q.id} mb={2}>
                        <Typography variant="h6">{q.question}</Typography>
                        {q.type === 'rating' ? (
                            <Rating
                                value={responses[q.id]}
                                onChange={(event, newValue) => handleResponseChange(q.id, newValue)}
                            />
                        ) : (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={responses[q.id]}
                                onChange={(e) => handleResponseChange(q.id, e.target.value)}
                            />
                        )}
                    </Box>
                ))}
                <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '16px' }}>Submit Survey</Button>
            </Box>
        </Container>
    );
};

export default SubmitSurvey;