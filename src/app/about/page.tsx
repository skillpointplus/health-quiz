export default function AboutPage() {
    return (
        <div className="container py-20 max-w-3xl">
            <h1 className="text-4xl font-bold mb-8">About Health Quiz</h1>
            <div className="prose prose-lg text-text-muted">
                <p className="mb-6">
                    Health Quiz was founded with a simple mission: to take the guesswork out of nutritional supplementation.
                    We believe that every body is unique, and that path to optimal health should be personalized,
                    science-backed, and easy to navigate.
                </p>
                <p className="mb-6">
                    Our team of nutrition enthusiasts and data scientists worked together to develop a scoring
                    algorithm that matches individual health markers and goals with the supplement categories
                    most likely to provide a meaningful benefit.
                </p>
                <p>
                    We are committed to transparency, quality, and your long-term wellness.
                </p>
            </div>
        </div>
    );
}
