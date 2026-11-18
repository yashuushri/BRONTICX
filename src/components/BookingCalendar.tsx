/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar as CalendarIcon, Clock, CheckCircle2, ChevronLeft, ChevronRight, User, Mail, Youtube, ArrowRight } from "lucide-react";
import { AVAILABLE_TIMESLOTS } from "../data";

interface BookingCalendarProps {
  selectedPlan: string;
  onResetPlan: () => void;
}

export default function BookingCalendar({ selectedPlan, onResetPlan }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [channelName, setChannelName] = useState("");
  const [subs, setSubs] = useState("");
  const [chosenPlan, setChosenPlan] = useState("");
  const [message, setMessage] = useState("");

  const [currentStep, setCurrentStep] = useState<"datetime" | "form" | "success">("datetime");

  // Sync chosen plan
  useEffect(() => {
    if (selectedPlan) {
      const normalized =
        selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1).toLowerCase();
      setChosenPlan(normalized);
      if (currentStep === "success") {
        setCurrentStep("datetime");
        setSelectedDate(null);
        setSelectedTime(null);
      }
    }
  }, [selectedPlan]);

  // July 2026 parameter details
  const currentMonthYear = "July 2026";
  const daysInMonth = 31;
  const startOffsetDays = 2; // Wednesday start offset
  
  const isDayAvailable = (day: number) => {
    const dayOfWeek = (day + startOffsetDays - 1) % 7;
    return dayOfWeek !== 0 && dayOfWeek !== 6; // Mon-Fri only
  };

  const handleDateClick = (day: number) => {
    if (isDayAvailable(day)) {
      setSelectedDate(day);
      setSelectedTime(null);
    }
  };

  const handleNextStep = () => {
    if (selectedDate && selectedTime) {
      setCurrentStep("form");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name && email && channelName) {
      setCurrentStep("success");
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setChannelName("");
    setSubs("");
    setMessage("");
    setSelectedDate(null);
    setSelectedTime(null);
    onResetPlan();
    setCurrentStep("datetime");
  };

  return (
    <section id="booking" className="py-14 bg-black border-b border-zinc-900/45 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase block mb-2"
          >
            BOOKING
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight"
          >
            Your channel, one call away.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto font-normal leading-relaxed"
          >
            Book a free 30-min strategy session to optimize your retention & packaging live on Zoom.
          </motion.p>
        </div>

        {/* Calendar Box */}
        <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl min-h-[440px] flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            {currentStep === "datetime" && (
              <motion.div
                key="step-datetime"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="grid grid-cols-1 md:grid-cols-12 items-stretch divide-y md:divide-y-0 md:divide-x divide-zinc-900/80 text-left"
              >
                {/* Left: Day picker */}
                <div className="md:col-span-7 p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-sans font-bold text-white text-base">
                      Select Date
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-[10px] text-zinc-500 font-bold uppercase tracking-wider mr-2">
                        {currentMonthYear}
                      </span>
                      <button className="p-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 opacity-45 cursor-not-allowed">
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 opacity-45 cursor-not-allowed">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Day Titles */}
                  <div className="grid grid-cols-7 gap-2 font-mono text-[9px] uppercase font-bold text-zinc-600 mb-3 text-center">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>

                  {/* Days grid */}
                  <div className="grid grid-cols-7 gap-2 text-center text-xs sm:text-sm">
                    {Array.from({ length: startOffsetDays - 1 }).map((_, idx) => (
                      <div key={`offset-${idx}`} className="h-9 sm:h-11" />
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, idx) => {
                      const dayNum = idx + 1;
                      const available = isDayAvailable(dayNum);
                      const isSelected = selectedDate === dayNum;

                      return (
                        <button
                          key={`day-${dayNum}`}
                          onClick={() => handleDateClick(dayNum)}
                          disabled={!available}
                          className={`h-9 sm:h-11 rounded-full font-bold flex items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? "bg-white text-black font-black"
                              : available
                              ? "bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-900/60 text-zinc-300 hover:text-white"
                              : "text-zinc-800 pointer-events-none opacity-20"
                          }`}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Slot picker */}
                <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                  <div className="space-y-6">
                    <span className="font-sans font-bold text-white text-base block">
                      Select Time Slot
                    </span>

                    {selectedDate ? (
                      <div className="grid grid-cols-1 gap-2">
                        {AVAILABLE_TIMESLOTS.map((slot) => {
                          const isSelected = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? "bg-white text-black border-white font-extrabold"
                                  : "bg-zinc-900/40 border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-800"
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5" />
                                {slot}
                              </span>
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="h-44 flex flex-col items-center justify-center border border-dashed border-zinc-900 rounded-3xl text-zinc-500 text-center px-4">
                        <CalendarIcon className="w-8 h-8 text-zinc-800 mb-2" />
                        <p className="text-xs font-normal">
                          Select a date from the calendar to view available slots.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Proceed footer */}
                  <div className="pt-6 border-t border-zinc-900/80 mt-6 flex justify-between items-center">
                    <div className="flex flex-col text-left">
                      <span className="text-zinc-500 font-mono text-[9px] uppercase font-bold">SELECTED CALL</span>
                      <span className="font-sans text-xs text-zinc-300 font-bold">
                        {selectedDate ? `July ${selectedDate}, 2026` : "No Date Selected"}
                        {selectedTime ? ` at ${selectedTime.split(" ")[0]}` : ""}
                      </span>
                    </div>
                    <button
                      onClick={handleNextStep}
                      disabled={!selectedDate || !selectedTime}
                      className={`px-5 py-2.5 rounded-full font-sans font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                        selectedDate && selectedTime
                          ? "bg-white text-black hover:bg-zinc-200"
                          : "bg-zinc-900 text-zinc-600 border border-zinc-900 cursor-not-allowed"
                      }`}
                    >
                      Next Step
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Intake Form */}
            {currentStep === "form" && (
              <motion.div
                key="step-form"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="p-6 sm:p-8 text-left"
              >
                <div className="flex items-center justify-between pb-4 border-b border-zinc-900 mb-6">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold">
                      Step 2 of 2
                    </span>
                    <h3 className="font-sans font-bold text-lg text-white mt-1">
                      Intake Information
                    </h3>
                  </div>
                  <button
                    onClick={() => setCurrentStep("datetime")}
                    className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-zinc-300 cursor-pointer"
                  >
                    Change Time
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-400 font-bold uppercase tracking-wide flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-zinc-500" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-zinc-900/40 text-white border border-zinc-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-700"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-400 font-bold uppercase tracking-wide flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-zinc-500" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-zinc-900/40 text-white border border-zinc-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-700"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-400 font-bold uppercase tracking-wide flex items-center gap-1.5">
                        <Youtube className="w-3.5 h-3.5 text-zinc-500" />
                        YouTube Channel
                      </label>
                      <input
                        type="text"
                        required
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        className="w-full bg-zinc-900/40 text-white border border-zinc-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-700"
                        placeholder="e.g., TechChronicles"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-400 font-bold uppercase tracking-wide flex items-center gap-1.5">
                        Subscriber Count
                      </label>
                      <input
                        type="text"
                        value={subs}
                        onChange={(e) => setSubs(e.target.value)}
                        className="w-full bg-zinc-900/40 text-white border border-zinc-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-700"
                        placeholder="e.g., 150K / 5K"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-400 font-bold uppercase tracking-wide">
                        Interested Plan
                      </label>
                      <select
                        value={chosenPlan}
                        onChange={(e) => setChosenPlan(e.target.value)}
                        className="w-full bg-zinc-900/40 text-white border border-zinc-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-700"
                      >
                        <option value="">Just exploring / Strategy Consultation</option>
                        <option value="Starter">Starter ($1,499/mo)</option>
                        <option value="Growth">Growth ($2,999/mo)</option>
                        <option value="Partner">Partner ($4,999/mo)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-400 font-bold uppercase tracking-wide">
                        Biggest retention bottleneck?
                      </label>
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-zinc-900/40 text-white border border-zinc-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-700"
                        placeholder="e.g., intro drop-off"
                      />
                    </div>
                  </div>

                  {/* Form Submission Footer */}
                  <div className="pt-6 border-t border-zinc-900 mt-6 flex justify-between items-center font-mono text-xs">
                    <span className="text-zinc-500 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-zinc-600" />
                      30 Mins Strategy Session
                    </span>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full bg-white hover:bg-zinc-200 text-black font-sans font-bold flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 3: Booking Success */}
            {currentStep === "success" && (
              <motion.div
                key="step-success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="p-10 flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-14 h-14 rounded-full bg-white/5 border border-zinc-800 flex items-center justify-center text-white">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-sans font-bold text-xl sm:text-2xl text-white">
                    Strategy Call Booked!
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm max-w-lg leading-relaxed font-normal">
                    Hi, {name}! Your YouTube strategy and retention session is secured for{" "}
                    <span className="text-white font-bold">July {selectedDate}, 2026</span> at{" "}
                    <span className="text-white font-bold">{selectedTime}</span>.
                  </p>
                </div>

                <div className="bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 max-w-md w-full text-left divide-y divide-zinc-900/50 font-sans text-xs text-zinc-300 space-y-3.5">
                  <div className="flex justify-between items-center pb-3">
                    <span className="text-zinc-500 font-mono text-[9px] uppercase font-bold">Client Channel</span>
                    <span className="font-bold">{channelName}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 pb-3">
                    <span className="text-zinc-500 font-mono text-[9px] uppercase font-bold">Selected Plan</span>
                    <span className="font-bold text-white">
                      {chosenPlan ? chosenPlan : "General Discovery Call"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3">
                    <span className="text-zinc-500 font-mono text-[9px] uppercase font-bold">Host Operator</span>
                    <span className="font-bold text-white flex items-center gap-1.5">
                      Yash (BRONTICX Founder)
                    </span>
                  </div>
                </div>

                <div className="space-y-4 max-w-md">
                  <p className="text-[10px] text-zinc-500 leading-normal font-normal">
                    We've sent a Zoom meeting invitation to <span className="text-zinc-300 font-medium">{email}</span>. Please make sure to bring your latest video retention graph screenshots!
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-5 py-2 rounded-full border border-zinc-900 hover:border-zinc-800 text-xs font-bold text-zinc-400 hover:text-white transition-all cursor-pointer bg-zinc-950/40"
                  >
                    Back to Calendar
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
