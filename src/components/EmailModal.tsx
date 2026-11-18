/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Send, 
  Paperclip, 
  ArrowLeft, 
  CheckCircle2, 
  Image as ImageIcon, 
  Trash2, 
  Bold, 
  Italic, 
  List, 
  Link2, 
  Smile, 
  Sparkles
} from "lucide-react";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AttachedImage {
  id: string;
  name: string;
  size: string;
  url: string;
}

export default function EmailModal({ isOpen, onClose }: EmailModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<AttachedImage[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validate Email
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setEmailError("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setStep(2);
  };

  // Handle file uploads
  const processFiles = (files: FileList) => {
    const validImages = Array.from(files).filter(file => file.type.startsWith("image/"));
    
    if (validImages.length === 0) return;

    const newAttachments: AttachedImage[] = validImages.map(file => {
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${(file.size / 1024).toFixed(0)} KB`;
      return {
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: sizeStr,
        url: URL.createObjectURL(file)
      };
    });

    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => {
      const target = prev.find(item => item.id === id);
      if (target) {
        URL.revokeObjectURL(target.url);
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate sending email beautifully
    setTimeout(() => {
      setIsSending(false);
      setStep(3);
    }, 1500);
  };

  const resetComposer = () => {
    setStep(1);
    setEmail("");
    setSubject("");
    setDescription("");
    // Revoke old object URLs to avoid memory leaks
    attachments.forEach(item => URL.revokeObjectURL(item.url));
    setAttachments([]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          {/* Blur background overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetComposer}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Drag Overlay indicator */}
          <AnimatePresence>
            {isDragActive && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-4 z-10 border-2 border-dashed border-zinc-700 bg-black/90 rounded-2xl flex flex-col items-center justify-center pointer-events-none"
              >
                <ImageIcon className="w-12 h-12 text-white mb-2 animate-bounce" />
                <p className="text-white text-sm font-bold tracking-tight">Drop your images here</p>
                <p className="text-zinc-500 text-xs mt-1">They will be attached to your draft</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email Composer Window Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-lg bg-[#0c0c0c] border border-zinc-900 rounded-xl shadow-2xl overflow-hidden text-left z-20 flex flex-col max-h-[85vh]"
          >
            {/* Header Titlebar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900 bg-zinc-950 select-none">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-zinc-455 tracking-tight">
                  {step === 3 ? "Message Sent" : "partners@bronticx.com"}
                </span>
              </div>
              <button 
                id="email-modal-close-btn"
                onClick={resetComposer}
                className="text-zinc-500 hover:text-white p-1 rounded-md hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 1: User Email Input */}
            {step === 1 && (
              <form onSubmit={handleNext} className="p-6 flex flex-col gap-4">
                <div className="text-center mb-2">
                  <h3 className="text-sm font-bold text-white tracking-tight">Direct Mail to BRONTICX</h3>
                  <p className="text-zinc-500 text-xs mt-1 max-w-xs mx-auto leading-normal">
                    Enter your email to start drafting a direct message to our partnerships team.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">From (Your Email)</label>
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    placeholder="you@example.com"
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-3.5 py-2 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-700 transition-colors"
                  />
                  {emailError && (
                    <span className="text-red-500 text-[10px] font-medium leading-none mt-1">
                      {emailError}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 bg-white hover:bg-zinc-200 text-black font-bold text-xs py-2.5 px-4 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  Next Step
                </button>
              </form>
            )}

            {/* Step 2: Subject & Description + File Attachment */}
            {step === 2 && (
              <form onSubmit={handleSend} className="flex-1 flex flex-col min-h-0">
                {/* Address lines */}
                <div className="px-4 py-2 bg-zinc-950/60 border-b border-zinc-900/60 flex flex-col text-xs gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-600 font-bold w-10 text-right">From:</span>
                    <span className="text-zinc-350 bg-zinc-900/40 px-2 py-0.5 rounded border border-zinc-850 text-[11px] font-medium">{email}</span>
                    <button 
                      type="button" 
                      onClick={() => setStep(1)}
                      className="ml-auto text-[10px] text-zinc-500 hover:text-white flex items-center gap-0.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-2.5 h-2.5" /> Edit
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-600 font-bold w-10 text-right">To:</span>
                    <span className="text-zinc-400 text-[11px] font-bold">partners@bronticx.com</span>
                  </div>
                </div>

                {/* Subject Input */}
                <div className="px-4 py-2 border-b border-zinc-900 flex items-center gap-2">
                  <span className="text-zinc-600 font-bold text-xs w-10 text-right">Subject:</span>
                  <input 
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Channel Partnership / Video Editing Query"
                    className="flex-1 bg-transparent text-xs text-white placeholder-zinc-700 focus:outline-none py-1"
                  />
                </div>

                {/* Email Body textarea container */}
                <div className="flex-1 p-4 overflow-y-auto min-h-[160px] flex flex-col gap-4">
                  <textarea 
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write your message here... (Tell us about your channel, subscriber count, and what you need help with)"
                    className="w-full flex-1 bg-transparent text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none resize-none leading-relaxed"
                  />

                  {/* Attached images preview list */}
                  {attachments.length > 0 && (
                    <div className="border-t border-zinc-900/60 pt-3 mt-auto">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-2">
                        Attached Images ({attachments.length})
                      </span>
                      <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto pr-1">
                        {attachments.map((img) => (
                          <div 
                            key={img.id}
                            className="flex items-center gap-2 bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 pl-2 text-[10px] text-zinc-350 pr-8 relative group"
                          >
                            <img 
                              src={img.url} 
                              alt="" 
                              className="w-7 h-7 rounded object-cover border border-zinc-900" 
                            />
                            <div className="flex flex-col text-left">
                              <span className="text-zinc-300 font-semibold truncate max-w-[120px]">{img.name}</span>
                              <span className="text-zinc-600 mt-0.5">{img.size}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeAttachment(img.id)}
                              className="absolute right-1.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-red-400 p-1 rounded bg-zinc-900/40 opacity-80 hover:opacity-100 transition-all cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom toolbar */}
                <div className="px-4 py-3 border-t border-zinc-900 bg-zinc-950 flex items-center justify-between">
                  {/* Left Side options - format mock & image attach */}
                  <div className="flex items-center gap-1.5">
                    {/* Invisible actual file input */}
                    <input 
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      multiple
                      accept="image/*"
                      className="hidden"
                    />
                    
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-zinc-400 hover:text-white p-1.5 rounded hover:bg-zinc-900/80 transition-colors cursor-pointer"
                      title="Attach images"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-zinc-400 hover:text-white p-1.5 rounded hover:bg-zinc-900/80 transition-colors cursor-pointer"
                      title="Insert photos"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>

                    <div className="h-4 w-[1px] bg-zinc-900 mx-1" />

                    {/* Standard visual formatting mock buttons requested under "other options" */}
                    <button type="button" className="text-zinc-650 p-1 rounded hover:text-zinc-400 transition-colors cursor-default" title="Format bold">
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="text-zinc-650 p-1 rounded hover:text-zinc-400 transition-colors cursor-default" title="Format italic">
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="text-zinc-650 p-1 rounded hover:text-zinc-400 transition-colors cursor-default" title="Insert list">
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="text-zinc-650 p-1 rounded hover:text-zinc-400 transition-colors cursor-default" title="Insert link">
                      <Link2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Right Side: Send button and Mailto link helper */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      id="email-modal-mailto-btn"
                      onClick={() => {
                        if (!subject.trim() || !description.trim()) {
                          return;
                        }
                        const bodyContent = `${description}\n\n---\nSender email: ${email}`;
                        const mailtoUrl = `mailto:partners@bronticx.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;
                        window.location.href = mailtoUrl;
                      }}
                      className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 text-white font-bold text-[10px] px-3 py-2 rounded-full transition-colors cursor-pointer"
                      title="Open in your default mail app"
                    >
                      Open in Mail App
                    </button>
                    <button
                      type="submit"
                      disabled={isSending}
                      className="bg-white hover:bg-zinc-200 text-black font-bold text-xs px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isSending ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send</span>
                          <Send className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Step 3: Sent Success Page */}
            {step === 3 && (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-4">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 150 }}
                  className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg"
                >
                  <CheckCircle2 className="w-6 h-6" />
                </motion.div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="text-sm font-extrabold text-white tracking-tight">Your Message is Sent!</h3>
                  <p className="text-zinc-500 text-xs max-w-xs mx-auto leading-relaxed">
                    Thank you for reaching out. We have successfully received your partnership request and our strategy team will review it shortly.
                  </p>
                </div>

                <div className="bg-zinc-950/40 border border-zinc-900 rounded-lg p-3 text-[11px] text-zinc-400 text-left w-full mt-2">
                  <div className="flex justify-between font-bold text-zinc-500 mb-1">
                    <span>Draft details:</span>
                    <span>Sent via BRONTICX Direct</span>
                  </div>
                  <div><span className="font-semibold text-zinc-500">From:</span> {email}</div>
                  <div className="truncate"><span className="font-semibold text-zinc-500">Subject:</span> {subject}</div>
                  {attachments.length > 0 && (
                    <div className="text-zinc-500 mt-1">✓ Attached {attachments.length} image file{attachments.length > 1 ? "s" : ""}</div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={resetComposer}
                  className="mt-2 px-6 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold text-xs rounded-full transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
