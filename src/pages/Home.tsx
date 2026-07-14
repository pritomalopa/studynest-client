import Hero from "../components/sections/Hero";
import FeaturedResources from "../components/sections/FeaturedResources";
import CategoriesSection from "../components/sections/CategoriesSection";
import HowItWorks from "../components/sections/HowItWorks";
import StudyGroupsSpotlight from "../components/sections/StudyGroupsSpotlight";
import TopTutors from "../components/sections/TopTutors";
import StatsSection from "../components/sections/StatsSection";
import Testimonials from "../components/sections/Testimonials";
import FAQSection from "../components/sections/FAQSection";
import NewsletterCTA from "../components/sections/NewsletterCTA";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedResources />
      <CategoriesSection />
      <HowItWorks />
      <StudyGroupsSpotlight />
      <TopTutors />
      <StatsSection />
      <Testimonials />
      <FAQSection />
      <NewsletterCTA />
    </div>
  );
};

export default Home;
