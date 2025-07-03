import Layout from '../components/Layout';
import Hero from '../components/Hero';
import FeaturedProject from '../components/FeaturedProject';
import Services from '../components/Services';
import WhyChooseMe from '../components/WhyChooseMe';
import Examples from '../components/Examples';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <FeaturedProject />
      <Services />
      <WhyChooseMe />
      <Examples />
      <Contact />
      <Footer />
    </Layout>
  );
} 