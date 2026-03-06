'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Question = {
    id: string;
    text: string;
    options: {
        label: string;
        value: string;
        scores?: Record<string, number>;
    }[];
};

const MALE_QUESTIONS: Question[] = [
    {
        id: 'male_goal',
        text: 'What is your main health goal?',
        options: [
            { label: 'Increase Energy', value: 'energy', scores: { energy: 10 } },
            { label: 'Testosterone Support', value: 'testosterone', scores: { testosterone: 10 } },
            { label: 'Improve Performance', value: 'performance', scores: { testosterone: 5, energy: 5 } },
            { label: 'Muscle Growth', value: 'muscle', scores: { hormone_balance: 5, energy: 5 } },
            { label: 'Weight Loss', value: 'weight_loss', scores: { weight_loss: 10 } },
            { label: 'Better Sleep', value: 'sleep', scores: { sleep: 10 } },
            { label: 'Stress Reduction', value: 'stress', scores: { sleep: 5, hormone_balance: 5 } },
        ],
    },
    {
        id: 'male_age',
        text: 'What is your age group?',
        options: [
            { label: '18-25', value: '18-25' },
            { label: '26-35', value: '26-35' },
            { label: '36-45', value: '36-45' },
            { label: '46-55', value: '46-55' },
            { label: '55+', value: '55+' },
        ],
    },
    {
        id: 'male_energy',
        text: 'How is your daily energy level?',
        options: [
            { label: 'High', value: 'high' },
            { label: 'Moderate', value: 'moderate', scores: { energy: 2 } },
            { label: 'Low', value: 'low', scores: { energy: 5, testosterone: 2 } },
        ],
    },
    {
        id: 'male_stress',
        text: 'Do you experience high stress?',
        options: [
            { label: 'Rarely', value: 'low' },
            { label: 'Occasionally', value: 'moderate', scores: { sleep: 2 } },
            { label: 'Frequently', value: 'high', scores: { sleep: 5, hormone_balance: 3 } },
        ],
    },
];

const FEMALE_QUESTIONS: Question[] = [
    {
        id: 'female_goal',
        text: 'What is your main health goal?',
        options: [
            { label: 'Weight Management', value: 'weight_loss', scores: { weight_loss: 10 } },
            { label: 'Hormone Balance', value: 'hormone', scores: { hormone_balance: 10 } },
            { label: 'Skin and Hair Health', value: 'hair', scores: { hair: 10 } },
            { label: 'Energy Boost', value: 'energy', scores: { energy: 10 } },
            { label: 'Stress Relief', value: 'stress', scores: { hormone_balance: 5, sleep: 5 } },
            { label: 'Sleep Support', value: 'sleep', scores: { sleep: 10 } },
            { label: 'Gut Health', value: 'gut', scores: { gut_health: 10 } },
        ],
    },
    {
        id: 'female_age',
        text: 'What is your age group?',
        options: [
            { label: '18-25', value: '18-25' },
            { label: '26-35', value: '26-35' },
            { label: '36-45', value: '36-45' },
            { label: '46-55', value: '46-55' },
            { label: '55+', value: '55+' },
        ],
    },
    {
        id: 'female_energy',
        text: 'Do you experience low energy during the day?',
        options: [
            { label: 'Never', value: 'never' },
            { label: 'Sometimes', value: 'sometimes', scores: { energy: 3 } },
            { label: 'Almost daily', value: 'daily', scores: { energy: 7, hormone_balance: 2 } },
        ],
    },
    {
        id: 'female_sleep',
        text: 'How is your sleep quality?',
        options: [
            { label: 'Great', value: 'great' },
            { label: 'Okay', value: 'okay', scores: { sleep: 2 } },
            { label: 'Poor', value: 'poor', scores: { sleep: 6, hormone_balance: 2 } },
        ],
    },
];

export default function Quiz() {
    const router = useRouter();
    const [step, setStep] = useState(0); // 0: Gender selector, 1+: Questions
    const [gender, setGender] = useState<'male' | 'female' | null>(null);
    const [scores, setScores] = useState<Record<string, number>>({});
    const [isFinishing, setIsFinishing] = useState(false);

    const questions = gender === 'male' ? MALE_QUESTIONS : FEMALE_QUESTIONS;
    const totalSteps = gender ? questions.length + 1 : 1;
    const currentProgress = ((step + (gender ? 1 : 0)) / (totalSteps + 1)) * 100;

    const handleGenderSelect = (selectedGender: 'male' | 'female') => {
        setGender(selectedGender);
        setStep(1);
    };

    const handleAnswerSelect = (optionScores?: Record<string, number>) => {
        if (optionScores) {
            const newScores = { ...scores };
            Object.entries(optionScores).forEach(([cat, val]) => {
                newScores[cat] = (newScores[cat] || 0) + val;
            });
            setScores(newScores);
        }

        if (step < questions.length) {
            setStep(step + 1);
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = () => {
        setIsFinishing(true);
        // Determine top category
        let topCategory = 'energy';
        let maxScore = -1;

        Object.entries(scores).forEach(([cat, score]) => {
            if (score > maxScore) {
                maxScore = score;
                topCategory = cat;
            }
        });

        // Simple mapping for demo, usually we'd use the slug from DB
        const slugMap: Record<string, string> = {
            energy: 'energy-support',
            testosterone: 'testosterone-support',
            weight_loss: 'weight-management',
            hormone_balance: 'hormone-balance',
            sleep: 'sleep-support',
            gut_health: 'gut-health',
            hair: 'hair-skin-health'
        };

        const finalSlug = `${gender}-${slugMap[topCategory] || topCategory}`;

        // Simulate thinking for UX
        setTimeout(() => {
            router.push(`/quiz-result/${finalSlug}`);
        }, 1500);
    };

    if (isFinishing) {
        return (
            <div className="card text-center animate-fade-in py-12">
                <div className="mb-6 mx-auto w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <h2 className="text-2xl font-bold mb-2">Analyzing your answers...</h2>
                <p className="text-text-muted">Calculating your personalized supplement recommendations.</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-sm font-medium text-text-muted mb-2">
                    <span>{gender ? `Step ${step + 1} of ${questions.length + 1}` : 'Getting Started'}</span>
                    <span>{Math.round(currentProgress)}%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-500 ease-out"
                        style={{ width: `${currentProgress}%` }}
                    ></div>
                </div>
            </div>

            <div className="animate-fade-in mt-4">
                {step === 0 ? (
                    <div className="card">
                        <h2 className="text-2xl font-bold mb-8 text-center">What is your gender?</h2>
                        <div className="grid grid-2 gap-4">
                            <button
                                onClick={() => handleGenderSelect('male')}
                                className="btn btn-secondary h-32 flex flex-col gap-2 hover:border-primary border-2 border-transparent transition-all"
                            >
                                <span className="text-3xl">♂️</span>
                                <span>Male</span>
                            </button>
                            <button
                                onClick={() => handleGenderSelect('female')}
                                className="btn btn-secondary h-32 flex flex-col gap-2 hover:border-primary border-2 border-transparent transition-all"
                            >
                                <span className="text-3xl">♀️</span>
                                <span>Female</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="card">
                        <h2 className="text-2xl font-bold mb-8">{questions[step - 1].text}</h2>
                        <div className="flex flex-col gap-3">
                            {questions[step - 1].options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswerSelect(option.scores)}
                                    className="btn btn-secondary text-left justify-start py-4 px-6 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-transparent transition-all"
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setStep(step - 1)}
                            className="mt-8 text-sm text-text-muted hover:text-primary transition flex items-center gap-1"
                        >
                            ← Back
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
