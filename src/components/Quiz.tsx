'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type Question = {
    id: string;
    text: string;
    options: {
        label: string;
        value: string;
        icon?: string;
        scores?: Record<string, number>;
    }[];
};

const MALE_QUESTIONS: Question[] = [
    {
        id: 'male_goal',
        text: 'What is your main health goal?',
        options: [
            { label: 'Increase Energy', value: 'energy', icon: '⚡', scores: { energy: 10 } },
            { label: 'Testosterone Support', value: 'testosterone', icon: '🔥', scores: { testosterone: 10 } },
            { label: 'Improve Performance', value: 'performance', icon: '🏆', scores: { testosterone: 5, energy: 5 } },
            { label: 'Muscle Growth', value: 'muscle', icon: '💪', scores: { hormone_balance: 5, energy: 5 } },
            { label: 'Weight Loss', value: 'weight_loss', icon: '⚖️', scores: { weight_loss: 10 } },
            { label: 'Better Sleep', value: 'sleep', icon: '🌙', scores: { sleep: 10 } },
            { label: 'Stress Reduction', value: 'stress', icon: '🧘', scores: { sleep: 5, hormone_balance: 5 } },
        ],
    },
    {
        id: 'male_age',
        text: 'What is your age group?',
        options: [
            { label: '18–25', value: '18-25', icon: '🌱' },
            { label: '26–35', value: '26-35', icon: '🌿' },
            { label: '36–45', value: '36-45', icon: '🌳' },
            { label: '46–55', value: '46-55', icon: '🏔️' },
            { label: '55+', value: '55+', icon: '⭐' },
        ],
    },
    {
        id: 'male_energy',
        text: 'How is your daily energy level?',
        options: [
            { label: 'High — I feel great all day', value: 'high', icon: '🚀' },
            { label: 'Moderate — occasional dips', value: 'moderate', icon: '😐', scores: { energy: 2 } },
            { label: 'Low — I struggle with fatigue', value: 'low', icon: '😴', scores: { energy: 5, testosterone: 2 } },
        ],
    },
    {
        id: 'male_stress',
        text: 'Do you experience high stress?',
        options: [
            { label: 'Rarely', value: 'low', icon: '😊' },
            { label: 'Occasionally', value: 'moderate', icon: '😌', scores: { sleep: 2 } },
            { label: 'Frequently', value: 'high', icon: '😤', scores: { sleep: 5, hormone_balance: 3 } },
        ],
    },
];

const FEMALE_QUESTIONS: Question[] = [
    {
        id: 'female_goal',
        text: 'What is your main health goal?',
        options: [
            { label: 'Weight Management', value: 'weight_loss', icon: '⚖️', scores: { weight_loss: 10 } },
            { label: 'Hormone Balance', value: 'hormone', icon: '🌸', scores: { hormone_balance: 10 } },
            { label: 'Skin & Hair Health', value: 'hair', icon: '✨', scores: { hair: 10 } },
            { label: 'Energy Boost', value: 'energy', icon: '⚡', scores: { energy: 10 } },
            { label: 'Stress Relief', value: 'stress', icon: '🧘', scores: { hormone_balance: 5, sleep: 5 } },
            { label: 'Sleep Support', value: 'sleep', icon: '🌙', scores: { sleep: 10 } },
            { label: 'Gut Health', value: 'gut', icon: '🌿', scores: { gut_health: 10 } },
        ],
    },
    {
        id: 'female_age',
        text: 'What is your age group?',
        options: [
            { label: '18–25', value: '18-25', icon: '🌱' },
            { label: '26–35', value: '26-35', icon: '🌿' },
            { label: '36–45', value: '36-45', icon: '🌳' },
            { label: '46–55', value: '46-55', icon: '🏔️' },
            { label: '55+', value: '55+', icon: '⭐' },
        ],
    },
    {
        id: 'female_energy',
        text: 'Do you experience low energy during the day?',
        options: [
            { label: 'Never — always energized', value: 'never', icon: '🌟' },
            { label: 'Sometimes', value: 'sometimes', icon: '😐', scores: { energy: 3 } },
            { label: 'Almost daily', value: 'daily', icon: '😴', scores: { energy: 7, hormone_balance: 2 } },
        ],
    },
    {
        id: 'female_sleep',
        text: 'How is your sleep quality?',
        options: [
            { label: 'Great — sleep deeply', value: 'great', icon: '😴' },
            { label: 'Okay — could be better', value: 'okay', icon: '😌', scores: { sleep: 2 } },
            { label: 'Poor — I wake often', value: 'poor', icon: '😫', scores: { sleep: 6, hormone_balance: 2 } },
        ],
    },
];

