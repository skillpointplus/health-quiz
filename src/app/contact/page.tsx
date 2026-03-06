export default function ContactPage() {
    return (
        <div className="container py-20 max-w-3xl">
            <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
            <div className="card">
                <p className="mb-8 text-text-muted">
                    Have questions about our quiz or your recommendations? We'd love to hear from you.
                </p>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-2">Name</label>
                        <input type="text" className="w-full p-3 border border-card-border rounded-lg" placeholder="Your Name" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Email</label>
                        <input type="email" className="w-full p-3 border border-card-border rounded-lg" placeholder="your@email.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Message</label>
                        <textarea className="w-full p-3 border border-card-border rounded-lg h-32" placeholder="How can we help?"></textarea>
                    </div>
                    <button type="button" className="btn btn-primary w-full">Send Message</button>
                </form>
            </div>
        </div>
    );
}
