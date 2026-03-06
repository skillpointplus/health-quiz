import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
    title: 'Health Quiz - Personalized Supplement Recommendations',
    description: 'Take our short quiz to receive personalized health supplement recommendations based on your unique needs and goals.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable}`}>
                <header className="glass shadow-sm sticky top-0 z-50">
                    <nav className="container py-4 flex justify-between items-center">
                        <a href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                            Health Quiz
                        </a>
                        <div className="flex gap-6 font-medium">
                            <a href="/health-quiz" className="hover:text-blue-600 transition">Quiz</a>
                            <a href="/about" className="hover:text-blue-600 transition">About</a>
                            <a href="/research" className="hover:text-blue-600 transition">Research</a>
                        </div>
                    </nav>
                </header>
                <main>{children}</main>
                <footer className="bg-secondary mt-20 py-12">
                    <div className="container">
                        <div className="grid grid-2 md:grid-3 gap-12">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Health Quiz</h3>
                                <p className="text-text-muted max-w-sm">
                                    Empowering your health journey with science-backed, personalized supplement recommendations.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4">Quick Links</h4>
                                <ul className="flex flex-col gap-2 text-text-muted">
                                    <li><a href="/about" className="hover:text-blue-600">About Us</a></li>
                                    <li><a href="/editorial-policy" className="hover:text-blue-600">Editorial Policy</a></li>
                                    <li><a href="/research" className="hover:text-blue-600">Research</a></li>
                                    <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4">Legal</h4>
                                <ul className="flex flex-col gap-2 text-text-muted">
                                    <li><a href="/disclaimer" className="hover:text-blue-600">Disclaimer</a></li>
                                    <li><a href="/privacy" className="hover:text-blue-600">Privacy Policy</a></li>
                                    <li><a href="/terms" className="hover:text-blue-600">Terms of Service</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-12 pt-8 border-t border-card-border text-center text-text-muted text-sm">
                            <p>© {new Date().getFullYear()} Health Quiz. All rights reserved.</p>
                            <p className="mt-4 max-w-2xl mx-auto">
                                Disclaimer: This content is for informational purposes only and does not constitute medical advice.
                                Always consult with a healthcare professional before starting any supplement regimen.
                            </p>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    );
}
