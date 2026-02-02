// src/pages/LandingPage.tsx
import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CallToActionSection from "../components/CallToActionSection";
import FlowSection from "../components/FlowSection";
import ValuePropsSection from "../components/ValuePropsSection";
import SiteFooter from "../components/SiteFooter";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <CallToActionSection />
        <FlowSection />
        <ValuePropsSection />
      </main>

      <SiteFooter />
    </div>
  );
};

export default LandingPage;

