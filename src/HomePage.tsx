import React from 'react';
import Hero from './components/Hero';
import FloatingNav from './components/FloatingNav';
import Philosophy from './components/Philosophy';
import Services from './components/Services';
import Map from './components/Map';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FloatingNav />
      <Philosophy />
      {/* We can put Services and Map here too */}
      <div id="servicios" className="container mx-auto px-6 md:px-12 pb-24 pt-20">
        <Services />
      </div>
      <div id="map">
        <Map />
      </div>
    </>
  );
}