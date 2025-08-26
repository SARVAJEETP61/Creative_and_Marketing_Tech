import Header from '@/components/layout/header';
import HeroSection from '@/components/sections/hero';
import WhatWeDoSection from '@/components/sections/what-we-do';
import UseCasePreview from '@/components/sections/use-case-preview';
import WhyAIForMarketingSection from '@/components/sections/why-ai-for-marketing';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <WhatWeDoSection />
        <UseCasePreview />
        <WhyAIForMarketingSection />
      </main>
      <Footer />
    </div>
  );
}
