import Quiz from '@/components/Quiz';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Personalized Supplement Quiz | Find Your Perfect Health Match',
    description: 'Take our personalized supplement quiz to discover the best vitamins and nutrients for your specific health goals, gender, and lifestyle.',
};

export default function HealthQuizPage() {
    return (
        <div className="pb-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-blue-50 to-white pt-20 pb-12">
                <div className="container text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 animate-fade-in">
                        Personalized Supplement <span className="text-blue-600">Recommendation Quiz</span>
                    </h1>
                    <div className="max-w-3xl mx-auto mb-10 text-lg md:text-xl text-text-muted animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        <p className="mb-4">
                            Unlock the power of targeted nutrition with our science-backed quiz. In just 2 minutes,
                            we'll analyze your health goals, age, and lifestyle to identify the exact supplements
                            your body needs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Quiz Section */}
            <section id="quiz" className="container -mt-8 relative z-10">
                <Quiz />
            </section>

            {/* SEO Intro Text Section */}
            <section className="container mt-24 max-w-4xl prose prose-blue">
                <h2 className="text-3xl font-bold mb-6">Why Take a Personalized Supplement Quiz?</h2>
                <div className="text-text-muted space-y-4">
                    <p>
                        Navigating the world of vitamins and supplements can be overwhelming. With thousands of products
                        on the market, each claiming to solve various health issues, how do you know which ones are
                        actually right for you? This is where our <strong>Personalized Supplement Recommendation Quiz</strong>
                        comes in.
                    </p>
                    <p>
                        General multivitamins often take a "one size fits all" approach, but men and women have
                        vastly different nutritional requirements. Factors such as age, stress levels, exercise frequency,
                        and specific health goals (like muscle growth, hormone balance, or stress relief) play a
                        critical role in determine what your body requires to function at its peak.
                    </p>
                    <p>
                        Our system uses a sophisticated scoring algorithm to match your answers with high-quality,
                        Trustpilot-rated supplements. Whether you're a man looking for testosterone support and
                        increased energy, or a woman seeking hormone balance and improved skin health, our quiz
                        pinpoints the supplement categories that offer the highest potential benefit for your
                        unique biological profile.
                    </p>
                    <p>
                        By focusing only on what you need, you avoid wasting money on unnecessary pills and
                        ensure that you are supporting your body in the areas that matter most. Start your journey
                        toward optimized health today by completing the quiz above.
                    </p>
                </div>
            </section>

            {/* Educational SEO Sections */}
            <section className="bg-secondary mt-24 py-20">
                <div className="container">
                    <h2 className="text-3xl font-bold text-center mb-16">Expert Insights into Targeted Supplementation</h2>

                    <div className="grid grid-2 md:grid-3 gap-12">
                        <div className="card bg-white">
                            <h3 className="text-xl font-bold mb-4">Support for Men: Energy & Vitality</h3>
                            <p className="text-text-muted">
                                For men, maintaining healthy testosterone levels and consistent daily energy is often
                                a top priority. As we age, natural levels can fluctuate, leading to fatigue and
                                decreased performance. Supplements like Magnesium, Zinc, and specific adaptogens
                                can help support natural hormone production and mitochondrial function, ensuring
                                you stay energized throughout your busy day.
                            </p>
                        </div>

                        <div className="card bg-white">
                            <h3 className="text-xl font-bold mb-4">Female Health: Balance & Glow</h3>
                            <p className="text-text-muted">
                                Women's nutritional needs are closely tied to hormonal cycles and life stages.
                                Supporting hormone balance through supplements like B-vitamins, Iron, and Vitamin D
                                can significantly impact mood, energy, and even skin clarity. Furthermore, focused
                                support for hair and skin with Biotin and Collagen can provide that sought-after
                                natural glow from the inside out.
                            </p>
                        </div>

                        <div className="card bg-white">
                            <h3 className="text-xl font-bold mb-4">The Importance of Gut & Sleep</h3>
                            <p className="text-text-muted">
                                Regardless of gender, gut health and sleep quality are the foundations of all
                                wellness. A healthy microbiome ensures better nutrient absorption, while
                                restorative sleep is when your body repairs and regulates itself. Probiotics
                                and sleep aids like Magnesium Glycinate are frequently recommended to provide
                                this essential baseline support.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container mt-24 max-w-4xl">
                <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div className="card">
                        <h4 className="font-bold text-lg mb-2">How do I know which vitamins I need?</h4>
                        <p className="text-text-muted">
                            The best way to determine your vitamin needs is through a combination of blood work,
                            symptom analysis, and lifestyle assessment. Our quiz provides a structured baseline
                            by analyzing your primary health goals and symptoms to suggest categories that
                            typically address those specific needs.
                        </p>
                    </div>
                    <div className="card">
                        <h4 className="font-bold text-lg mb-2">Are supplement quizzes accurate?</h4>
                        <p className="text-text-muted">
                            While a quiz cannot replace a medical diagnosis, it uses established nutritional
                            guidelines to narrow down your focus. It helps filter through thousands of
                            options to highlight the 2-3 categories most relevant to your stated goals,
                            saving you time and research effort.
                        </p>
                    </div>
                    <div className="card">
                        <h4 className="font-bold text-lg mb-2">What supplements help increase energy?</h4>
                        <p className="text-text-muted">
                            Common energy-supporting supplements include B-Complex vitamins, which are
                            essential for cellular energy production, CoQ10 for mitochondrial health, and
                            Magnesium, which is involved in over 300 biochemical reactions in the body,
                            including the production of ATP.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
