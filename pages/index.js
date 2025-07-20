import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import HowItWorks from '../components/Services';
import LeadExamples from '../components/Examples';
import SignupForm from '../components/SignupForm';
import Pricing from '../components/Pricing';
import LeadMagnetSection from '../components/LeadMagnetSection';
import About from '../components/About';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <HowItWorks />
      <LeadExamples />
      <SignupForm />
      <Pricing />
      <LeadMagnetSection />
      <About />
      <FAQ />
      <Footer />
    </Layout>
  );
} 