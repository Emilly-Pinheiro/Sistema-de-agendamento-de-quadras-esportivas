import LandingHeader from '../../components/landing/LandingHeader.jsx'
import HeroSection from '../../components/landing/HeroSection.jsx'
import BenefitsSection from '../../components/landing/BenefitsSection.jsx'
import WhyChooseUsSection from '../../components/landing/WhyChooseUsSection.jsx'
import CourtsSection from '../../components/landing/CourtsSection.jsx'
import LandingFooter from '../../components/landing/LandingFooter.jsx'
import './LandingPage.css'

export default function LandingPage() {
  return <div id="top" className="landing-page"><div className="landing-page__hero"><LandingHeader /><HeroSection /></div><main><BenefitsSection /><WhyChooseUsSection /><CourtsSection /></main><LandingFooter /></div>
}
