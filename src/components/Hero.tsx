/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

const ALL_CREATORS = [
  {
    name: "Mrbeast Gaming",
    subs: "58.3M subscribers",
    avatar: "https://yt3.googleusercontent.com/ytc/AIdro_lMiSL6eHqg2dVxvll6mVMeXo1qVak4TZ4_7mEWdobRRCk=s900-c-k-c0x00ffffff-no-rj"
  },
  {
    name: "aCookieGod",
    subs: "7.97M subscribers",
    avatar: "https://imgproxy.fourthwall.dev/I89mCF0MenQlason0Tj8fpUeniHpPcnlFrNB7yd3zw8/w:1200/sm:1/enc/LIRje9qhfPMjydzA/-mv7QXlaa4jTjYhJ/gneMFzTyOdF_Ph_6/bf9irMQk5p8VhqMb/D54rUtoqDXDFlJ6E/dSeu9hnBPRwEmdRb/HhLDkT-0rdhEiSik/papuc1fPKunifO24/0cevpPwyNLxE1XSt/Bs_iuL7igGCSa6V7/aalT1AcdabqIfc2s/C1m6Oi57JdoRrwOI/rS6UFNiaoBlhinJz/fpe4Udna9bFJuMO1/_6VnOAv_6DD6mcqM/e57fGNI_nHs0DB3w.webp"
  },
  {
    name: "Karl",
    subs: "7.01M subscribers",
    avatar: "https://yt3.googleusercontent.com/ytc/AIdro_nLi3M8zyl5rdPZ8q6hWLQmkKyWyLafsvM8Qlv-PTFv6zQ=s900-c-k-c0x00ffffff-no-rj"
  },
  {
    name: "Pokimane",
    subs: "6.59M subscribers",
    avatar: "https://media.lematin.ch/4/image/2024/01/31/147ec6eb-18e4-467a-bd15-9db4d21ebdbd.jpeg?auto=format%2Ccompress%2Cenhance&fit=max&w=1200&h=1200&rect=0%2C0%2C2048%2C1536&s=3aea772126f1f07833bf09724814d72f"
  },
  {
    name: "Scout",
    subs: "5.1M subscribers",
    avatar: "https://medialit.in/thevoices/wp-content/uploads/2024/09/Untitled-design_20240930_150516_0000.png"
  },
  {
    name: "Nico",
    subs: "4.98M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1kQy-7Bam8kBGVU11AnhznRoJ-DO57p2bzSMPHv9fCzNWTp3jjRp_TEA&s=10"
  },
  {
    name: "Payal Gaming",
    subs: "4.68M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs51cztts9pIeaxEYZpymm4VIebXl8VnurIX7UPphv8JbpTBMa4qF8Wxc&s=10"
  },
  {
    name: "Nolan",
    subs: "3.36M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0EHh9QvOFVkEvWVVZA4yJaDZZObLSkg8fQdhojZy-EgVIXy_MTLVn-Fz3&s=10"
  },
  {
    name: "Alexandra Botez",
    subs: "1.98M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBltExtGhZd3YIiUN5vm5hnHhj8rVqAUjd719YLV0Vg6Cc9C3v8ZDcSm9_6ZtOkb_mPbvmyL2RFaXULk8E-zqMua-y1WV-vjUBCYsfXYgO&s=10"
  },
  {
    name: "Will Tennyson",
    subs: "5.11M subscribers",
    avatar: "https://images4.penguinrandomhouse.com/author/2328602"
  },
  {
    name: "Ali-A",
    subs: "19.7M subscribers",
    avatar: "https://yt3.googleusercontent.com/PEWUpS4lfXweWds1DtbHnlVA0eVXmqypfHZe8-Hatzu_7Evzp3Efgf515TmeCXd_0po2Ypi08g=s900-c-k-c0x00ffffff-no-rj"
  },
  {
    name: "Aphmau",
    subs: "25.1M subscribers",
    avatar: "https://i.scdn.co/image/ab67656300005f1f1f496fbc284ae5d6cc45ed71"
  },
  {
    name: "DanTDM",
    subs: "29.1M subscribers",
    avatar: "https://yt3.googleusercontent.com/1IPv4TRdl3RaT1HEsqdvjzqA0OvBHbVxZFt2U5QZHKDgbEGosdazeBqyJH9ZU5rhs9kfC8dGXRc=s160-c-k-c0x00ffffff-no-rj"
  },
  {
    name: "VanossGaming",
    subs: "25.9M subscribers",
    avatar: "https://static.wikia.nocookie.net/vanoss/images/1/11/Vanoss_Icon.jpg/revision/latest?cb=20241219091147"
  },
  {
    name: "XpertThief",
    subs: "5.73M subscribers",
    avatar: "https://yt3.googleusercontent.com/ytc/AIdro_lcuxpMsnAxxseusIdbqf6LqZuuqa8IEdPcQBbfI9Th_eg=s900-c-k-c0x00ffffff-no-rj"
  },
  {
    name: "Typical Gamer",
    subs: "15.9M subscribers",
    avatar: "https://m.media-amazon.com/images/S/influencer-profile-image-prod/logo/typicalgamer_1594083681147_original._CR0%2C0%2C750%2C750_._US500_SCLZZZZZZZ_.png"
  },
  {
    name: "Ruhi Cenet",
    subs: "18.4M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe17qKfbY3YX2ZMzHBgsYA9PSJu8FWwJe3qD4nX2f5s-F6S1zVglYECvWK&s=10"
  },
  {
    name: "Joe HaTTab",
    subs: "20.7M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvxW0qDoboXm05chE01ZiMtjp1mhRiQDtXL5mUG1dimdB6A_ZY6nqklhYa&s=10"
  },
  {
    name: "nectar",
    subs: "1.45M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzpZ-D7FtWK2YwQrpWeB9epHg1qOzqupPl1VS6EQZmEf7b55kxENiPPIC4&s=10"
  },
  {
    name: "Ryan Trahan",
    subs: "23.5M subscribers",
    avatar: "https://yt3.ggpht.com/fiJrCXLTjjY531uelhbpUD21Cb0iMb6vF21M6-H7ZhjMZPe2cAkIeB9yWUHtENkFhq1F3oVbgg=s800-c-k-c0x00ffffff-no-rj"
  },
  {
    name: "Niko Omilana",
    subs: "8.86M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSii7YgAVKphZc_NfNQ8KMY-3lmrFyv8w6t8B92S90c9A&s=10"
  },
  {
    name: "Nick DiGiovanni",
    subs: "42.9M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3od8s0ri8RAZ9F83mfWomnziiBwb8JvR9uiZMEac-Tg&s"
  },
  {
    name: "Matt Stonie",
    subs: "16.4M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2hf46FTFPZcC_43zVyRLirflnF6I7JklQm9Q7Mw6suyCI2w6Zj41nzab3&s=10"
  },
  {
    name: "Brent Rivera",
    subs: "43.1M subscribers",
    avatar: "https://yt3.googleusercontent.com/ytc/AIdro_nckg4JPK13gMS2o4E9ZVGXg6bHK0PgwVXTe3YCmvKHksU=s900-c-k-c0x00ffffff-no-rj"
  },
  {
    name: "Diana Kidisyuk",
    subs: "132M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcBRN4LJVz47ONv4sPYEmIL7DEM3vP-f9nfif8hFQuInCsU0Ptob2W3cM&s=10"
  },
  {
    name: "ItsFunneh",
    subs: "12.1M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJmwFvvMj7qnBvFl_62SJMRliSpTwYtnVt6YU4_YxMLxS0Z83aHD2A3Bw5&s=10"
  },
  {
    name: "Lauren Webber",
    subs: "10.2M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR10KSZHEkUr6jafcysBR86isEl5uZWdsLZoY-AOlqMUw&s=10"
  },
  {
    name: "Rachell Marie",
    subs: "4.11M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdWkQDSjMf3RW1XAvXtk2h2IZID5MywDVVx3WBzyuNpA&s=10"
  },
  {
    name: "Lele Pons",
    subs: "17.9M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuoW0fPNla9TE5Rq2-1AXIzlG1b_21TyTbI8azjiNr9k1tkmCRHbGFlrTZ&s=10"
  },
  {
    name: "Rosanna Pansino",
    subs: "14.8M subscribers",
    avatar: "https://yt3.googleusercontent.com/td6U3EkHE3lUHVc41Jq_uP17JVD0JFBurMA2y1taarmP8wvrH4wckZN8elAdDFEW3ZxFRPWS1Ss=s900-c-k-c0x00ffffff-no-rj"
  },
  {
    name: "LaurenZside",
    subs: "10.3M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2FoOmlqfMsc8rL-ZcLdjJpnFZiRnAF6lU-NHzaWDhlQ&s"
  }
];

