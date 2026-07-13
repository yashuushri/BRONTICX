/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Calendar, 
  Video, 
  Mail, 
  Trash2, 
  X, 
  ExternalLink, 
  Database, 
  Sparkles, 
  CheckCircle,
  Clock,
  ArrowRight
} from "lucide-react";

export default function AdminPanel() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"bookings" | "reviews" | "emails">("bookings");
  
  // Security prompt states
  const [showPasscodePrompt, setShowPasscodePrompt] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");

  // Lists retrieved from localStorage
  const [bookings, setBookings] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [emails, setEmails] = useState<any[]>([]);

  // Periodically load data from localStorage or listen to event
  const loadAllData = () => {
    try {
      const storedBookings = localStorage.getItem("bronticx_bookings");
      const storedReviews = localStorage.getItem("bronticx_reviews");
      const storedEmails = localStorage.getItem("bronticx_direct_emails");

      setBookings(storedBookings ? JSON.parse(storedBookings) : []);
      setReviews(storedReviews ? JSON.parse(storedReviews) : []);
      setEmails(storedEmails ? JSON.parse(storedEmails) : []);

      // Check if admin is enabled
      const adminEnabled = localStorage.getItem("show_admin_panel") === "true";
      setIsVisible(adminEnabled);
    } catch (e) {
      console.error("Error reading localStorage", e);
    }
  };

  useEffect(() => {
    loadAllData();

    // Listen to custom event for dynamic update when email is typed
    const handleAdminEnable = () => {
      setIsVisible(true);
      // Automatically open it to show the admin what happened
      setIsOpen(true);
    };

    const handlePasswordPrompt = () => {
      setShowPasscodePrompt(true);
      setPasscode("");
      setPasscodeError("");
    };

    window.addEventListener("admin_enabled", handleAdminEnable);
    window.addEventListener("trigger_admin_password_prompt", handlePasswordPrompt);
    
    // Check every second to make sure we sync up instantly
    const interval = setInterval(loadAllData, 1000);

    return () => {
      window.removeEventListener("admin_enabled", handleAdminEnable);
      window.removeEventListener("trigger_admin_password_prompt", handlePasswordPrompt);
      clearInterval(interval);
    };
  }, []);

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "9932") {
      localStorage.setItem("show_admin_panel", "true");
      setIsVisible(true);
      setIsOpen(true);
      setShowPasscodePrompt(false);
      setPasscode("");
      setPasscodeError("");
    } else {
      setPasscodeError("Invalid Access Pin");
    }
  };

  // Seed sample leads for demonstrative purposes
  const handleSeedData = () => {
    const sampleBookings = [
      {
        id: "b-1",
        name: "Ali-A",
        email: "alia@example.com",
        channelName: "Ali-A",
        subs: "18.5M",
        chosenPlan: "Partner",
        message: "Intro retention drop-off in our Fortnite videos",
        date: "July 18, 2026",
        time: "11:00 AM (EST)",
        createdAt: new Date(Date.now() - 3600000 * 2).toLocaleString()
      },
      {
        id: "b-2",
        name: "Lachlan",
        email: "lachlan@example.com",
        channelName: "Lachlan Play",
        subs: "14.8M",
        chosenPlan: "Growth",
        message: "Need better pacing in the middle of challenges",
        date: "July 20, 2026",
        time: "2:30 PM (EST)",
        createdAt: new Date(Date.now() - 3600000 * 24).toLocaleString()
      }
    ];

    const sampleReviews = [
      {
        id: "r-1",
        name: "SypherPK",
        email: "sypher@example.com",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        bottleneck: "intro",
        niche: "Fortnite News & Gameplay",
        createdAt: new Date(Date.now() - 3600000 * 5).toLocaleString()
      },
      {
        id: "r-2",
        name: "PrestonPlayz",
        email: "preston@example.com",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        bottleneck: "story",
        niche: "Minecraft Challenge",
        createdAt: new Date(Date.now() - 3600000 * 12).toLocaleString()
      }
    ];

    const sampleEmails = [
      {
        id: "e-1",
        email: "mrbeast@mrbeast.com",
        subject: "Collaboration query from Beast Philanthropy",
        description: "Hey Yash, saw your CTR and retention stats. We are looking to scale our secondary channel edits. Do you have slots open next month for a partner tier style partnership?",
        attachmentsCount: 1,
        createdAt: new Date(Date.now() - 3600000 * 1).toLocaleString()
      },
      {
        id: "e-2",
        email: "nickmercs@mfam.com",
        subject: "Editing packages",
        description: "Looking for daily stream highlights. Need high retention, quick-cut pacing, and standard custom gaming thumbnails. Send pricing detail sheet.",
        attachmentsCount: 0,
        createdAt: new Date(Date.now() - 3600000 * 18).toLocaleString()
      }
    ];

    localStorage.setItem("bronticx_bookings", JSON.stringify(sampleBookings));
    localStorage.setItem("bronticx_reviews", JSON.stringify(sampleReviews));
    localStorage.setItem("bronticx_direct_emails", JSON.stringify(sampleEmails));
    
    loadAllData();
  };

  const handleClearData = () => {
    localStorage.removeItem("bronticx_bookings");
    localStorage.removeItem("bronticx_reviews");
    localStorage.removeItem("bronticx_direct_emails");
    loadAllData();
  };

  const handleDeleteItem = (tab: "bookings" | "reviews" | "emails", id: string) => {
    try {
      if (tab === "bookings") {
        const updated = bookings.filter(item => item.id !== id);
        localStorage.setItem("bronticx_bookings", JSON.stringify(updated));
        setBookings(updated);
      } else if (tab === "reviews") {
        const updated = reviews.filter(item => item.id !== id);
        localStorage.setItem("bronticx_reviews", JSON.stringify(updated));
        setReviews(updated);
      } else if (tab === "emails") {
        const updated = emails.filter(item => item.id !== id);
        localStorage.setItem("bronticx_direct_emails", JSON.stringify(updated));
        setEmails(updated);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!isVisible && !showPasscodePrompt) return null;

  return (
    <>
      {/* FLOATING ADMIN CIRCLE BUTTON */}
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group w-12 h-12 rounded-full bg-white text-black border border-white hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center shadow-2xl cursor-pointer"
          title="Open Admin Lead Board"
        >
          {isOpen ? (
            <X className="w-5 h-5 transition-transform duration-300 rotate-90" />
          ) : (
            <div className="relative">
              <Shield className="w-5 h-5 animate-pulse" />
              {/* Notification Badge if items exist */}
              {(bookings.length + reviews.length + emails.length) > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full border border-black flex items-center justify-center text-[7px] font-black text-white">
                  {bookings.length + reviews.length + emails.length}
                </span>
              )}
            </div>
          )}
          {/* Tooltip */}
          <span className="absolute right-14 bg-zinc-950 border border-zinc-900 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            BRONTICX Admin Panel
          </span>
        </button>
      </motion.div>

      {/* ADMIN PANEL DRAWER OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-end sm:p-6 pointer-events-none">
            {/* Clickable backdrop overlay (only on mobile) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs pointer-events-auto sm:hidden"
            />

            {/* Main Board Window */}
            <motion.div
              initial={{ x: 100, opacity: 0, scale: 0.98 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 100, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full sm:max-w-md h-[90vh] sm:h-[80vh] bg-[#0c0c0c] border border-zinc-900 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto mr-0 sm:mr-16 z-50"
            >
              {/* Top title and diagnostic details */}
              <div className="px-5 py-4 bg-zinc-950 border-b border-zinc-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-[11px] font-bold tracking-tight text-zinc-300">
                    Admin Board
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    id="admin-seed-btn"
                    onClick={handleSeedData}
                    className="flex items-center gap-1 text-[9px] font-bold text-zinc-400 hover:text-white bg-zinc-900 px-2 py-1 rounded border border-zinc-800 transition-colors cursor-pointer"
                    title="Seed submissions for testing"
                  >
                    <Database className="w-3 h-3" />
                    SEED
                  </button>
                  <button
                    id="admin-clear-btn"
                    onClick={handleClearData}
                    className="flex items-center gap-1 text-[9px] font-bold text-zinc-500 hover:text-red-400 bg-zinc-900 px-2 py-1 rounded border border-zinc-800 transition-colors cursor-pointer"
                    title="Clear all data"
                  >
                    <Trash2 className="w-3 h-3" />
                    CLEAR
                  </button>
                </div>
              </div>

              {/* Status Header */}
              <div className="p-4 bg-zinc-900/10 border-b border-zinc-950/60 flex items-center justify-between">
                <div className="flex flex-col text-left">
                  <h3 className="text-white font-sans font-bold text-xs tracking-tight">Active Inquiries</h3>
                  <p className="text-zinc-500 text-[9px] mt-0.5">Stored locally in your browser cache</p>
                </div>
                <span className="font-mono text-[9px] bg-zinc-900 px-2.5 py-0.5 border border-zinc-850 rounded-full text-zinc-400 font-bold">
                  {bookings.length + reviews.length + emails.length} Items
                </span>
              </div>

              {/* Tab navigation list */}
              <div className="grid grid-cols-3 border-b border-zinc-900 select-none">
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`py-3 text-[10px] font-bold tracking-wider uppercase flex flex-col items-center gap-1 transition-all border-b-2 cursor-pointer ${
                    activeTab === "bookings" 
                      ? "text-white bg-zinc-900/10 border-white" 
                      : "text-zinc-500 border-transparent hover:text-zinc-300"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Bookings
                  </span>
                  <span className="text-[9px] opacity-70">({bookings.length})</span>
                </button>
                
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`py-3 text-[10px] font-bold tracking-wider uppercase flex flex-col items-center gap-1 transition-all border-b-2 cursor-pointer ${
                    activeTab === "reviews" 
                      ? "text-white bg-zinc-900/10 border-white" 
                      : "text-zinc-500 border-transparent hover:text-zinc-300"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    Reviews
                  </span>
                  <span className="text-[9px] opacity-70">({reviews.length})</span>
                </button>
                
                <button
                  onClick={() => setActiveTab("emails")}
                  className={`py-3 text-[10px] font-bold tracking-wider uppercase flex flex-col items-center gap-1 transition-all border-b-2 cursor-pointer ${
                    activeTab === "emails" 
                      ? "text-white bg-zinc-900/10 border-white" 
                      : "text-zinc-500 border-transparent hover:text-zinc-300"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    Emails
                  </span>
                  <span className="text-[9px] opacity-70">({emails.length})</span>
                </button>
              </div>

              {/* Content List Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black/40">
                {activeTab === "bookings" && (
                  bookings.length === 0 ? (
                    <EmptyState tabName="bookings" icon={<Calendar className="w-8 h-8 text-zinc-800" />} />
                  ) : (
                    bookings.map((b) => (
                      <div 
                        key={b.id} 
                        className="p-3.5 rounded-xl bg-[#090909]/90 border border-zinc-900 text-left relative group hover:border-zinc-800 transition-all duration-200"
                      >
                        <button 
                          onClick={() => handleDeleteItem("bookings", b.id)}
                          className="absolute right-3 top-3 text-zinc-600 hover:text-red-400 p-1.5 rounded hover:bg-zinc-950 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="pr-6 space-y-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-white font-extrabold text-xs">{b.name}</span>
                            <span className="text-zinc-600 text-[10px]">•</span>
                            <span className="text-zinc-400 font-mono text-[10px]">{b.channelName}</span>
                          </div>
                          
                          <div className="flex flex-col gap-1 text-[11px] text-zinc-300 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-900/60">
                            <div className="flex items-center gap-1.5 text-white font-semibold">
                              <Clock className="w-3 h-3 text-zinc-500" />
                              <span>{b.date} at {b.time}</span>
                            </div>
                            {b.chosenPlan && (
                              <div className="text-zinc-400 text-[10px] font-bold mt-0.5">
                                Plan Option: <span className="text-white bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">{b.chosenPlan}</span>
                              </div>
                            )}
                          </div>

                          {b.message && (
                            <p className="text-[11px] text-zinc-400 leading-relaxed font-normal bg-zinc-950/20 p-2 rounded border border-zinc-900/30">
                              <span className="text-zinc-500 font-semibold block text-[10px]">Bottleneck:</span>
                              {b.message}
                            </p>
                          )}

                          <div className="flex items-center justify-between text-[10px] text-zinc-600 font-mono">
                            <span>Email: {b.email}</span>
                            <span>{b.createdAt || "Active now"}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )
                )}

                {activeTab === "reviews" && (
                  reviews.length === 0 ? (
                    <EmptyState tabName="reviews" icon={<Video className="w-8 h-8 text-zinc-800" />} />
                  ) : (
                    reviews.map((r) => (
                      <div 
                        key={r.id} 
                        className="p-3.5 rounded-xl bg-[#090909]/90 border border-zinc-900 text-left relative group hover:border-zinc-800 transition-all duration-200"
                      >
                        <button 
                          onClick={() => handleDeleteItem("reviews", r.id)}
                          className="absolute right-3 top-3 text-zinc-600 hover:text-red-400 p-1.5 rounded hover:bg-zinc-950 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="pr-6 space-y-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-white font-extrabold text-xs">{r.name}</span>
                            <span className="text-zinc-600 text-[10px]">•</span>
                            <span className="text-zinc-400 font-mono text-[10px]">{r.niche || "General"}</span>
                          </div>
                          
                          <a 
                            href={r.videoUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 rounded-lg p-2 pr-3 w-full justify-between transition-colors cursor-pointer"
                          >
                            <span className="truncate max-w-[240px] text-zinc-300 font-medium">{r.videoUrl}</span>
                            <ExternalLink className="w-3 h-3 text-zinc-500 shrink-0" />
                          </a>

                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div className="p-1.5 rounded bg-zinc-950 border border-zinc-900">
                              <span className="text-zinc-600 font-bold block uppercase tracking-wider text-[8px]">Bottleneck</span>
                              <span className="text-zinc-350 font-semibold uppercase">{r.bottleneck}</span>
                            </div>
                            <div className="p-1.5 rounded bg-zinc-950 border border-zinc-900">
                              <span className="text-zinc-600 font-bold block uppercase tracking-wider text-[8px]">Niche</span>
                              <span className="text-zinc-350 font-semibold truncate block">{r.niche || "Not specified"}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-zinc-600 font-mono">
                            <span>Email: {r.email}</span>
                            <span>{r.createdAt || "Active now"}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )
                )}

                {activeTab === "emails" && (
                  emails.length === 0 ? (
                    <EmptyState tabName="emails" icon={<Mail className="w-8 h-8 text-zinc-800" />} />
                  ) : (
                    emails.map((e) => (
                      <div 
                        key={e.id} 
                        className="p-3.5 rounded-xl bg-[#090909]/90 border border-zinc-900 text-left relative group hover:border-zinc-800 transition-all duration-200"
                      >
                        <button 
                          onClick={() => handleDeleteItem("emails", e.id)}
                          className="absolute right-3 top-3 text-zinc-600 hover:text-red-400 p-1.5 rounded hover:bg-zinc-950 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="pr-6 space-y-2">
                          <div className="flex flex-col text-left">
                            <span className="text-white font-extrabold text-xs truncate max-w-[280px]">{e.subject}</span>
                            <span className="text-zinc-500 text-[10px] font-mono mt-0.5">From: {e.email}</span>
                          </div>

                          <p className="text-[11px] text-zinc-300 leading-relaxed font-normal bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-900/60 whitespace-pre-line max-h-[140px] overflow-y-auto">
                            {e.description}
                          </p>

                          {e.attachmentsCount > 0 && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-white bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded">
                              ✓ {e.attachmentsCount} Image {e.attachmentsCount > 1 ? "attachments" : "attachment"}
                            </span>
                          )}

                          <div className="flex justify-end text-[10px] text-zinc-600 font-mono">
                            <span>{e.createdAt || "Just sent"}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )
                )}
              </div>

              {/* Status footer inside panel */}
              <div className="p-4 bg-zinc-950 border-t border-zinc-900 text-center font-mono text-[9px] text-zinc-650 flex justify-between items-center select-none">
                <span>CLIENT-SIDE ENGINE ONLY</span>
                <span>VERCEL / GITHUB PREPARED</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SECURITY PIN POPUP MODAL */}
      <AnimatePresence>
        {showPasscodePrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPasscodePrompt(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xs pointer-events-auto"
            />

            {/* Premium security card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.35 }}
              className="relative w-full max-w-sm bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-6 shadow-2xl text-left pointer-events-auto z-50 overflow-hidden"
            >
              {/* Outer ambient glow effect */}
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-zinc-800/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-850 flex items-center justify-center text-white">
                    <Shield className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white tracking-tight">Admin Authentication</h4>
                    <p className="text-zinc-550 text-[9px] uppercase font-mono tracking-wider mt-0.5">Control Access Terminal</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPasscodePrompt(false)}
                  className="text-zinc-600 hover:text-white p-1 rounded-md hover:bg-zinc-950 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handlePasscodeSubmit} className="space-y-3.5 mt-2">
                <div className="space-y-1.5 text-left">
                  <label className="text-zinc-550 text-[10px] font-bold uppercase tracking-wider block">
                    Enter Security Passcode
                  </label>
                  <input
                    type="password"
                    maxLength={10}
                    required
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      if (passcodeError) setPasscodeError("");
                    }}
                    placeholder="••••"
                    className="w-full bg-[#111] border border-zinc-900 rounded-xl px-4 py-3 text-sm text-center font-mono tracking-[0.25em] text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-700 transition-colors"
                    autoFocus
                  />
                  {passcodeError && (
                    <span className="text-red-500 text-[10px] font-semibold block mt-1">
                      ⚠️ {passcodeError}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-white text-black font-sans font-bold text-xs tracking-tight hover:bg-zinc-200 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1"
                >
                  Unlock Terminal
                  <ArrowRight className="w-3 h-3" />
                </button>
              </form>

              <p className="text-center text-zinc-600 text-[9px] font-mono mt-4 leading-normal">
                SECURE ACCESS TERMINAL
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function EmptyState({ tabName, icon }: { tabName: string; icon: React.ReactNode }) {
  return (
    <div className="py-16 text-center flex flex-col items-center justify-center border border-dashed border-zinc-900/80 rounded-2xl p-4">
      <div className="mb-3">{icon}</div>
      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">No {tabName} yet</h4>
      <p className="text-[11px] text-zinc-600 max-w-[220px] mx-auto mt-1 leading-normal">
        Submissions will appear here in real-time as users engage on the frontend.
      </p>
    </div>
  );
}
