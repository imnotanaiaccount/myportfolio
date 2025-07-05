import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Examples from '../components/Examples';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Services />
      <Examples />
      <About />
      <Contact />
      <Footer />
    </Layout>
  );
} 