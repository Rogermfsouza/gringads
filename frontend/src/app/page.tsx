import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import MarketsSection from '@/components/MarketsSection';
import BenefitsSection from '@/components/BenefitsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <MarketsSection />
      <BenefitsSection />
      <Footer />
    </div>
  );
}
