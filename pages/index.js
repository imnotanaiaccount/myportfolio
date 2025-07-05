import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Examples from '../components/Examples';
import Testimonials from '../components/Testimonials';
import WhyChooseMe from '../components/WhyChooseMe';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Services />
      <About />
      <Examples />
      <Testimonials />
      <WhyChooseMe />
      <Contact />
      <Footer />
    </Layout>
  );
} 