import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/globals.css';

const jakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-sans',
    weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
    title: 'Health Quiz - Personalized Supplement Recommendations',
    description: 'Take our short quiz to receive personalized health supplement recommendations based on your unique needs and goals.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={jakarta.variable}>
                {/* Header */}
                <header className="glass sticky top-0 z-50">
                    <nav className="container py-4 flex justify-between items-center">
                        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{
                                width: '32px', height: '32px',
                                background: 'var(--gradient-primary)',
                                borderRadius: '8px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '16px',
                            }}>✦</span>
                            <span style={{
                                fontSize: '1.25rem',
                                fontWeight: 800,
                                background: 'var(--gradient-primary)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                letterSpacing: '-0.03em',
                            }}>
                                HealthQuiz
                            </span>
                        </a>
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                            <a href="/health-quiz" style={{
                                fontSize: '0.9375rem',
                                fontWeight: 500,
                                color: 'var(--foreground-muted)',
                                transition: 'color 0.2s',
                            }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--foreground-muted)')}
                            >Quiz</a>
                            <a href="/about" style={{
                                fontSize: '0.9375rem',
                                fontWeight: 500,
                                color: 'var(--foreground-muted)',
                                transition: 'color 0.2s',
                            }}>About</a>
                            <a href="/research" style={{
                                fontSize: '0.9375rem',
                                fontWeight: 500,
                                color: 'var(--foreground-muted)',
                                transition: 'color 0.2s',
                            }}>Research</a>
                            <a href="/health-quiz" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
                                Take Quiz →
                            </a>
                        </div>
                    </nav>
                </header>

                <main>{children}</main>

                {/* Footer */}
                <footer style={{
                    background: 'var(--surface)',
                    borderTop: '1px solid var(--border)',
                    marginTop: '5rem',
                    paddingTop: '4rem',
                    paddingBottom: '2.5rem',
                }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <span style={{
                                        width: '28px', height: '28px',
                                        background: 'var(--gradient-primary)',
                                        borderRadius: '7px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '14px',
                                    }}>✦</span>
                                    <span style={{ fontWeight: 800, fontSize: '1.125rem', letterSpacing: '-0.03em' }}>HealthQuiz</span>
                                </div>
                                <p style={{ color: 'var(--foreground-muted)', maxWidth: '300px', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                    Personalized, science-backed supplement recommendations tailored to your unique health goals and lifestyle.
                                </p>
                            </div>
                            <div>
                                <p style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--foreground-subtle)' }}>Navigation</p>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                    {[['About Us', '/about'], ['Editorial Policy', '/editorial-policy'], ['Research', '/research'], ['Contact', '/contact']].map(([label, href]) => (
                                        <li key={href}><a href={href} style={{ color: 'var(--foreground-muted)', fontSize: '0.9375rem', transition: 'color 0.2s' }}>{label}</a></li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--foreground-subtle)' }}>Legal</p>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                    {[['Disclaimer', '/disclaimer'], ['Privacy Policy', '/privacy'], ['Terms of Service', '/terms']].map(([label, href]) => (
                                        <li key={href}><a href={href} style={{ color: 'var(--foreground-muted)', fontSize: '0.9375rem', transition: 'color 0.2s' }}>{label}</a></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center', textAlign: 'center' }}>
                            <p style={{ color: 'var(--foreground-subtle)', fontSize: '0.875rem' }}>
                                © {new Date().getFullYear()} HealthQuiz. All rights reserved.
                            </p>
                            <p style={{ color: 'var(--foreground-subtle)', fontSize: '0.8125rem', maxWidth: '600px', lineHeight: 1.6 }}>
                                <strong>Disclaimer:</strong> This content is for informational purposes only and does not constitute medical advice. Always consult a healthcare professional before starting any supplement regimen.
                            </p>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    );
}
