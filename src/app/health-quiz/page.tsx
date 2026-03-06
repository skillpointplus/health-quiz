import Quiz from '@/components/Quiz';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Personalized Supplement Quiz | Find Your Perfect Health Match',
    description: 'Take our personalized supplement quiz to discover the best vitamins and nutrients for your specific health goals, gender, and lifestyle.',
};

const features = [
    { icon: '🎯', title: 'Precision Matching', desc: 'Our algorithm analyzes 8+ data points to find your ideal match' },
    { icon: '⚡', title: '2-Minute Quiz', desc: 'Fast, simple questions designed by nutrition experts' },
    { icon: '⭐', title: 'Trustpilot Verified', desc: 'Only top-rated products with thousands of real reviews' },
];

const insights = [
    {
        icon: '💪',
        title: 'Support for Men: Energy & Vitality',
        desc: 'For men, maintaining healthy testosterone levels and daily energy is a top priority. Supplements like Magnesium, Zinc, and adaptogens help support natural hormone production and mitochondrial function.',
    },
    {
        icon: '✨',
        title: 'Female Health: Balance & Glow',
        desc: "Women's nutritional needs are tied to hormonal cycles. B-vitamins, Iron, and Vitamin D impact mood and energy. Biotin and Collagen provide that sought-after natural glow from the inside out.",
    },
    {
        icon: '🌿',
        title: 'Gut & Sleep Foundation',
        desc: 'Gut health and sleep quality are the foundations of all wellness. A healthy microbiome ensures better nutrient absorption, while restorative sleep is when your body repairs and regulates itself.',
    },
];

const faqs = [
    {
        q: 'How do I know which vitamins I need?',
        a: 'The best way is through blood work, symptom analysis, and lifestyle assessment. Our quiz provides a structured baseline by analyzing your primary health goals to suggest categories that address your specific needs.',
    },
    {
        q: 'Are supplement quizzes accurate?',
        a: 'While a quiz cannot replace a medical diagnosis, it uses established nutritional guidelines to narrow your focus — filtering through thousands of options to highlight the 2–3 categories most relevant to your stated goals.',
    },
    {
        q: 'What supplements help increase energy?',
        a: 'Common energy-supporting supplements include B-Complex vitamins for cellular energy production, CoQ10 for mitochondrial health, and Magnesium, which is involved in over 300 biochemical reactions including ATP production.',
    },
];

