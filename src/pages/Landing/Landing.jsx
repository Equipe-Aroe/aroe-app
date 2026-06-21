import HeroSection from './sections/HeroSection'
import IntelligenceSection from './sections/IntelligenceSection'
import HowItWorksSection from './sections/HowItWorksSection'
import CompareSection from './sections/CompareSection'
import PricingSection from './sections/PricingSection'
import FaqSection from './sections/FaqSection'
import ContactSection from './sections/ContactSection'

export default function Landing() {
    return (
        <main>
            <HeroSection />
            <HowItWorksSection />
            <IntelligenceSection />
            <CompareSection />
            <PricingSection />
            <ContactSection />
            <FaqSection />
        </main>
    )
}