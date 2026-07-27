import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Worldwide AI News | Fact-Checked Automated AI Journalism',
  description: 'Automated worldwide artificial intelligence news platform. Multi-source fact verification, automated claim extraction, and verified editorial standards.',
  keywords: ['AI News', 'Artificial Intelligence', 'Machine Learning', 'Fact Checked AI', 'Llama 3.3', 'Groq AI'],
  authors: [{ name: 'Worldwide AI News Team' }],
  openGraph: {
    title: 'Worldwide AI News | Fact-Checked Automated AI Journalism',
    description: 'Automated worldwide artificial intelligence news platform.',
    type: 'website',
    url: 'https://ainews-automation.org',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-slate-50">
      <body className="h-full bg-slate-50 text-slate-900 flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 bg-slate-50">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