export default function Quiz() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [gender, setGender] = useState<'male' | 'female' | null>(null);
    const [scores, setScores] = useState<Record<string, number>>({});
    const [isFinishing, setIsFinishing] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    const questions = gender === 'male' ? MALE_QUESTIONS : FEMALE_QUESTIONS;
    const totalSteps = gender ? questions.length + 1 : 1;
    const currentProgress = gender
        ? (step / (questions.length + 1)) * 100
        : 0;

    const handleGenderSelect = (selectedGender: 'male' | 'female') => {
        setGender(selectedGender);
        setStep(1);
        setSelected(null);
    };

    const handleAnswerSelect = (value: string, optionScores?: Record<string, number>) => {
        setSelected(value);
        setTimeout(() => {
            if (optionScores) {
                const newScores = { ...scores };
                Object.entries(optionScores).forEach(([cat, val]) => {
                    newScores[cat] = (newScores[cat] || 0) + val;
                });
                setScores(newScores);
            }
            if (step < questions.length) {
                setStep(step + 1);
                setSelected(null);
            } else {
                finishQuiz();
            }
        }, 220);
    };

    const finishQuiz = () => {
        setIsFinishing(true);
        let topCategory = 'energy';
        let maxScore = -1;
        Object.entries(scores).forEach(([cat, score]) => {
            if (score > maxScore) { maxScore = score; topCategory = cat; }
        });
        const slugMap: Record<string, string> = {
            energy: 'energy-support',
            testosterone: 'testosterone-support',
            weight_loss: 'weight-management',
            hormone_balance: 'hormone-balance',
            sleep: 'sleep-support',
            gut_health: 'gut-health',
            hair: 'hair-skin-health',
        };
        const finalSlug = `${gender}-${slugMap[topCategory] || topCategory}`;
        setTimeout(() => { router.push(`/quiz-result/${finalSlug}`); }, 1800);
    };

    /* ── Loading Screen ── */
    if (isFinishing) {
        return (
            <div className="card animate-fade-in" style={{
                textAlign: 'center',
                padding: '5rem 2rem',
                marginTop: '1rem',
            }}>
                <div style={{
                    width: '64px', height: '64px',
                    border: '4px solid var(--primary-light)',
                    borderTopColor: 'var(--primary)',
                    borderRadius: '50%',
                    margin: '0 auto 2rem',
                    animation: 'spin 0.8s linear infinite',
                }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>
                    Analyzing your profile…
                </h2>
                <p style={{ color: 'var(--foreground-muted)' }}>
                    Matching you with science-backed supplement recommendations.
                </p>
                <div style={{
                    marginTop: '2rem',
                    display: 'flex',
                    gap: '0.4rem',
                    justifyContent: 'center',
                }}>
                    {['🧬', '🔬', '✦'].map((e, i) => (
                        <span key={i} style={{ fontSize: '1.25rem', animation: `fadeIn 0.6s ease ${i * 0.3}s infinite alternate` }}>{e}</span>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '2rem 0' }}>

            {/* Progress */}
            {gender && (
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--foreground-muted)' }}>
                            Step {step} of {questions.length}
                        </span>
                        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)' }}>
                            {Math.round(currentProgress)}%
                        </span>
                    </div>
                    <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${currentProgress}%` }} />
                    </div>
                </div>
            )}

            {/* Card */}
            <div className="card animate-fade-in" style={{ padding: '2.5rem' }}>
                {step === 0 ? (
                    /* Gender Selection */
                    <div>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.375rem',
                            background: 'var(--primary-light)',
                            color: 'var(--primary)',
                            padding: '0.3rem 0.75rem',
                            borderRadius: '999px',
                            fontSize: '0.8125rem',
                            fontWeight: 600,
                            marginBottom: '1.5rem',
                        }}>
                            ✦ Step 1 of {MALE_QUESTIONS.length + 1}
                        </div>
                        <h2 style={{ fontSize: '1.625rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>
                            Let's personalize your results
                        </h2>
                        <p style={{ color: 'var(--foreground-muted)', marginBottom: '2rem', fontSize: '0.9375rem' }}>
                            Select your biological sex to get the most accurate recommendations.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {[
                                { value: 'male' as const, label: 'Male', icon: '♂', emoji: '💙', sub: 'Testosterone, energy, performance' },
                                { value: 'female' as const, label: 'Female', icon: '♀', emoji: '💜', sub: 'Hormones, skin, gut health' },
                            ].map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => handleGenderSelect(opt.value)}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.75rem',
                                        padding: '2rem 1.5rem',
                                        background: 'var(--surface)',
                                        border: '2px solid var(--border)',
                                        borderRadius: 'var(--radius-lg)',
                                        cursor: 'pointer',
                                        transition: 'var(--transition)',
                                        textAlign: 'center',
                                    }}
                                    onMouseEnter={e => {
                                        const el = e.currentTarget;
                                        el.style.borderColor = 'var(--primary)';
                                        el.style.background = 'var(--primary-light)';
                                        el.style.transform = 'translateY(-2px)';
                                        el.style.boxShadow = '0 8px 24px var(--primary-glow)';
                                    }}
                                    onMouseLeave={e => {
                                        const el = e.currentTarget;
                                        el.style.borderColor = 'var(--border)';
                                        el.style.background = 'var(--surface)';
                                        el.style.transform = 'translateY(0)';
                                        el.style.boxShadow = 'none';
                                    }}
                                >
                                    <span style={{ fontSize: '2.5rem' }}>{opt.emoji}</span>
                                    <div>
                                        <p style={{ fontWeight: 700, fontSize: '1.0625rem', marginBottom: '0.25rem' }}>{opt.label}</p>
                                        <p style={{ fontSize: '0.8125rem', color: 'var(--foreground-muted)' }}>{opt.sub}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Question */
                    <div>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.375rem',
                            background: 'var(--primary-light)',
                            color: 'var(--primary)',
                            padding: '0.3rem 0.75rem',
                            borderRadius: '999px',
                            fontSize: '0.8125rem',
                            fontWeight: 600,
                            marginBottom: '1.5rem',
                        }}>
                            ✦ Step {step + 1} of {questions.length + 1}
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem', letterSpacing: '-0.03em', lineHeight: 1.3 }}>
                            {questions[step - 1].text}
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                            {questions[step - 1].options.map((option, idx) => {
                                const isSelected = selected === option.value;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswerSelect(option.value, option.scores)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            padding: '0.875rem 1.25rem',
                                            background: isSelected ? 'var(--primary-light)' : 'var(--surface)',
                                            border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                                            borderRadius: 'var(--radius)',
                                            cursor: 'pointer',
                                            transition: 'var(--transition)',
                                            textAlign: 'left',
                                            width: '100%',
                                            color: isSelected ? 'var(--primary)' : 'var(--foreground)',
                                        }}
                                        onMouseEnter={e => {
                                            if (!isSelected) {
                                                const el = e.currentTarget;
                                                el.style.borderColor = 'var(--primary)';
                                                el.style.background = 'var(--primary-light)';
                                                el.style.color = 'var(--primary)';
                                            }
                                        }}
                                        onMouseLeave={e => {
                                            if (!isSelected) {
                                                const el = e.currentTarget;
                                                el.style.borderColor = 'var(--border)';
                                                el.style.background = 'var(--surface)';
                                                el.style.color = 'var(--foreground)';
                                            }
                                        }}
                                    >
                                        {option.icon && (
                                            <span style={{
                                                width: '36px', height: '36px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                background: isSelected ? 'var(--primary)' : 'var(--surface-2)',
                                                borderRadius: '10px',
                                                fontSize: '1.1rem',
                                                flexShrink: 0,
                                                transition: 'var(--transition)',
                                            }}>
                                                {option.icon}
                                            </span>
                                        )}
                                        <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{option.label}</span>
                                        {isSelected && (
                                            <span style={{ marginLeft: 'auto', color: 'var(--primary)' }}>✓</span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            onClick={() => { setStep(step - 1); setSelected(null); }}
                            style={{
                                marginTop: '1.75rem',
                                background: 'none',
                                border: 'none',
                                color: 'var(--foreground-muted)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.375rem',
                                padding: '0.25rem 0',
                                transition: 'color 0.2s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'var(--foreground-muted)'; }}
                        >
                            ← Back
                        </button>
                    </div>
                )}
            </div>

            {/* Trust signals */}
            <div style={{
                marginTop: '1.5rem',
                display: 'flex',
                justifyContent: 'center',
                gap: '1.5rem',
                flexWrap: 'wrap',
            }}>
                {['🔒 100% Private', '⚡ 2-min Quiz', '✦ Science-Backed'].map(item => (
                    <span key={item} style={{ fontSize: '0.8125rem', color: 'var(--foreground-subtle)', fontWeight: 500 }}>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
