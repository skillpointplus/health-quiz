import { supabase, Product } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const parts = slug.split('-');
    const gender = parts[0];
    const goal = parts.slice(1).join(' ').replace(/-/g, ' ');
    return {
        title: `Your ${goal.charAt(0).toUpperCase() + goal.slice(1)} Recommendations | HealthQuiz`,
        description: `Personalized supplement recommendations for ${gender} focusing on ${goal}.`,
    };
}

export default async function ResultPage({ params }: Props) {
    const { slug } = await params;
    const parts = slug.split('-');
    const gender = parts[0] as 'male' | 'female';
    const categorySlug = parts.slice(1).join('-');

    const { data: categoryData } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', categorySlug)
        .single();

    const { data: products } = await supabase
        .from('products')
        .select('*')
        .eq('gender_target', gender)
        .eq('category', categoryData?.id)
        .order('trustpilot_rating', { ascending: false })
        .limit(3);

    const hasProducts = products && products.length > 0;
    const goalLabel = categorySlug.replace(/-/g, ' ');
    const rankLabels = ['🥇 Top Pick', '🥈 Runner-Up', '🥉 Also Great'];

    return (
        <div style={{ paddingBottom: '5rem', paddingTop: '3rem' }}>
            <div className="container" style={{ maxWidth: '920px' }}>

                {/* ── Header ── */}
                <header className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: '#d1fae5',
                        color: '#065f46',
                        padding: '0.4rem 1rem',
                        borderRadius: '999px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        marginBottom: '1.5rem',
                    }}>
                        ✅ Analysis Complete
                    </div>
                    <h1 style={{
                        fontSize: 'clamp(1.875rem, 5vw, 3rem)',
                        fontWeight: 900,
                        letterSpacing: '-0.04em',
                        marginBottom: '1rem',
                        lineHeight: 1.1,
                    }}>
                        Your Personalized{' '}
                        <span className="text-gradient">Supplement Plan</span>
                    </h1>

                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        background: 'var(--primary-light)',
                        border: '1px solid var(--primary)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '0.875rem 1.5rem',
                        margin: '0 auto 1.5rem',
                    }}>
                        <span style={{ fontSize: '1.25rem' }}>🎯</span>
                        <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1rem' }}>
                            Priority Focus:{' '}
                            <span style={{ textTransform: 'capitalize' }}>{goalLabel}</span>
                            {' '}for {gender}s
                        </p>
                    </div>

                    <p style={{
                        color: 'var(--foreground-muted)',
                        maxWidth: '560px',
                        margin: '0 auto',
                        lineHeight: 1.7,
                        fontSize: '1.0625rem',
                    }}>
                        Based on your answers, our algorithm identified <strong style={{ color: 'var(--foreground)' }}>{goalLabel}</strong> as
                        your primary health priority. Here are the top-rated options tailored to your profile.
                    </p>
                </header>

                {/* ── Products ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem' }}>
                    {hasProducts ? (
                        products.map((product: Product, idx: number) => (
                            <div
                                key={product.id}
                                className="card animate-fade-in"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '2rem',
                                    padding: '2rem',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    border: idx === 0
                                        ? '2px solid var(--primary)'
                                        : '1px solid var(--card-border)',
                                    animationDelay: `${0.1 + idx * 0.1}s`,
                                }}
                            >
                                {/* Rank badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: idx === 0 ? 'var(--gradient-primary)' : 'var(--surface-2)',
                                    color: idx === 0 ? 'white' : 'var(--foreground-muted)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '999px',
                                    fontSize: '0.8125rem',
                                    fontWeight: 700,
                                }}>
                                    {rankLabels[idx]}
                                </div>

                                {/* Image */}
                                <div style={{
                                    flexShrink: 0,
                                    width: '160px',
                                    minHeight: '180px',
                                    background: 'var(--surface)',
                                    borderRadius: 'var(--radius)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '1.25rem',
                                }}>
                                    {product.product_image ? (
                                        <img
                                            src={product.product_image}
                                            alt={product.product_name}
                                            style={{ maxWidth: '100%', maxHeight: '140px', objectFit: 'contain' }}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <span style={{ fontSize: '3rem', color: 'var(--border)' }}>
                                            {product.product_name.charAt(0)}
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    {/* Name + Rating */}
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem', marginTop: '0.25rem' }}>
                                        <h2 style={{ fontSize: '1.375rem', fontWeight: 800, letterSpacing: '-0.03em', flex: 1 }}>
                                            {product.product_name}
                                        </h2>
                                        <div style={{
                                            flexShrink: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            background: '#fef9c3',
                                            color: '#854d0e',
                                            padding: '0.25rem 0.625rem',
                                            borderRadius: '8px',
                                            fontSize: '0.875rem',
                                            fontWeight: 700,
                                        }}>
                                            ⭐ {product.trustpilot_rating}
                                        </div>
                                    </div>

                                    <p style={{ color: 'var(--foreground-subtle)', fontSize: '0.8125rem', marginBottom: '0.875rem' }}>
                                        {product.trustpilot_reviews?.toLocaleString()} verified Trustpilot reviews
                                    </p>

                                    <p style={{ color: 'var(--foreground-muted)', marginBottom: '1.25rem', lineHeight: 1.7, fontSize: '0.9375rem' }}>
                                        {product.description}
                                    </p>

                                    {/* Benefits */}
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--foreground-subtle)', marginBottom: '0.625rem' }}>
                                            Key Benefits
                                        </p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {product.benefits.split(',').map((benefit: string, bIdx: number) => (
                                                <span key={bIdx} style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.3rem',
                                                    background: 'var(--surface)',
                                                    border: '1px solid var(--border)',
                                                    borderRadius: '8px',
                                                    padding: '0.25rem 0.625rem',
                                                    fontSize: '0.8125rem',
                                                    fontWeight: 500,
                                                    color: 'var(--foreground)',
                                                }}>
                                                    <span style={{ color: 'var(--success)' }}>✓</span>
                                                    {benefit.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <a
                                        href={product.affiliate_link}
                                        target="_blank"
                                        rel="nofollow"
                                        className="btn btn-primary"
                                        style={{ width: 'fit-content' }}
                                    >
                                        Check Price →
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', borderStyle: 'dashed' }}>
                            <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔄</p>
                            <p style={{ color: 'var(--foreground-muted)', marginBottom: '1.5rem' }}>
                                We're updating our database for this category. Check back soon!
                            </p>
                            <a href="/health-quiz" className="btn btn-secondary">Restart Quiz</a>
                        </div>
                    )}
                </div>

                {/* ── Comparison Table ── */}
                {hasProducts && products.length > 1 && (
                    <section className="animate-fade-in" style={{ marginBottom: '4rem', animationDelay: '0.4s' }}>
                        <h2 style={{ fontSize: '1.625rem', fontWeight: 800, marginBottom: '1.5rem', textAlign: 'center', letterSpacing: '-0.03em' }}>
                            Quick Comparison
                        </h2>
                        <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: 'var(--surface)' }}>
                                        {['Product', 'Rating', 'Best For', 'Link'].map((h, i) => (
                                            <th key={h} style={{
                                                padding: '1rem 1.25rem',
                                                textAlign: 'left',
                                                fontSize: '0.8125rem',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.06em',
                                                color: 'var(--foreground-subtle)',
                                                borderBottom: '1px solid var(--border)',
                                            }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((p: Product, i: number) => (
                                        <tr key={p.id} style={{ background: i % 2 === 0 ? 'var(--card-bg)' : 'var(--surface)' }}>
                                            <td style={{ padding: '1rem 1.25rem', fontWeight: 700, fontSize: '0.9375rem' }}>{p.product_name}</td>
                                            <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: '#92400e' }}>⭐ {p.trustpilot_rating}</td>
                                            <td style={{ padding: '1rem 1.25rem', fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>{p.benefits.split(',')[0]}</td>
                                            <td style={{ padding: '1rem 1.25rem' }}>
                                                <a href={p.affiliate_link} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem' }}>
                                                    View →
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {/* ── Action Buttons ── */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
                    <a href="/health-quiz" className="btn btn-secondary">
                        ↩ Redo Quiz
                    </a>
                    <a href="/health-quiz" className="btn btn-primary">
                        ✦ Choose for Me
                    </a>
                </div>

                {/* ── Disclaimer ── */}
                <div className="card animate-fade-in" style={{
                    background: 'var(--surface)',
                    padding: '1.25rem 1.5rem',
                    textAlign: 'center',
                    animationDelay: '0.5s',
                }}>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--foreground-subtle)', lineHeight: 1.7 }}>
                        <strong style={{ color: 'var(--foreground-muted)' }}>Medical Disclaimer:</strong>{' '}
                        This content is for informational purposes only and does not constitute medical advice.
                        Statements regarding these products have not been evaluated by the FDA.
                        Always consult a healthcare professional before starting any new supplement.
                    </p>
                </div>

            </div>
        </div>
    );
}
