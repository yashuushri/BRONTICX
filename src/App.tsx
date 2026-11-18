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
import ErrorBoundary from "./components/ErrorBoundary";
import LegalPage from "./components/LegalPage";
import SmoothScroll from "./components/SmoothScroll";

type ActivePage = "home" | "privacy" | "terms";

function getInitialPage(): ActivePage {
  if (typeof window === "undefined") return "home";
  const hash = window.location.hash.replace(/^#\/?/, "").toLowerCase();
  if (hash === "privacy" || hash === "privacy-policy") return "privacy";
  if (hash === "terms" || hash === "terms-of-service") return "terms";
  return "home";
}

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>(getInitialPage);
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedPlan, setSelectedPlan] = useState("");

  // Sync browser back/forward navigation with hash routes and clear any legacy admin cache
  useEffect(() => {
    try {
      localStorage.removeItem("show_admin_panel");
      localStorage.removeItem("bronticx_bookings");
      localStorage.removeItem("bronticx_reviews");
      localStorage.removeItem("bronticx_direct_emails");
    } catch {
      // Ignore storage access errors
    }

    const handleHashChange = () => {
      setActivePage(getInitialPage());
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const scrollToSectionElement = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth"
      });
      setActiveSection(sectionId);
    }
  };

  // Smooth scroll callback for Navigation links
  const handleNavigate = (sectionId: string) => {
    if (activePage !== "home") {
      window.history.pushState(null, "", window.location.pathname + window.location.search);
      setActivePage("home");
      setTimeout(() => {
        if (sectionId === "hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setActiveSection("hero");
        } else {
          scrollToSectionElement(sectionId);
        }
      }, 60);
      return;
    }

    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("hero");
      return;
    }

    scrollToSectionElement(sectionId);
  };

  // Open Privacy Policy or Terms of Service dedicated page
  const handleOpenLegal = (page: "privacy" | "terms") => {
    const targetHash = page === "privacy" ? "#privacy" : "#terms";
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, "", targetHash);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const handleBackHome = () => {
    window.history.pushState(null, "", window.location.pathname + window.location.search);
    setActivePage("home");
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  // Click pricing card CTA callback
  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    handleNavigate("booking");
  };

  // Reset booking selected plan parameter
  const handleResetPlan = () => {
    setSelectedPlan("");
  };

  // Sync active section based on scroll heights when on home page (RAF-throttled)
  useEffect(() => {
    if (activePage !== "home") return;
    const sections = ["hero", "real-problem", "services", "simulator", "work", "testimonials", "process", "pricing", "booking", "faq"];
    let rafId: number | null = null;

    const updateSection = () => {
      rafId = null;
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection((prev) => (prev === sectionId ? prev : sectionId));
            break;
          }
        }
      }
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [activePage]);

  return (
    <div id="applet-viewport" className="min-h-screen bg-[#030303] text-zinc-100 selection:bg-white/20 selection:text-white flex flex-col justify-between">
      <SmoothScroll />
      
      {/* Navigation overlay */}
      <Navbar onNavigate={handleNavigate} activeSection={activePage === "home" ? activeSection : ""} />

      {activePage === "home" ? (
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
            <RetentionSimulator />
          </ErrorBoundary>

          <ErrorBoundary fallbackTitle="Creator Portfolio Showcase">
            <Portfolio />
          </ErrorBoundary>

          <ErrorBoundary fallbackTitle="CTR & Thumbnail Lab">
            <Testimonials onNavigate={handleNavigate} />
          </ErrorBoundary>

          <ErrorBoundary fallbackTitle="Workflow Blueprint">
            <Process />
          </ErrorBoundary>

          <ErrorBoundary fallbackTitle="Pricing Packages">
            <Pricing onSelectPlan={handleSelectPlan} />
          </ErrorBoundary>

          <ErrorBoundary fallbackTitle="Strategic Sync Booking">
            <BookingCalendar selectedPlan={selectedPlan} onResetPlan={handleResetPlan} />
          </ErrorBoundary>

          <ErrorBoundary fallbackTitle="Frequently Asked Questions">
            <Faq />
          </ErrorBoundary>
        </main>
      ) : (
        <main id="main-content">
          <ErrorBoundary fallbackTitle="Legal Documentation">
            <LegalPage
              page={activePage}
              onBackHome={handleBackHome}
            />
          </ErrorBoundary>
        </main>
      )}

      {/* Footer bar */}
      <Footer onNavigate={handleNavigate} onOpenLegal={handleOpenLegal} />

    </div>
  );
}

