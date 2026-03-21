import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  robots: { index: true, follow: true },
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
}
