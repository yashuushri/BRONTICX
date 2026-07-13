/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
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
    name: "Mythpat",
    subs: "17.4M subscribers",
    avatar: "https://yt3.googleusercontent.com/TypISRnGC6N9ca7Uae4Pd8Zii0w8zPfYbVmsKCw2MTUUKLpqbkzAjdkDoXZV29VcYrNFZvbWCGU=s900-c-k-c0x00ffffff-no-rj"
  },
  {
    name: "ProBoiz",
    subs: "8.86M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFEqnMdc27h6_lpVbgRXTwipvqzVKWKaNsI0Elyh-oRF_AtRFclswECBI&s=10"
  },
  {
    name: "Ethobot",
    subs: "8.84M subscribers",
    avatar: "https://i.pinimg.com/736x/da/d3/c8/dad3c8527792d00f9467bdbc030ccb54.jpg"
  },
  {
    name: "Bionic",
    subs: "8.74M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE0SBcb8Bms1zx_YJgTloL1kP_6IlZZxTZ_7NqJlIVcjbvZC-JP5XQZF0y&s=10"
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
    name: "Parrot",
    subs: "3.95M subscribers",
    avatar: "https://pbs.twimg.com/profile_images/1372968968831524872/KBq_0PU__400x400.jpg"
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
    name: "Harsha sai",
    subs: "11.1M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUCOc3I3vv-mP3vntaUgNYJQgMqbaaWIuVHqNrWsDgGK6zwrDNf8VoA5g&s=10"
  },
  {
    name: "Brent Rivera",
    subs: "43.1M subscribers",
    avatar: "https://yt3.googleusercontent.com/ytc/AIdro_nckg4JPK13gMS2o4E9ZVGXg6bHK0PgwVXTe3YCmvKHksU=s900-c-k-c0x00ffffff-no-rj"
  },
  {
    name: "Mark Rober",
    subs: "79.6M subscribers",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/d/da/Mark_Rober-_Close.png"
  },
  {
    name: "Huda Beauty",
    subs: "4.45M subscribers",
    avatar: "https://yt3.googleusercontent.com/mTJcJ1NkRe1rNy9NI06seLJm_yBe23siLOV8-CtaTLZ8hYSGzuoaVKwLLX5HQGpNirE1AGgDfQ=s900-c-k-c0x00ffffff-no-rj"
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
    name: "Jenn Im",
    subs: "3.24M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd979la5ZN6irqMTuAXY4FpoqOEX4KAQffgGOITt48jU_HBrQ6fRRELYc&s=10"
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
    name: "Aphmau",
    avatar: "https://i.scdn.co/image/ab67656300005f1f1f496fbc284ae5d6cc45ed71"
  },
  {
    name: "aCookieGod",
    avatar: "https://imgproxy.fourthwall.dev/I89mCF0MenQlason0Tj8fpUeniHpPcnlFrNB7yd3zw8/w:1200/sm:1/enc/LIRje9qhfPMjydzA/-mv7QXlaa4jTjYhJ/gneMFzTyOdF_Ph_6/bf9irMQk5p8VhqMb/D54rUtoqDXDFlJ6E/dSeu9hnBPRwEmdRb/HhLDkT-0rdhEiSik/papuc1fPKunifO24/0cevpPwyNLxE1XSt/Bs_iuL7igGCSa6V7/aalT1AcdabqIfc2s/C1m6Oi57JdoRrwOI/rS6UFNiaoBlhinJz/fpe4Udna9bFJuMO1/_6VnOAv_6DD6mcqM/e57fGNI_nHs0DB3w.webp"
  },
  {
    name: "Nico",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1kQy-7Bam8kBGVU11AnhznRoJ-DO57p2bzSMPHv9fCzNWTp3jjRp_TEA&s=10"
  },
  {
    name: "ItsFunneh",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJmwFvvMj7qnBvFl_62SJMRliSpTwYtnVt6YU4_YxMLxS0Z83aHD2A3Bw5&s=10"
  }
];

export default function Hero({ onNavigate }: HeroProps) {
  const [creators, setCreators] = useState(ALL_CREATORS);

  useEffect(() => {
    // Shuffle creators list on component mount to randomize it
    const shuffled = [...ALL_CREATORS].sort(() => Math.random() - 0.5);
    setCreators(shuffled);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100vh] pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-black text-white"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee-scroll {
          animation: marquee 115s linear infinite;
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

        {/* CTA Buttons in Pill Form */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-6 w-full sm:w-auto"
        >
          <button
            onClick={() => onNavigate("booking")}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black font-sans text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 cursor-pointer shadow-md hover:scale-[1.01] active:scale-[0.99]"
          >
            Book a free strategy call
          </button>
          <button
            onClick={() => onNavigate("work")}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-transparent border border-zinc-850 hover:border-zinc-700 text-white font-sans text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 cursor-pointer hover:bg-zinc-900/30"
          >
            See the work
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
            <span className="font-sans font-black text-2xl sm:text-3xl text-white">10,000+</span>
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
      <div className="w-full bg-transparent py-3 mt-18 overflow-hidden relative select-none flex">
        {/* Shadow masks on sides */}
        <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="flex shrink-0 animate-marquee-scroll gap-8 pr-8">
          {creators.map((creator, index) => (
            <div
              key={`c1-${index}`}
              className="flex items-center gap-1.5 shrink-0"
            >
              <img
                src={creator.avatar}
                alt={creator.name}
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

        <div className="flex shrink-0 animate-marquee-scroll gap-8 pr-8">
          {creators.map((creator, index) => (
            <div
              key={`c2-${index}`}
              className="flex items-center gap-1.5 shrink-0"
            >
              <img
                src={creator.avatar}
                alt={creator.name}
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

    </section>
  );
}

