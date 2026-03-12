import CtaSection from "../components/home/CtaSection";
import HeroSection from "../components/home/HeroSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import ServicesSection from "../components/home/ServicesSection";
import TestimonialsSection from "../components/home/TestimonialsSection";

const Home = () => {
    return (
        <div>
            <HeroSection />
            <HowItWorksSection />
            <ServicesSection />
            <TestimonialsSection />
            <CtaSection />
        </div>
    )
}
export default Home;