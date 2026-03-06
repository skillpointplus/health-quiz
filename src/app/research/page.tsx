export default function ResearchPage() {
    return (
        <div className="container py-20 max-w-3xl">
            <h1 className="text-4xl font-bold mb-8">Clinical Research & References</h1>
            <div className="prose prose-lg text-text-muted">
                <p className="mb-6">
                    Our recommendation algorithm is built upon a foundation of established nutritional science.
                    Below are some of the key areas of research that inform our quiz logic.
                </p>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Micronutrients & Energy</h2>
                <p className="mb-6">
                    Studies have consistently shown that deficiencies in B-vitamins and Magnesium can
                    significantly impact ATP production and metabolic health. Our energy-focused recommendations
                    prioritize these essential cofactors.
                </p>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Hormonal Health</h2>
                <p className="mb-6">
                    We reference clinical trials regarding natural adaptogens (like Ashwagandha) and
                    mineral support (like Zinc) for their roles in supporting healthy endocrine function
                    in both men and women.
                </p>
            </div>
        </div>
    );
}
