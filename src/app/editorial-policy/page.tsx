export default function EditorialPolicyPage() {
    return (
        <div className="container py-20 max-w-3xl">
            <h1 className="text-4xl font-bold mb-8">Editorial Policy</h1>
            <div className="prose prose-lg text-text-muted">
                <p className="mb-6">
                    At Health Quiz, we are dedicated to providing accurate, reliable, and unbiased nutritional information.
                    Our content and recommendations are subject to a rigorous editorial process.
                </p>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Evidence-Based Recommendations</h2>
                <p className="mb-6">
                    Our recommendations are based on the latest nutritional research and clinical guidelines.
                    We prioritize ingredients that have been shown to be effective in peer-reviewed studies.
                </p>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Independence & Transparency</h2>
                <p className="mb-6">
                    While we may receive commission from affiliate links, this does not influence our
                    scoring algorithm or the ranking of products. We only recommend products that meet
                    our quality standards and have high user trust ratings.
                </p>
            </div>
        </div>
    );
}
