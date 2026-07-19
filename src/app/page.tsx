'use client';

import Hero from '../components/home/Hero';
import Ecosystem from '../components/home/Ecosystem';
import About from '../components/home/About';
import Businesses from '../components/home/Businesses';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Services from '../components/home/Services';
import Brands from '../components/home/Brands';
import Gallery from '../components/home/Gallery';
import Statistics from '../components/home/Statistics';
import CustomerJourney from '../components/home/CustomerJourney';
import Testimonials from '../components/home/Testimonials';
import Locations from '../components/home/Locations';
import FAQ from '../components/home/FAQ';
import CTA from '../components/home/CTA';

export default function Home() {
  return (
    <div className="w-full bg-brand-bg text-text-dark">
      <Hero />
      <Ecosystem />
      <About />
      <Businesses />
      <WhyChooseUs />
      <Services />
      <Brands />
      <Gallery />
      <Statistics />
      <CustomerJourney />
      <Testimonials />
      <Locations />
      <FAQ />
      <CTA />
    </div>
  );
}
