import type { Metadata } from 'next';
import './globals.css';
import { PublicShell } from '@/components/PublicShell';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'World Bulletin | Fact-Checked Automated AI Journalism',
  description: 'Automated worldwide artificial intelligence news platform. Multi-source fact verification, automated claim extraction, and verified editorial standards.',
  keywords: ['AI News', 'Artificial Intelligence', 'Machine Learning', 'Fact Checked AI', 'Llama 3.3', 'Groq AI'],
  authors: [{ name: 'World Bulletin Team' }],
  alternates: {
    canonical: 'https://worldbulletin.world'
  },
  openGraph: {
    title: 'World Bulletin | Fact-Checked Automated AI Journalism',
    description: 'Automated worldwide artificial intelligence news platform.',
    type: 'website',
    url: 'https://worldbulletin.world',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-[#fafafa] antialiased">
        {/* Google Analytics (GTag) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NMM93CJ1ZQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NMM93CJ1ZQ');
          `}
        </Script>
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