const TRUSTED_CREATORS_FOR_PILE = [
  {
    name: "MrBeast Gaming",
    avatar: "https://yt3.googleusercontent.com/ytc/AIdro_lMiSL6eHqg2dVxvll6mVMeXo1qVak4TZ4_7mEWdobRRCk=s900-c-k-c0x00ffffff-no-rj"
  },
  {
    name: "Nick DiGiovanni",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3od8s0ri8RAZ9F83mfWomnziiBwb8JvR9uiZMEac-Tg&s"
  },
  {
    name: "Ryan Trahan",
    avatar: "https://yt3.ggpht.com/fiJrCXLTjjY531uelhbpUD21Cb0iMb6vF21M6-H7ZhjMZPe2cAkIeB9yWUHtENkFhq1F3oVbgg=s800-c-k-c0x00ffffff-no-rj"
  },
  {
    name: "Pokimane",
    avatar: "https://media.lematin.ch/4/image/2024/01/31/147ec6eb-18e4-467a-bd15-9db4d21ebdbd.jpeg?auto=format%2Ccompress%2Cenhance&fit=max&w=1200&h=1200&rect=0%2C0%2C2048%2C1536&s=3aea772126f1f07833bf09724814d72f"
  },
  {
    name: "Aphmau",
    avatar: "https://i.scdn.co/image/ab67656300005f1f1f496fbc284ae5d6cc45ed71"
  }
];