export default function HealthQuizPage() {
    return (
        <div style={{ paddingBottom: '5rem' }}>

            {/* ── Hero Section ── */}
            <section style={{
                background: 'var(--gradient-hero)',
                paddingTop: '5rem',
                paddingBottom: '2rem',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Decorative blobs */}
                <div className="blob" style={{
                    width: '500px', height: '500px',
                    background: 'var(--primary)',
                    top: '-200px', right: '-100px',
                    opacity: 0.12,
                }} />
                <div className="blob" style={{
                    width: '400px', height: '400px',
                    background: 'var(--accent)',
                    bottom: '-150px', left: '-80px',
                    opacity: 0.1,
                    animationDelay: '4s',
                }} />

                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <div className="badge badge-primary animate-fade-in" style={{ margin: '0 auto 1.5rem', display: 'inline-flex' }}>
                        ✦ Science-Backed Recommendations
                    </div>
                    <h1 className="animate-fade-in" style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        fontWeight: 900,
                        marginBottom: '1.5rem',
                        letterSpacing: '-0.04em',
                        lineHeight: 1.1,
                        animationDelay: '0.05s',
                    }}>
                        Find Your Perfect{' '}
                        <span className="text-gradient">Health Supplement</span>
                        {' '}in 2 Minutes
                    </h1>
                    <p className="animate-fade-in" style={{
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        color: 'var(--foreground-muted)',
                        maxWidth: '600px',
                        margin: '0 auto 3rem',
                        lineHeight: 1.7,
                        animationDelay: '0.1s',
                    }}>
                        Our AI-powered quiz analyzes your health goals, age, and lifestyle to identify
                        the exact supplements your body needs — no guesswork required.
                    </p>

                    {/* Feature pills */}
                    <div className="animate-fade-in" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.75rem',
                        justifyContent: 'center',
                        marginBottom: '3rem',
                        animationDelay: '0.15s',
                    }}>
                        {features.map(f => (
                            <div key={f.title} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: 'white',
                                border: '1px solid var(--border)',
                                borderRadius: '999px',
                                padding: '0.4rem 1rem 0.4rem 0.6rem',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: 'var(--foreground)',
                                boxShadow: '0 1px 4px rgb(0 0 0 / 0.06)',
                            }}>
                                <span>{f.icon}</span>
                                <span>{f.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Quiz Section ── */}
            <section id="quiz" className="container" style={{ marginTop: '-1rem', position: 'relative', zIndex: 10, maxWidth: '760px' }}>
                <Quiz />
            </section>

            {/* ── Why Take a Quiz ── */}
            <section className="container" style={{ marginTop: '6rem', maxWidth: '800px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div className="badge badge-primary" style={{ margin: '0 auto 1rem' }}>Why It Works</div>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>
                        Why Take a Personalized Supplement Quiz?
                    </h2>
                </div>
                <div style={{ color: 'var(--foreground-muted)', display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '1.0625rem', lineHeight: 1.8 }}>
                    <p>
                        Navigating the world of vitamins and supplements can be overwhelming. With thousands of products
                        on the market, our <strong style={{ color: 'var(--foreground)' }}>Personalized Supplement Recommendation Quiz</strong> cuts through the noise.
                    </p>
                    <p>
                        General multivitamins take a "one size fits all" approach — but men and women have vastly different
                        nutritional requirements. Age, stress levels, exercise frequency, and specific health goals all
                        play a critical role in what your body needs to perform at its peak.
                    </p>
                    <p>
                        Our scoring algorithm matches your answers with high-quality, Trustpilot-rated supplements.
                        By focusing only on what you need, you avoid wasting money on unnecessary pills and ensure
                        your body gets targeted, evidence-based support.
                    </p>
                </div>
            </section>

            {/* ── Expert Insights ── */}
            <section style={{ background: 'var(--surface)', marginTop: '5rem', padding: '5rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                        <div className="badge badge-primary" style={{ margin: '0 auto 1rem' }}>Expert Insights</div>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>
                            Targeted Supplementation by Goal
                        </h2>
                    </div>
                    <div className="grid grid-3">
                        {insights.map((item) => (
                            <div key={item.title} className="card" style={{ textAlign: 'left' }}>
                                <div style={{
                                    width: '48px', height: '48px',
                                    background: 'var(--primary-light)',
                                    borderRadius: '12px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    marginBottom: '1.25rem',
                                }}>
                                    {item.icon}
                                </div>
                                <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{item.title}</h3>
                                <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9375rem', lineHeight: 1.7 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="container" style={{ marginTop: '5rem', maxWidth: '720px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="badge badge-primary" style={{ margin: '0 auto 1rem' }}>FAQ</div>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>
                        Frequently Asked Questions
                    </h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqs.map((faq, i) => (
                        <div key={i} className="card" style={{ padding: '1.5rem 1.75rem' }}>
                            <h4 style={{ fontWeight: 700, fontSize: '1.0625rem', marginBottom: '0.625rem', letterSpacing: '-0.01em' }}>
                                {faq.q}
                            </h4>
                            <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: 0 }}>
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA Banner ── */}
            <section className="container" style={{ marginTop: '5rem', maxWidth: '900px' }}>
                <div style={{
                    background: 'var(--gradient-primary)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '3.5rem',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        position: 'absolute', top: '-60px', right: '-60px',
                        width: '250px', height: '250px',
                        background: 'rgba(255,255,255,0.08)',
                        borderRadius: '50%',
                    }} />
                    <div style={{
                        position: 'absolute', bottom: '-40px', left: '-40px',
                        width: '180px', height: '180px',
                        background: 'rgba(255,255,255,0.06)',
                        borderRadius: '50%',
                    }} />
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                        Ready to Start?
                    </p>
                    <h2 style={{ color: 'white', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
                        Discover Your Ideal Supplements Today
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
                        Join thousands who've already optimized their health with our personalized quiz.
                    </p>
                    <a href="#quiz" className="btn" style={{
                        background: 'white',
                        color: 'var(--primary)',
                        fontWeight: 700,
                        padding: '0.875rem 2.25rem',
                        fontSize: '1rem',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    }}>
                        Take the Free Quiz →
                    </a>
                </div>
            </section>
        </div>
    );
}
