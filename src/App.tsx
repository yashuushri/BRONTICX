/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Services from "./components/Services";
import RetentionSimulator from "./components/RetentionSimulator";
import Testimonials from "./components/CtrTester";
import Portfolio from "./components/Portfolio";
import Process from "./components/Process";
import Pricing from "./components/Pricing";
import BookingCalendar from "./components/BookingCalendar";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import ErrorBoundary from "./components/ErrorBoundary";
import LazyLoad from "./components/LazyLoad";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedPlan, setSelectedPlan] = useState("");

  // Smooth scroll callback for Navigation links
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset slightly for navbar height
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(sectionId);
    }
  };

  // Click pricing card CTA callback
  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    // Smooth scroll down to booking block
    handleNavigate("booking");
  };

  // Reset booking selected plan parameter
  const handleResetPlan = () => {
    setSelectedPlan("");
  };

  // IntersectionObserver to sync active section based on scroll heights
  useEffect(() => {
    const sections = ["hero", "real-problem", "services", "simulator", "work", "testimonials", "process", "pricing", "booking", "faq"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180; // offset buffer
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="applet-viewport" className="min-h-screen bg-[#030303] text-zinc-100 selection:bg-white/20 selection:text-white">
      
      {/* Navigation overlay */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Blocks */}
      <main id="main-content">
        <ErrorBoundary fallbackTitle="Hero Showcase">
          <Hero onNavigate={handleNavigate} />
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="Statistics Matrix">
          <Stats />
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="Services">
          <Services />
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="Retention Engine">
          <LazyLoad placeholderHeight="400px">
            <RetentionSimulator />
          </LazyLoad>
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="Creator Portfolio Showcase">
          <LazyLoad placeholderHeight="500px">
            <Portfolio />
          </LazyLoad>
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="CTR & Thumbnail Lab">
          <LazyLoad placeholderHeight="450px">
            <Testimonials />
          </LazyLoad>
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="Workflow Blueprint">
          <Process />
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="Pricing Packages">
          <Pricing onSelectPlan={handleSelectPlan} />
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="Strategic Sync Booking">
          <LazyLoad placeholderHeight="600px">
            <BookingCalendar selectedPlan={selectedPlan} onResetPlan={handleResetPlan} />
          </LazyLoad>
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="Frequently Asked Questions">
          <Faq />
        </ErrorBoundary>
      </main>

      {/* Footer bar */}
      <Footer onNavigate={handleNavigate} />

      {/* Control panel overlay */}
      <AdminPanel />

    </div>
  );
}