export default function Hero({ onNavigate }: HeroProps) {
  const [creators, setCreators] = useState(ALL_CREATORS);
  const [isMarqueeVisible, setIsMarqueeVisible] = useState(true);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Shuffle creators list on component mount to randomize it
    const shuffled = [...ALL_CREATORS].sort(() => Math.random() - 0.5);
    setCreators(shuffled);
  }, []);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMarqueeVisible(entry.isIntersecting);
      },
      { rootMargin: "150px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100vh] pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-black text-white"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        .animate-marquee-scroll {
          animation: marquee 115s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }
        .animate-marquee-paused {
          animation-play-state: paused;
        }
      `}</style>

      {/* Hero Body Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col justify-center items-center mt-3 z-10">
        
        {/* Avatar Pile & Label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-6 bg-zinc-900/40 px-3 py-1 rounded-full border border-zinc-800/60"
        >
          <div className="flex -space-x-2">
            {TRUSTED_CREATORS_FOR_PILE.map((c, i) => (
              <img
                key={i}
                src={c.avatar}
                alt={c.name}
                decoding="async"
                className="w-5 h-5 rounded-full border border-black object-cover animate-fade-in"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
          <span className="text-zinc-400 text-[11px] font-medium tracking-tight">
            Trusted by creators with <span className="text-white font-bold">411.4M+ combined subs</span>
          </span>
        </motion.div>

        {/* Big Catchy Strikethrough Header */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] max-w-3xl"
        >
          We don't <span className="text-zinc-500 line-through decoration-zinc-500/80 decoration-[2.5px] font-medium">edit videos</span>. <br />
          <span className="text-white">We grow channels.</span>
        </motion.h1>

        {/* Dynamic subtext paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-zinc-400 text-xs sm:text-sm lg:text-base font-normal tracking-tight leading-relaxed mt-4 max-w-xl"
        >
          Editing, thumbnails, titles, growth strategy and everything handled by one team. You record and we do the rest, delivered in ~48 hours.
        </motion.p>

        {/* CTA Button Centered */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center mt-6 w-full"
        >
          <button
            type="button"
            onClick={() => onNavigate("booking")}
            className="px-7 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black font-sans text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 cursor-pointer shadow-md hover:scale-[1.01] active:scale-[0.99]"
          >
            Book a free strategy call
          </button>
        </motion.div>

        {/* Sub-label info row */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-zinc-650 text-[10px] tracking-wide mt-3"
        >
          Free 30-min call · No contracts · ~48h standard delivery
        </motion.span>

        {/* Stats Column Block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mt-14 w-full max-w-3xl text-center"
        >
          <div className="flex flex-col items-center">
            <span className="font-sans font-black text-2xl sm:text-3xl text-white">411.4M+</span>
            <span className="text-zinc-500 text-[11px] sm:text-xs tracking-tight mt-0.5 max-w-[180px] leading-tight">
              Combined subs of creators we've worked with
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-sans font-black text-2xl sm:text-3xl text-white">1000+</span>
            <span className="text-zinc-500 text-[11px] sm:text-xs tracking-tight mt-0.5 max-w-[180px] leading-tight">
              Of videos delivered
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-sans font-black text-2xl sm:text-3xl text-white">~48h</span>
            <span className="text-zinc-500 text-[11px] sm:text-xs tracking-tight mt-0.5 max-w-[180px] leading-tight">
              Our standard delivery window
            </span>
          </div>
        </motion.div>

      </div>

      {/* Infinite scrolling ticker row */}
      <div ref={marqueeRef} className="w-full bg-transparent py-3 mt-18 overflow-hidden relative select-none flex">
        {/* Shadow masks on sides */}
        <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className={`flex shrink-0 animate-marquee-scroll gap-8 pr-8 ${!isMarqueeVisible ? "animate-marquee-paused" : ""}`}>
          {creators.map((creator, index) => (
            <div
              key={`c1-${index}`}
              className="flex items-center gap-1.5 shrink-0"
            >
              <img
                src={creator.avatar}
                alt={creator.name}
                decoding="async"
                className="w-5.5 h-5.5 rounded-full object-cover border border-zinc-900"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col text-left">
                <span className="font-bold text-[11.5px] sm:text-[13px] text-zinc-350 tracking-tight leading-tight">{creator.name}</span>
                <span className="text-[10px] text-zinc-650 font-semibold tracking-tight leading-none mt-0.5">{creator.subs}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={`flex shrink-0 animate-marquee-scroll gap-8 pr-8 ${!isMarqueeVisible ? "animate-marquee-paused" : ""}`}>
          {creators.map((creator, index) => (
            <div
              key={`c2-${index}`}
              className="flex items-center gap-1.5 shrink-0"
            >
              <img
                src={creator.avatar}
                alt={creator.name}
                decoding="async"
                className="w-5.5 h-5.5 rounded-full object-cover border border-zinc-900"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col text-left">
                <span className="font-bold text-[11.5px] sm:text-[13px] text-zinc-350 tracking-tight leading-tight">{creator.name}</span>
                <span className="text-[10px] text-zinc-650 font-semibold tracking-tight leading-none mt-0.5">{creator.subs}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Static Agency Partners Strip right under Creators Ticker */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center mt-8 pt-7 border-t border-zinc-900/50 z-10 w-full">
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14">
          {/* WME */}
          <a
            href="https://www.wmeagency.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="WME"
            className="text-zinc-400 hover:text-white transition-colors duration-200 flex items-center justify-center"
          >
            <svg
              viewBox="0 0 99 18"
              className="h-4 sm:h-[18px] w-auto fill-current"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="WME"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.2482 11.0638H21.0288L18.3956 7.10548V6.91081L23.0403 0H18.7979L16.4573 3.69874H16.2379L13.8607 0H9.61839L14.263 6.91081V7.10548L11.6298 11.0638H11.4104L4.27891 0H0L11.4104 17.2932H11.6298L16.2379 10.2202H16.4573L21.0288 17.2932H21.2482L32.6587 0H28.3797L21.2482 11.0638ZM53.541 11.3558H53.3216L44.8735 0H39.8631V17.2932H43.5569V4.50987H43.7763L53.3216 17.2932H53.541L63.1228 4.50987H63.3423V17.2932H67.036V0H61.9891L53.541 11.3558ZM98.9985 3.27696H81.0783L80.932 3.40674V6.84592L81.0783 7.00815H95.4145V10.2851H81.0783L80.932 10.4473V13.8541L81.0783 14.0163H98.9985V17.2932H77.2383V0H98.9985V3.27696Z"
              />
            </svg>
          </a>

          {/* Night Media */}
          <a
            href="https://www.night.co/"
            target="_blank"
            rel="noreferrer"
            aria-label="Night Media"
            className="opacity-70 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
          >
            <img
              src="/logos/night.png"
              alt="Night Media"
              className="h-3.5 sm:h-4 w-auto object-contain"
            />
          </a>

          {/* Evolved Talent */}
          <a
            href="https://evolvedtalent.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Evolved Talent"
            className="text-zinc-400 hover:text-white transition-colors duration-200 flex items-center justify-center"
          >
            <svg
              viewBox="0 0 765.557 200.468"
              className="h-5 sm:h-6 w-auto fill-current"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Evolved Talent"
            >
              <g>
                <path d="M90.324,161.173c-0.01-0.084-0.015-0.17-0.036-0.25c-0.013-0.043-0.036-0.084-0.052-0.125c-0.032-0.086-0.062-0.172-0.107-0.25c-0.025-0.041-0.062-0.076-0.091-0.117c-0.05-0.07-0.097-0.139-0.158-0.201c-0.044-0.041-0.099-0.074-0.148-0.111c-0.055-0.043-0.103-0.092-0.164-0.127c-0.005-0.004-0.011-0.004-0.017-0.008c-0.005-0.004-0.009-0.008-0.015-0.01l-65.417-35.882c-0.476-0.26-1.053-0.254-1.527,0.016L0.784,136.63c-0.489,0.281-0.788,0.805-0.784,1.369c0.005,0.563,0.315,1.082,0.81,1.352l64.606,35.436v24.121c0,0.559,0.296,1.072,0.778,1.352c0.242,0.139,0.512,0.209,0.781,0.209s0.537-0.07,0.777-0.207l21.811-12.521c0.484-0.279,0.783-0.793,0.783-1.354v-25.045c0-0.002-0.001-0.004-0.001-0.008c0-0.002,0.001-0.004,0.001-0.008C90.346,161.272,90.33,161.224,90.324,161.173z" />
                <path d="M90.324,99.222c-0.01-0.084-0.015-0.169-0.036-0.249c-0.013-0.044-0.036-0.083-0.052-0.126c-0.032-0.084-0.062-0.171-0.107-0.248c-0.025-0.043-0.062-0.078-0.091-0.118c-0.05-0.069-0.097-0.14-0.158-0.2c-0.044-0.043-0.099-0.075-0.148-0.114c-0.055-0.042-0.103-0.09-0.164-0.125c-0.005-0.003-0.011-0.004-0.017-0.007c-0.005-0.004-0.009-0.009-0.015-0.012l-65.417-35.88c-0.476-0.261-1.053-0.254-1.527,0.016L0.784,74.678C0.294,74.96-0.004,75.481,0,76.047c0.005,0.565,0.315,1.08,0.81,1.353l64.606,35.437v24.124c0,0.557,0.296,1.07,0.778,1.35c0.242,0.141,0.512,0.209,0.781,0.209s0.537-0.068,0.777-0.207l21.811-12.522c0.484-0.279,0.783-0.793,0.783-1.354V99.391c0-0.002-0.001-0.004-0.001-0.008c0-0.002,0.001-0.004,0.001-0.007C90.346,99.323,90.33,99.273,90.324,99.222z" />
                <path d="M90.323,37.271c-0.009-0.083-0.014-0.167-0.035-0.246c-0.014-0.047-0.037-0.089-0.055-0.134c-0.031-0.082-0.06-0.165-0.104-0.241c-0.024-0.041-0.059-0.075-0.087-0.114c-0.052-0.07-0.1-0.143-0.163-0.204c-0.041-0.042-0.093-0.071-0.14-0.107c-0.057-0.045-0.108-0.095-0.172-0.132c-0.005-0.003-0.011-0.004-0.017-0.007c-0.005-0.003-0.009-0.008-0.015-0.011L24.119,0.192c-0.476-0.262-1.053-0.256-1.527,0.016L0.784,12.731C0.294,13.013-0.004,13.535,0,14.1c0.005,0.565,0.315,1.082,0.81,1.354l64.606,35.436v24.12c0,0.558,0.296,1.071,0.778,1.35c0.242,0.141,0.512,0.211,0.781,0.211s0.537-0.07,0.777-0.207l21.811-12.519c0.484-0.279,0.783-0.794,0.783-1.354V37.442c0-0.002-0.001-0.005-0.001-0.008c0-0.002,0.001-0.005,0.001-0.008C90.346,37.374,90.33,37.323,90.323,37.271z" />
                <rect x="151.622" y="0" width="5" height="200.468" />
              </g>
              <g>
                <path d="M271.413,71.723c-6.08-3.496-13.327-5.243-21.737-5.243c-8.208,0-15.352,1.799-21.432,5.396c-6.08,3.598-10.716,8.512-13.908,14.743c-3.192,6.232-4.788,13.301-4.788,21.205c0,7.903,1.596,14.972,4.788,21.203c3.192,6.232,7.828,11.148,13.908,14.744s13.224,5.396,21.432,5.396c9.728,0,17.987-2.356,24.776-7.068c6.788-4.712,11.45-11.07,13.984-19.076h-21.432c-1.521,3.041-3.701,5.347-6.537,6.916c-2.838,1.572-6.436,2.356-10.792,2.356c-3.344,0-6.284-0.708-8.816-2.128c-2.534-1.418-4.586-3.443-6.156-6.08c-1.572-2.634-2.66-5.776-3.268-9.424h58.368v-4.561c0-8.916-1.546-16.668-4.636-23.256C282.076,80.261,277.493,75.219,271.413,71.723z M231.588,99.767c1.012-5.168,3.09-9.195,6.232-12.084c3.14-2.888,7.092-4.332,11.856-4.332c4.864,0,8.84,1.444,11.932,4.332c3.09,2.889,5.143,6.916,6.156,12.084H231.588z" />
                <polygon points="336.771,126.823 318.228,68.303 294.211,68.303 323.547,147.343 349.388,147.343 378.724,68.303 354.858,68.303" />
                <path d="M446.058,71.875c-6.183-3.597-13.529-5.396-22.041-5.396s-15.859,1.799-22.039,5.396c-6.183,3.598-10.869,8.512-14.061,14.743c-3.191,6.232-4.788,13.301-4.788,21.205c0,7.903,1.597,14.972,4.788,21.203c3.191,6.232,7.878,11.148,14.061,14.744c6.18,3.596,13.527,5.396,22.039,5.396s15.858-1.801,22.041-5.396c6.18-3.596,10.867-8.512,14.06-14.744c3.192-6.231,4.788-13.3,4.788-21.203c0-7.904-1.596-14.973-4.788-21.205C456.925,80.387,452.237,75.473,446.058,71.875z M440.433,120.135c-1.318,3.446-3.32,6.132-6.004,8.056c-2.686,1.926-6.156,2.889-10.412,2.889c-4.156,0-7.6-0.963-10.336-2.889c-2.736-1.924-4.764-4.609-6.08-8.056c-1.318-3.444-1.976-7.548-1.976-12.312c0-4.762,0.657-8.866,1.976-12.313c1.316-3.443,3.344-6.13,6.08-8.057c2.736-1.923,6.18-2.887,10.336-2.887c4.256,0,7.727,0.964,10.412,2.887c2.684,1.927,4.686,4.613,6.004,8.057c1.316,3.446,1.977,7.551,1.977,12.313C442.409,112.587,441.749,116.69,440.433,120.135z" />
                <rect x="476.152" y="51.301" width="22.192" height="96.042" />
                <polygon points="550.327,126.823 531.783,68.303 507.768,68.303 537.104,147.343 562.943,147.343 592.279,68.303 568.415,68.303" />
                <path d="M658.55,71.723c-6.08-3.496-13.326-5.243-21.736-5.243c-8.208,0-15.352,1.799-21.432,5.396c-6.08,3.598-10.716,8.512-13.908,14.743c-3.192,6.232-4.788,13.301-4.788,21.205c0,7.903,1.596,14.972,4.788,21.203c3.192,6.232,7.828,11.148,13.908,14.744s13.224,5.396,21.432,5.396c9.729,0,17.986-2.356,24.776-7.068c6.787-4.712,11.45-11.07,13.983-19.076h-21.432c-1.52,3.041-3.7,5.347-6.536,6.916c-2.838,1.572-6.436,2.356-10.792,2.356c-3.344,0-6.284-0.708-8.815-2.128c-2.534-1.418-4.587-3.443-6.156-6.08c-1.572-2.634-2.66-5.776-3.269-9.424h58.368v-4.561c0-8.916-1.546-16.668-4.636-23.256C669.214,80.261,664.63,75.219,658.55,71.723z M618.726,99.767c1.012-5.168,3.09-9.195,6.232-12.084c3.14-2.888,7.092-4.332,11.855-4.332c4.864,0,8.84,1.444,11.933,4.332c3.09,2.889,5.142,6.916,6.155,12.084H618.726z" />
                <path d="M743.364,77.423c-2.736-3.546-6.057-6.256-9.956-8.132c-3.902-1.874-8.436-2.812-13.604-2.812c-7.297,0-13.555,1.799-18.772,5.396c-5.221,3.598-9.196,8.512-11.932,14.743c-2.736,6.232-4.104,13.301-4.104,21.205c0,7.903,1.368,14.972,4.104,21.203c2.735,6.232,6.711,11.148,11.932,14.744c5.218,3.596,11.476,5.396,18.772,5.396c5.472,0,10.207-1.041,14.212-3.116c4.002-2.075,7.319-5.04,9.956-8.892v10.184h21.584V51.301h-22.192V77.423z M741.692,120.135c-1.318,3.446-3.32,6.132-6.004,8.056c-2.687,1.926-6.057,2.889-10.108,2.889c-4.054,0-7.424-0.963-10.107-2.889c-2.687-1.924-4.662-4.609-5.929-8.056c-1.268-3.444-1.899-7.548-1.899-12.312c0-4.762,0.632-8.866,1.899-12.313c1.267-3.443,3.242-6.13,5.929-8.057c2.684-1.923,6.054-2.887,10.107-2.887c4.052,0,7.422,0.964,10.108,2.887c2.684,1.927,4.686,4.613,6.004,8.057c1.315,3.446,1.976,7.551,1.976,12.313C743.668,112.587,743.008,116.69,741.692,120.135z" />
              </g>
            </svg>
          </a>
        </div>

        <p className="mt-3 text-[10px] sm:text-[11px] text-zinc-600 font-normal tracking-tight">
          Talent &amp; management agencies whose creators collaborate and partner with our studio.
        </p>
      </div>

    </section>
  );
}

