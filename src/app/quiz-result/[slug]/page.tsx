import { supabase, Product } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const parts = slug.split('-');
    const gender = parts[0];
    const goal = parts.slice(1).join(' ').replace(/-/g, ' ');

    return {
        title: `Your Personalized ${goal.charAt(0).toUpperCase() + goal.slice(1)} Recommendations`,
        description: `Personalized supplement recommendations for ${gender} focusing on ${goal}.`,
    };
}

export default async function ResultPage({ params }: Props) {
    const { slug } = await params;
    const parts = slug.split('-');
    const gender = parts[0] as 'male' | 'female';
    const categorySlug = parts.slice(1).join('-');

    // Fetch category info
    const { data: categoryData } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', categorySlug)
        .single();

    // Fetch products
    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('gender_target', gender)
        .eq('category', categoryData?.id)
        .order('trustpilot_rating', { ascending: false })
        .limit(3);

    // If no products found, we might want to show general unisex ones or handle error
    const hasProducts = products && products.length > 0;

    return (
        <div className="pb-20 pt-12">
            <div className="container max-w-5xl">
                <header className="mb-12 text-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4 animate-fade-in">
                        Your Personalized Supplement Recommendation
                    </h1>
                    <div className="card bg-blue-50 border-blue-100 py-4 px-6 inline-block animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        <p className="text-blue-800 font-semibold">
                            Identified Focus: <span className="capitalize">{categorySlug.replace(/-/g, ' ')}</span> for {gender}s
                        </p>
                    </div>
                    <p className="mt-6 text-text-muted max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        Based on your answers, our algorithm has identified {categorySlug.replace(/-/g, ' ')} as your primary health priority.
                        Below are the top-rated supplements tailored to your specific profile.
                    </p>
                </header>

                {/* Recommended Products */}
                <div className="space-y-12 mb-20">
                    {hasProducts ? (
                        products.map((product, idx) => (
                            <div key={product.id} className={`card flex flex-col md:flex-row gap-8 animate-fade-in relative overflow-hidden ${idx === 0 ? 'border-primary ring-1 ring-primary ring-opacity-10' : ''}`} style={{ animationDelay: `${0.3 + idx * 0.1}s` }}>
                                {idx === 0 && (
                                    <div className="absolute top-4 right-[-35px] bg-primary text-white text-xs font-bold py-1 px-10 rotate-45">
                                        MOST POPULAR
                                    </div>
                                )}

                                <div className="w-full md:w-1/3 bg-secondary rounded-lg flex items-center justify-center p-6 min-h-[250px]">
                                    {product.product_image ? (
                                        <img
                                            src={product.product_image}
                                            alt={product.product_name}
                                            className="max-w-full max-h-48 object-contain"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="text-4xl font-bold text-card-border">{product.product_name.charAt(0)}</div>
                                    )}
                                </div>

                                <div className="w-full md:w-2/3 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h2 className="text-2xl font-bold">{product.product_name}</h2>
                                            <div className="flex items-center gap-1 bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded">
                                                <span className="text-green-500">★</span> {product.trustpilot_rating}
                                            </div>
                                        </div>

                                        <p className="text-text-muted text-sm mb-4">
                                            {product.trustpilot_reviews.toLocaleString()} Trustpilot reviews
                                        </p>

                                        <p className="mb-6 text-lg">
                                            {product.description}
                                        </p>

                                        <div className="mb-6">
                                            <h3 className="font-bold text-sm uppercase tracking-wider text-text-muted mb-3">Key Benefits:</h3>
                                            <ul className="grid grid-2 gap-y-2 gap-x-4">
                                                {product.benefits.split(',').map((benefit: string, bIdx: number) => (
                                                    <li key={bIdx} className="flex items-center gap-2 text-sm">
                                                        <span className="text-green-500 font-bold">✓</span> {benefit.trim()}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <a
                                            href={product.affiliate_link}
                                            target="_blank"
                                            rel="nofollow"
                                            className="btn btn-primary flex-1"
                                        >
                                            Check Price
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="card text-center py-20 bg-secondary border-dashed">
                            <p className="text-text-muted text-lg mb-6">We're currently updating our database for this specific category.</p>
                            <a href="/health-quiz" className="btn btn-secondary">Restart Quiz</a>
                        </div>
                    )}
                </div>

                {/* Comparison Table */}
                {hasProducts && products.length > 1 && (
                    <section className="mb-20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                        <h2 className="text-2xl font-bold mb-8 text-center">Compare Your Options</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-secondary text-left">
                                        <th className="p-4 rounded-tl-lg">Product</th>
                                        <th className="p-4">Rating</th>
                                        <th className="p-4">Best For</th>
                                        <th className="p-4 rounded-tr-lg">Link</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-card-border">
                                    {products.map((p) => (
                                        <tr key={p.id}>
                                            <td className="p-4 font-bold">{p.product_name}</td>
                                            <td className="p-4 whitespace-nowrap">★ {p.trustpilot_rating}</td>
                                            <td className="p-4 text-sm">{p.benefits.split(',')[0]}</td>
                                            <td className="p-4">
                                                <a href={p.affiliate_link} className="text-blue-600 font-medium hover:underline">Check Price</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {/* Disclaimer */}
                <div className="card bg-gray-50 border-gray-200 p-6 text-sm text-text-muted text-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
                    <p>
                        <strong>Medical Disclaimer:</strong> This content is for informational purposes only and does not constitute medical advice.
                        The statements made regarding these products have not been evaluated by the Food and Drug Administration.
                        Always consult with a healthcare professional before starting any new supplement, especially if you have a medical condition.
                    </p>
                </div>
            </div>
        </div>
    );
}
