import GenerateContentForm from '@/components/forms/generate-content-form';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default function GeneratePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline leading-tight tracking-tighter">
              Generate Brand Content
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Fill out the form below to generate AI-optimised content for your brand.
            </p>
          </div>
          <GenerateContentForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
