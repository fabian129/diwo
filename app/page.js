"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

// ─── Scroll reveal hook ────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("revealed"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ═══════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════
export default function Home() {
  useScrollReveal();

  // Lenis smooth scroll + GSAP manifesto scrub
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Wait for GSAP CDN to load, then init manifesto animation
    const initGsap = () => {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      if (!gsap || !ScrollTrigger) {
        setTimeout(initGsap, 200);
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      // Sync Lenis with ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Manifesto word-by-word reveal
      const el = document.querySelector('.manifesto-scrub');
      if (el) {
        const text = el.innerText;
        el.innerHTML = text.split(' ').filter(w => w.trim()).map(word =>
          `<span class="manifesto-word" style="opacity:0.12;display:inline-block">${word}&nbsp;</span>`
        ).join('');

        gsap.to('.manifesto-word', {
          opacity: 1,
          color: '#000000',
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 1,
          },
        });
      }
    };

    initGsap();

    return () => lenis.destroy();
  }, []);
  return (
    <main>
      {/* ═══════════ NAVBAR — Fintech SaaS / Stripe (from Navbar.jsx) ═══════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full transition-all duration-300 bg-slate-50/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="flex items-center justify-between py-4 px-6 lg:px-12 w-full max-w-screen-2xl">
          {/* Logo */}
          <div className="flex items-center gap-2 text-xl font-semibold tracking-tight text-slate-900">
            <img src="/diwo-logo.webp" alt="Diwo" className="h-7 object-contain" />
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-normal text-slate-600">
            <a href="#tjanster" className="hover:text-slate-900 transition-colors">Tjänster</a>
            <a href="#diwo-index" className="hover:text-slate-900 transition-colors">Diwo Index</a>
            <a href="#varfor" className="hover:text-slate-900 transition-colors">Varför</a>
            <a href="#om-oss" className="hover:text-slate-900 transition-colors">Om oss</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 text-sm font-normal">
            <a href="#kontakt" className="bg-slate-900 text-white px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 transition-all duration-300">
              Boka möte
              <iconify-icon icon="solar:arrow-right-linear" className="text-lg" stroke-width="1.5"></iconify-icon>
            </a>
          </div>
        </div>
      </nav>


      {/* ═══════════ 1. HERO — Fintech SaaS / Stripe (ported from Hero.jsx) ═══════════ */}
      <HeroSection />

      {/* ═══════════ 1.5 MANIFESTO — OBLIQUE-style scroll-scrub text ═══════════ */}
      <section className="py-32 md:py-44 px-6 md:px-20 max-w-[1600px] mx-auto bg-white relative z-20">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3 hidden lg:flex flex-col justify-between border-t border-black/10 pt-4">
            <span className="text-xs font-mono text-gray-400 tracking-widest">01 — MANIFEST</span>
          </div>
          <div className="lg:col-span-9 lg:col-start-4">
            <h2 className="manifesto-scrub text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.08] tracking-tight text-black max-w-5xl">
              Digital transformation handlar inte om teknik. Det handlar om människor som vågar förändra hur de arbetar. Vi finns här för att göra den resan enklare, tryggare och mätbar.
            </h2>
          </div>
        </div>
      </section>


      {/* ═══════════ 2. LOGO MARQUEE — NovaStudio (template 62) ═══════════ */}
      <MarqueeSection />


      {/* ═══════════ 3. VIDEO REEL — NovaStudio dark section (template 62) ═══════════ */}
      <VideoSection />


      {/* ═══════════ 4. BENTO GRID — Fintech SaaS / Stripe style ═══════════ */}
      <BentoSection />


      {/* ═══════════ 4.5 METRICS BREAKER — Fintech GlobalCommerce (ported) ═══════════ */}
      <MetricsBreaker />


      {/* ═══════════ 6. DARK SECTION — Growth.io pain-points (template 64) ═══════════ */}
      <PainSection />


      {/* ═══════════ 7. EDITORIAL — Om Diwo ═══════════ */}
      <section className="bg-white pt-32 pb-16 px-6 lg:px-12" id="om-oss">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-black"></div>
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Om Diwo</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-slate-900 leading-[1.05] mb-12">Vi brygger gapet<br />mellan teknik<br />och prestation.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <p className="text-lg text-slate-500 leading-relaxed">Diwo är ett innovativt konsultbolag som hjälper organisationer att jobba smartare. Vårt team består av en mix av IT-experter, managementkonsulter och förändringsledare — alla med en gemensam passion för den digitala arbetsplatsen.</p>
            <p className="text-lg text-slate-500 leading-relaxed">Vi är en del av <strong className="text-slate-900">Worklife Group</strong> — en koncern som samlas runt visionen att tillgodose mänskliga, ekonomiska och planetära behov i arbetslivet. Med kontor på Norr Mälarstrand i Stockholm.</p>
          </div>
          <div className="grid grid-cols-3 gap-8 border-t border-slate-200 pt-10">
            {[
              { t: "Strategi", d: "Digital transformation, förstudier & roadmaps", icon: "solar:compass-bold-duotone" },
              { t: "Teknik", d: "Microsoft 365, AI, Copilot & SharePoint", icon: "solar:monitor-bold-duotone" },
              { t: "Människa", d: "Förändringsledning, adoption & kultur", icon: "solar:users-group-rounded-bold-duotone" },
            ].map((p, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                  <iconify-icon icon={p.icon} width="24" height="24"></iconify-icon>
                </div>
                <div className="text-base font-semibold text-slate-900">{p.t}</div>
                <div className="text-sm text-slate-500 leading-relaxed">{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════ 7.5 PHOTO BENTO — OBLIQUE parallax grid ═══════════ */}
      <PhotoBento />

      {/* ═══════════ 7.7 STICKY CARD STACK — OBLIQUE-style (template 63) ═══════════ */}
      <PartnershipCards />


      {/* ═══════════ 8. CTA — Growth.io style (template 64) ═══════════ */}
      <CtaSection />


      {/* ═══════════ 9. FOOTER — Growth.io dark (template 64) ═══════════ */}
      <FooterSection />
    </main>
  );
}


// ─── HERO — Ported from Fintech SaaS / Stripe (Hero.jsx) ──────────
function RevealText({ text, delayOffset = 0.1, as: Element = 'span', className = '' }) {
  return (
    <Element className={className}>
      {text.split(/(\s+)/).map((word, i) => {
        if (word.trim() === '') return <span key={i}>{word}</span>;
        return (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <span
              className="inline-block animate-reveal-word"
              style={{
                opacity: 0,
                transform: 'translateY(110%) rotate(3deg)',
                transformOrigin: 'top left',
                animationDelay: `${delayOffset + i * 0.02}s`,
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </Element>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center pt-32 pb-20 px-6 lg:px-12 w-full mx-auto text-slate-900 bg-slate-50 overflow-hidden">

      {/* Background Borders — from Fintech template */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-center w-full overflow-hidden">
        <div className="w-full max-w-screen-2xl h-full border-x border-slate-200/50 relative">
          <div className="absolute top-0 -left-[2.5px] w-[5px] h-[5px] border border-slate-300 bg-slate-50"></div>
          <div className="absolute top-0 -right-[2.5px] w-[5px] h-[5px] border border-slate-300 bg-slate-50"></div>
          <div className="absolute bottom-0 -left-[2.5px] w-[5px] h-[5px] border border-slate-300 bg-slate-50"></div>
          <div className="absolute bottom-0 -right-[2.5px] w-[5px] h-[5px] border border-slate-300 bg-slate-50"></div>
        </div>
      </div>

      {/* Aura + Animated SVG Waves — from Fintech template */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-end">
        <div className="relative w-full lg:w-[65%] h-full right-0 overflow-hidden">
          <img
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/d14dc069-558a-4c51-8aad-5cc237f9b61d_1600w.jpg"
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-multiply animate-aura"
            alt="Abstract Blue Wave"
          />

          <div className="absolute inset-0 flex items-center justify-center opacity-80 mix-blend-multiply">
            <svg className="absolute w-[200%] h-[120vh] top-1/2 -translate-y-1/2 left-0" viewBox="0 0 2880 800" preserveAspectRatio="none">
              <defs>
                <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25"></stop>
                  <stop offset="50%" stopColor="#c026d3" stopOpacity="0.25"></stop>
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.25"></stop>
                </linearGradient>
                <linearGradient id="wave-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.15"></stop>
                  <stop offset="50%" stopColor="#ec4899" stopOpacity="0.15"></stop>
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.15"></stop>
                </linearGradient>
                <linearGradient id="wave-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3"></stop>
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3"></stop>
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3"></stop>
                </linearGradient>
              </defs>
              <path className="animate-wave-1" fill="url(#wave-grad-1)" d="M 0 400 C 240 200, 480 200, 720 400 C 960 600, 1200 600, 1440 400 C 1680 200, 1920 200, 2160 400 C 2400 600, 2640 600, 2880 400 L 2880 800 L 0 800 Z"></path>
              <path className="animate-wave-2" fill="url(#wave-grad-2)" d="M 0 500 C 240 700, 480 700, 720 500 C 960 300, 1200 300, 1440 500 C 1680 700, 1920 700, 2160 500 C 2400 300, 2640 300, 2880 500 L 2880 800 L 0 800 Z"></path>
              <path className="animate-wave-3" fill="url(#wave-grad-3)" d="M 0 600 C 240 450, 480 450, 720 600 C 960 750, 1200 750, 1440 600 C 1680 450, 1920 450, 2160 600 C 2400 750, 2640 750, 2880 600 L 2880 800 L 0 800 Z"></path>
            </svg>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
        </div>
      </div>

      <div className="relative z-20 flex-grow flex items-center w-full max-w-screen-2xl mx-auto h-full my-auto">
        <div className="w-full lg:w-[65%] xl:w-[55%] flex flex-col items-start mt-12 md:mt-0 pl-4 md:pl-10">
          <div className="mb-6 flex items-center gap-2 text-xs font-normal text-slate-600 bg-white/80 backdrop-blur-md py-1.5 px-3 rounded-full border border-slate-200/80 shadow-sm animate-fade-up-delayed" style={{ animationDelay: '0.1s' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-900"></span>
            </span>
            <span>Ledande inom digital arbetsplats sedan 2018</span>
          </div>

          <RevealText
            text="Vi hjälper er att lyckas med den digitala arbetsplatsen."
            as="h1"
            className="text-5xl md:text-6xl lg:text-[5rem] leading-[1.15] tracking-tight text-slate-900 font-normal mb-6"
            delayOffset={0.2}
          />

          <RevealText
            text="Strategi, teknik och människa — i harmoni. Vi brygger gapet mellan modern teknik och organisationers prestation."
            as="p"
            className="text-xl md:text-2xl lg:text-3xl leading-snug tracking-tight text-slate-500 font-light mb-10 max-w-3xl"
            delayOffset={0.4}
          />
        </div>
      </div>
    </section>
  );
}


// ─── MARQUEE — Ported from NovaStudio (template 62) client ticker ──
function MarqueeSection() {
  return (
    <section className="border-y scroll-reveal revealed bg-white border-[#eaeaea] pt-10 pb-10">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-[#888]">
          Urval av kunder som valt att ta pulsen med Diwo
        </p>
        <div className="flex overflow-hidden mask-edges group">
          <div className="flex w-max animate-marquee-scroll grayscale transition-all duration-500 group-hover:grayscale-0 opacity-60 group-hover:opacity-100">
            {[1, 2].map((set) => (
              <div key={set} className="flex items-center justify-around min-w-max gap-16 pr-16 sm:gap-24 sm:pr-24">
                {/* Placeholder logos — replace with real Diwo client logos */}
                {["Kund 1", "Kund 2", "Kund 3", "Kund 4", "Kund 5", "Kund 6"].map((name, i) => (
                  <div key={i} className="h-5 px-6 py-4 flex items-center text-sm font-semibold text-neutral-400 border border-dashed border-neutral-200 rounded-lg">{name}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


// ─── VIDEO — Ported from NovaStudio (template 62) agency reel ──────
function VideoSection() {
  const videoRef = useRef(null);

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); } else { v.pause(); }
  };

  return (
    <section className="relative overflow-hidden bg-[#080808] text-white">
      <div className="relative mx-auto max-w-[90rem] px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#101010] scroll-reveal shadow-2xl revealed">
          <video
            ref={videoRef}
            className="aspect-[16/8.2] opacity-90 w-full object-cover"
            autoPlay muted loop playsInline
            poster="https://cdn.prod.website-files.com/686294e263eb7e215bd232f7/68c0557aa0ca3aef28f7396d_home-hero-vid-poster.webp"
          >
            <source src="https://dhygzobemt712.cloudfront.net/Web/home/09-2025/home-hero.mp4" type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>

          {/* Controls — exact layout from NovaStudio */}
          <div className="absolute right-4 top-4 flex flex-col gap-2">
            <button onClick={toggleVideo} className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black" aria-label="Pausa video">
              <iconify-icon icon="solar:pause-linear" width="20" height="20" className="transition-transform group-hover:scale-110"></iconify-icon>
            </button>
          </div>

          {/* Label */}
          <div className="absolute bottom-4 right-4 rounded bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white hover:text-black cursor-pointer">
            Diwo — Digital arbetsplats i praktiken
          </div>
        </div>
      </div>
    </section>
  );
}


// ─── BENTO GRID — Ported from Fintech SaaS / Stripe (BentoGrid.jsx) ────────
function BentoSection() {
  return (
    <section className="bg-white pt-24 pb-24 px-6 lg:px-12" id="tjanster">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12">
          <h2 className="text-[#0a2540] text-3xl font-medium tracking-tight mb-4">Våra tjänster</h2>
          <p className="text-lg text-[#424770] max-w-2xl">Allt ni behöver för en framgångsrik digital arbetsplats — strategi, teknik och människa i harmoni.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: AI & Copilot — WIDE (col-span-2) — from Fintech Card 1 layout */}
          <div className="lg:col-span-2 relative bg-gray-50 rounded-3xl overflow-hidden border border-gray-200/60 shadow-sm group min-h-[500px] cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50"></div>
            <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[120%] bg-gradient-to-br from-blue-400/20 via-indigo-500/20 to-purple-600/20 blur-[80px] rounded-full mix-blend-multiply group-hover:scale-110 transition-transform duration-1000 ease-out"></div>

            {/* UI Mockup — Copilot conversation */}
            <div className="absolute inset-0 flex flex-col md:flex-row items-end justify-center gap-8 pt-12 px-8 overflow-hidden">
              <div className="w-[420px] h-[400px] bg-white/95 backdrop-blur-xl rounded-t-xl shadow-2xl relative z-10 translate-y-8 group-hover:translate-y-2 transition-transform duration-700 delay-75 ease-out flex-shrink-0 border border-white/40 hidden md:flex flex-col">
                <div className="flex items-center px-4 py-2 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
                  <div className="flex gap-1.5 mr-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                  </div>
                  <div className="flex-1 bg-white border border-gray-100 rounded flex items-center justify-center gap-1.5 py-1 text-xs text-gray-500">
                    <iconify-icon icon="lucide:sparkles" className="text-xs" stroke-width="1.5"></iconify-icon>
                    Microsoft Copilot
                  </div>
                </div>
                <div className="flex-1 p-5 flex flex-col gap-3">
                  <div className="self-end bg-blue-50 rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-gray-800 max-w-[80%]">
                    Sammanfatta gårdagens styrelsemöte och skicka till teamet
                  </div>
                  <div className="self-start bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-gray-700 max-w-[85%]">
                    <div className="flex items-center gap-1.5 text-indigo-600 text-xs font-medium mb-1">
                      <iconify-icon icon="lucide:sparkles" width="12"></iconify-icon>
                      Copilot
                    </div>
                    Jag har sammanfattat mötet i 5 punkter och förberett ett mail till teamet. Vill du granska innan jag skickar?
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <button className="flex-1 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium">Skicka</button>
                    <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">Redigera</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Text overlay — bottom left */}
            <div className="absolute bottom-8 left-8 z-20">
              <h3 className="text-2xl font-medium tracking-tight text-gray-900 mb-2">AI & Microsoft Copilot</h3>
              <p className="text-sm text-gray-600 max-w-xs">Frigör tid och höj kvaliteten med en framgångsrik implementering av AI i er organisation.</p>
            </div>
          </div>

          {/* Card 2: Säkerhet — from Fintech Card 2 layout */}
          <div className="lg:col-span-1 relative rounded-3xl overflow-hidden border border-gray-200/60 shadow-sm group min-h-[500px] cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ece9ff] to-[#d6cbfb] opacity-60"></div>
            <div className="absolute inset-0 p-8 flex flex-col gap-4 items-center justify-center">
              <div className="w-full bg-white rounded-2xl shadow-sm border border-white/50 p-6 relative z-10 transform -translate-y-2 group-hover:-translate-y-4 transition-transform duration-500 ease-out">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                    <iconify-icon icon="solar:shield-check-bold-duotone" width="22"></iconify-icon>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Security Score</h3>
                    <p className="text-sm text-gray-500">Microsoft 365</p>
                  </div>
                </div>
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-[87%] bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-full"></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">87% — Utmärkt</p>
              </div>
              <div className="w-full bg-white rounded-2xl shadow-sm border border-white/50 p-6 relative z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Hot blockerade senaste 30d</h4>
                <p className="text-2xl font-medium text-gray-900 tracking-tight mb-4">12,847</p>
                <div className="flex items-end gap-1 h-16">
                  {[30, 45, 20, 60, 35, 80, 40, 55, 90, 100, 65, 85, 45].map((h, i) => (
                    <div key={i} className={`flex-1 rounded-t-[2px] ${i === 9 ? 'bg-emerald-500' : 'bg-emerald-200'}`} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-8 z-20">
              <h3 className="text-xl font-medium tracking-tight text-gray-900">Säkerhet</h3>
            </div>
          </div>

          {/* Card 3: Digital Strategi — from Fintech Card 3 */}
          <div className="lg:col-span-1 relative bg-white rounded-3xl overflow-hidden border border-gray-200/60 shadow-sm group min-h-[500px] cursor-pointer p-8 flex flex-col">
            <div className="absolute inset-0 bg-[radial-gradient(#dbeafe_1px,transparent_1px)] [background-size:12px_12px] opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-50/50 to-transparent pointer-events-none"></div>
            <div className="relative z-20">
              <h3 className="text-2xl font-medium tracking-tight text-gray-900 max-w-[200px] leading-tight mb-3">Digital strategi & roadmaps</h3>
              <p className="text-sm text-gray-500 mb-6">Vi mobiliserar er organisation och skapar handlingskraftiga initiativ.</p>
            </div>
            <div className="relative z-10 mt-auto flex flex-col gap-3">
              {["Nulägesanalys", "Målbild & vision", "Prioriterad roadmap", "Förankring i ledning"].map((step, i) => (
                <div key={i} className={`flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100 shadow-sm transform ${i < 2 ? 'translate-y-0 opacity-100' : `translate-y-${i*2} opacity-70`} group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500`} style={{ transitionDelay: `${i * 75}ms` }}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white ${i < 2 ? 'bg-indigo-500' : 'bg-gray-300 group-hover:bg-indigo-500'} transition-colors duration-500`}>{i + 1}</div>
                  <span className="text-sm font-medium text-gray-800">{step}</span>
                  {i < 2 && <iconify-icon icon="lucide:check" className="ml-auto text-emerald-500" width="16"></iconify-icon>}
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: M365 Expertis — from Fintech Card 4 (card issuing) */}
          <div className="lg:col-span-1 relative bg-white rounded-3xl overflow-hidden border border-gray-200/60 shadow-sm group min-h-[500px] cursor-pointer p-8 flex flex-col">
            <div className="absolute inset-0 bg-[radial-gradient(#fbcfe8_1px,transparent_1px)] [background-size:12px_12px] opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent"></div>
            <div className="relative z-20">
              <h3 className="text-2xl font-medium tracking-tight text-gray-900 max-w-[220px] leading-tight">Microsoft 365-experter</h3>
            </div>
            <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pt-32">
              <div className="w-56 h-72 rounded-t-3xl bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-100 via-indigo-400 to-purple-500 p-6 shadow-2xl transform translate-y-12 group-hover:translate-y-4 group-hover:rotate-2 group-hover:scale-105 transition-all duration-700 ease-out border border-white/40 flex flex-col relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-40 mix-blend-overlay pointer-events-none">
                  <div className="w-[200%] h-32 bg-white rounded-[100%] transform -rotate-12 translate-y-12 blur-md"></div>
                </div>
                <div className="flex items-center gap-3 relative z-10 mt-2">
                  <iconify-icon icon="simple-icons:microsoftteams" className="text-white text-3xl"></iconify-icon>
                  <iconify-icon icon="simple-icons:microsoftsharepoint" className="text-white text-3xl"></iconify-icon>
                </div>
                <div className="mt-auto flex flex-col gap-1 relative z-10">
                  <span className="text-white/80 text-xs">SharePoint · Teams · OneDrive</span>
                  <span className="text-white font-bold text-xl tracking-tight">M365</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Förändringsledning — from Fintech Card 5 (globe) */}
          <div className="lg:col-span-1 relative bg-white rounded-3xl overflow-hidden border border-gray-200/60 shadow-sm group min-h-[500px] cursor-pointer p-8 flex flex-col">
            <div className="absolute inset-0 bg-[radial-gradient(#f3e8ff_1px,transparent_1px)] [background-size:12px_12px] opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-[#faf7ff]"></div>
            <div className="relative z-20">
              <h3 className="text-2xl font-medium tracking-tight text-gray-900 max-w-[260px] leading-tight">Förändringsledning & adoption</h3>
            </div>
            <div className="absolute top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-center overflow-hidden">
              <div className="absolute bottom-[-88px] right-[-44px] w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffffff_0%,#f5ecff_28%,#ddd6fe_58%,#c4b5fd_78%,#a78bfa_100%)] shadow-[0_20px_60px_rgba(167,139,250,0.18)] border border-white/60 group-hover:scale-105 transition-transform duration-700 ease-out overflow-hidden">
                <div className="absolute inset-[10%] rounded-full border border-white/50"></div>
                <div className="absolute inset-[22%] rounded-full border border-white/40"></div>
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white/50"></div>
                <div className="absolute inset-x-[18%] top-1/2 -translate-y-1/2 h-px bg-white/50"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.65),transparent_30%)]"></div>
              </div>
              <div className="absolute top-[45%] left-[20%] bg-white border border-gray-100 shadow-sm rounded-full py-1.5 px-3 flex items-center gap-2 text-sm font-medium text-gray-900 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out">
                <iconify-icon icon="lucide:users" className="text-indigo-500" stroke-width="1.5"></iconify-icon>
                87%
                <span className="text-gray-400 text-xs">adoption</span>
              </div>
            </div>
          </div>

          {/* Card 6: Intranät — WIDE (col-span-3) — from Fintech Card 6 */}
          <div className="lg:col-span-3 overflow-hidden group min-h-[500px] md:min-h-[450px] cursor-pointer flex flex-col md:flex-row bg-white border border-gray-200/60 rounded-3xl relative shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-purple-50/50 z-0 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[300px] bg-blue-400/20 blur-[80px] rounded-full z-0 pointer-events-none"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[500px] bg-purple-500/20 blur-[80px] rounded-full z-0 pointer-events-none"></div>

            <div className="relative z-10 w-full md:w-[28%] p-6 md:p-8 flex items-start">
              <div>
                <h3 className="text-[22px] md:text-[28px] font-medium tracking-tight text-gray-900 leading-[1.05] max-w-[240px]">
                  Engagerande intranät & portaler
                </h3>
                <p className="text-sm text-gray-500 mt-3 max-w-[220px]">Skalbara, personaliserade digitala arbetsplatser.</p>
              </div>
            </div>

            <div className="relative z-10 flex-1 min-h-[350px] md:min-h-[450px] p-4 md:p-5">
              <div className="absolute right-4 md:right-6 top-4 md:top-5 w-[78%] h-[78%] bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="h-10 border-b border-gray-100 flex items-center px-4 bg-gray-50/70">
                  <div className="flex gap-2 mr-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                  </div>
                  <div className="mx-auto text-xs text-gray-500 font-medium bg-white border border-gray-100 rounded-full px-4 py-1 min-w-[180px] text-center">
                    <span className="inline-flex items-center gap-1.5">
                      <iconify-icon icon="lucide:lock" width="12"></iconify-icon>
                      intranat.diwo-kund.se
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-[160px_1fr] h-[calc(100%-40px)]">
                  <div className="border-r border-gray-100 bg-white/80 p-4">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                        <iconify-icon icon="lucide:building-2" width="16"></iconify-icon>
                      </div>
                      <span className="font-medium text-gray-900 text-sm">Företaget</span>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 w-24 bg-gray-100 rounded-full"></div>
                      <div className="h-3 w-20 bg-gray-100 rounded-full"></div>
                      <div className="h-3 w-16 bg-gray-100 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-base font-medium text-gray-900 mb-4">Senaste nytt</h4>
                    <div className="space-y-3">
                      {["Ny AI-policy antagen", "Teams-uppdatering v4.2", "Intranät: ny startsida live", "Kommande: Digital Summit 2025"].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100/80">
                          <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-emerald-400' : 'bg-gray-300'}`}></div>
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ─── SERVICE CARDS — OBLIQUE-style editorial cards ────────────────────
function ObliqueGrid() {
  const cards = [
    {
      num: "01",
      title: "DIWO INDEX",
      sub: "Digital mognadsanalys",
      desc: "Kartlägg er digitala arbetsplats med vårt benchmark-verktyg. 15 minuter per medarbetare — insikter som förändrar.",
      tags: ["Kartläggning", "Benchmark"],
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    },
    {
      num: "02",
      title: "MICROSOFT 365",
      sub: "Copilot & SharePoint",
      desc: "Implementation och optimering av hela Microsoft-ekosystemet. AI-drivna arbetsflöden som sparar tid och pengar.",
      tags: ["Teknik", "AI"],
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    },
    {
      num: "03",
      title: "FÖRÄNDRINGSLEDNING",
      sub: "Adoption & kultur",
      desc: "Tekniken är bara halva jobbet. Vi leder förändringen så att era medarbetare faktiskt använder verktygen.",
      tags: ["Människa", "Adoption"],
      img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    },
  ];

  return (
    <section className="bg-white py-8">
      {/* Header */}
      <div className="px-6 md:px-12 mb-16 max-w-[1200px] mx-auto flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-black"></div>
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Våra tjänster</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Vad vi<br />levererar.
          </h2>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-0 space-y-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500 grid grid-cols-1 lg:grid-cols-[2fr_3fr] min-h-[420px]">
            {/* Left — Text */}
            <div className="p-8 lg:p-10 flex flex-col justify-between border-r border-gray-100">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-mono text-gray-400">{card.num} / 04</span>
                  <span className="p-2 border border-gray-100 rounded-full hover:bg-gray-50 transition-colors cursor-pointer">
                    <iconify-icon icon="lucide:arrow-up-right" width="16" className="text-gray-800"></iconify-icon>
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{card.title}</h3>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mt-2">{card.sub}</p>
              </div>
              <div className="space-y-4 mt-8">
                <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                <div className="flex gap-2">
                  {card.tags.map((t, j) => (
                    <span key={j} className="px-3 py-1 bg-gray-100 rounded-full text-[10px] uppercase tracking-wider font-medium text-gray-600">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* Right — Image */}
            <div className="relative w-full h-full min-h-[260px] overflow-hidden">
              <img src={card.img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt={card.title} />
            </div>
          </div>
        ))}

        {/* CTA Card */}
        <div className="bg-[#0a0a0a] text-white rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-[2fr_3fr] min-h-[420px]">
          {/* Left — CTA content */}
          <div className="p-8 lg:p-10 flex flex-col justify-between border-r border-white/10">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-mono text-white/40">04 / 04</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">NÄSTA STEG</h3>
              <p className="text-xs font-medium text-white/40 uppercase tracking-widest mt-2">Redo att börja?</p>
            </div>
            <div className="space-y-6 mt-8">
              <p className="text-sm text-white/60 leading-relaxed">Oavsett om ni vill börja med en kartläggning eller behöver ett helt team — vi anpassar oss efter er.</p>
              <a href="#kontakt" className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full text-sm font-medium hover:bg-gray-100 hover:-translate-y-0.5 transition-all duration-300">
                Boka ett möte
                <iconify-icon icon="solar:arrow-right-linear" width="18"></iconify-icon>
              </a>
            </div>
          </div>
          {/* Right — Diwo logo */}
          <div className="relative w-full h-full min-h-[260px] flex items-center justify-center bg-[#111]">
            <img src="/diwo-logo.webp" alt="Diwo" className="w-1/2 max-w-[200px] object-contain invert opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
}


// ─── PHOTO BENTO — OBLIQUE parallax image grid ──────────────────────
function PhotoBento() {
  return (
    <section className="py-8 px-6 md:px-12 max-w-[1400px] mx-auto bg-white overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 min-h-[80vh]">
        {/* Col 1 */}
        <div className="flex flex-col gap-4 md:gap-6 pt-16">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" className="w-full aspect-[3/4] object-cover rounded-lg hover:scale-[1.02] transition-transform duration-700" alt="Team collaboration" />
          <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" className="w-full aspect-[4/5] object-cover rounded-lg hover:scale-[1.02] transition-transform duration-700" alt="Workshop" />
          <div className="p-8 flex items-center justify-center aspect-[4/5] bg-white border border-slate-200 rounded-lg">
            <img src="/diwo-logo.webp" alt="Diwo" className="w-3/4 max-w-[160px] object-contain opacity-80" />
          </div>
        </div>

        {/* Col 2 */}
        <div className="flex flex-col gap-4 md:gap-6">
          <img src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=800&q=80" className="w-full aspect-[3/4] object-cover rounded-lg hover:scale-[1.02] transition-transform duration-700" alt="Digital workspace" />
          {/* Video cell */}
          <div className="relative w-full aspect-square rounded-lg overflow-hidden group">
            <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
              <source src="https://dhygzobemt712.cloudfront.net/Web/home/09-2025/home-hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-medium text-slate-800">Diwo i praktiken</div>
          </div>
          <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80" className="w-full aspect-[4/3] object-cover rounded-lg hover:scale-[1.02] transition-transform duration-700" alt="Presentation" />
        </div>

        {/* Col 3 */}
        <div className="flex flex-col gap-4 md:gap-6 pt-32 hidden md:flex">
          <div className="w-full aspect-[3/4] bg-[#0f0f0f] text-white flex flex-col items-center justify-center rounded-lg p-8">
            <span className="text-6xl font-light tracking-tighter mb-2">50+</span>
            <span className="text-xs uppercase tracking-widest text-white/50">Organisationer</span>
          </div>
          <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80" className="w-full aspect-[4/5] object-cover rounded-lg hover:scale-[1.02] transition-transform duration-700" alt="Office culture" />
        </div>
      </div>
    </section>
  );
}


// ─── STICKY CARD STACK — OBLIQUE-style with Diwo content ────────────
function PartnershipCards() {
  const cards = [
    {
      num: "01",
      title: "DIWO INDEX",
      sub: "Digital mognadsanalys",
      desc: "Kartlägg er digitala arbetsplats med vårt benchmark-verktyg. 15 minuter per medarbetare — insikter som förändrar hela organisationen.",
      tags: ["Kartläggning", "Benchmark"],
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      dashboard: true,
    },
    {
      num: "02",
      title: "MICROSOFT 365",
      sub: "Copilot & SharePoint",
      desc: "Implementation och optimering av hela Microsoft-ekosystemet. AI-drivna arbetsflöden som sparar tid och pengar.",
      tags: ["Teknik", "AI"],
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    },
    {
      num: "03",
      title: "FÖRÄNDRINGSLEDNING",
      sub: "Adoption & kultur",
      desc: "Tekniken är bara halva jobbet. Vi leder förändringen så att era medarbetare faktiskt använder verktygen.",
      tags: ["Människa", "Adoption"],
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    },
  ];

  return (
    <section className="bg-[#f5f5f7] relative" id="diwo-index">
      {/* Header */}
      <div className="px-6 md:px-20 pt-28 pb-16 flex justify-between items-end max-w-[1200px] mx-auto">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-black"></div>
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Vad vi erbjuder</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Transparenta<br />samarbeten.
          </h2>
        </div>
      </div>

      {/* Sticky card stack */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-0 pb-16" style={{ perspective: '2000px' }}>
        {cards.map((card, i) => (
          <div
            key={i}
            className="sticky flex items-center justify-center mb-8"
            style={{ top: `${10 + i * 3}vh`, height: '75vh', zIndex: 10 + i }}
          >
            <div className="w-[95%] h-full bg-white border border-black/[0.06] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.15)] transition-shadow duration-500">
              {/* Left — Text */}
              <div className="p-8 lg:p-10 flex flex-col justify-between border-r border-black/[0.06]">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono text-gray-400">{card.num} / 04</span>
                    <span className="p-2 border border-gray-100 rounded-full hover:bg-gray-50 transition-colors cursor-pointer">
                      <iconify-icon icon="lucide:arrow-up-right" width="16" className="text-gray-800"></iconify-icon>
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{card.title}</h3>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mt-2">{card.sub}</p>
                </div>
                <div className="space-y-5 mt-6">
                  <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                  <div className="flex gap-2">
                    {card.tags.map((t, j) => (
                      <span key={j} className="px-3 py-1 bg-gray-100 rounded-full text-[10px] uppercase tracking-wider font-medium text-gray-600">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Right — Image or Dashboard */}
              <div className="relative w-full h-full overflow-hidden min-h-[300px]">
                {card.dashboard ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-8">
                    <div className="bg-white border border-neutral-200 rounded-2xl shadow-xl overflow-hidden w-full max-w-sm">
                      <div className="flex items-center gap-2 px-4 py-3 bg-neutral-50 border-b border-neutral-100">
                        <div className="flex gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-300"></span><span className="w-2.5 h-2.5 rounded-full bg-yellow-300"></span><span className="w-2.5 h-2.5 rounded-full bg-green-300"></span></div>
                        <span className="text-xs text-neutral-400 ml-2">Diwo Index</span>
                      </div>
                      <div className="p-5 space-y-4">
                        <DashMetric label="Digital Mognad" value="73" pct={73} color="from-blue-500 to-indigo-500" />
                        <DashMetric label="Medarbetarengagemang" value="68" pct={68} color="from-purple-500 to-fuchsia-500" />
                        <DashMetric label="Samarbetseffektivitet" value="81" pct={81} color="from-teal-500 to-cyan-500" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img src={card.img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.2s]" alt={card.title} />
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Card 4 — Dark CTA */}
        <div
          className="sticky flex items-center justify-center mb-8"
          style={{ top: '19vh', height: '75vh', zIndex: 13 }}
        >
          <div className="w-[95%] h-full bg-[#0a0a0a] border border-white/[0.06] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]">
            {/* Left — CTA */}
            <div className="p-8 lg:p-10 flex flex-col justify-between border-r border-white/10 text-white">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-mono text-white/30">04 / 04</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">NÄSTA STEG</h3>
                <p className="text-xs font-medium text-white/30 uppercase tracking-widest mt-2">Redo att börja?</p>
              </div>
              <div className="space-y-6 mt-6">
                <p className="text-sm text-white/50 leading-relaxed">Oavsett om ni vill börja med en kartläggning eller behöver ett helt team — vi anpassar oss efter er.</p>
                <a href="#kontakt" className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full text-sm font-medium hover:bg-gray-100 hover:-translate-y-0.5 transition-all duration-300">
                  Boka ett möte
                  <iconify-icon icon="solar:arrow-right-linear" width="18"></iconify-icon>
                </a>
              </div>
            </div>
            {/* Right — Logo */}
            <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-[#111]">
              <img src="/diwo-logo.webp" alt="Diwo" className="w-1/2 max-w-[220px] object-contain invert opacity-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ─── METRICS BREAKER — Stripe GlobalCommerce (canvas rays + stats) ──
function MetricsBreaker() {
  const canvasRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const isPausedRef = useRef(false);

  const stats = [
    { value: "100K+", label: "Respondenter via Diwo Index" },
    { value: "50+", label: "Organisationer kartlagda" },
    { value: "M365", label: "Certifierade konsulter" },
    { value: "98%", label: "Kundnöjdhet" },
  ];

  // Canvas ray animation (ported from GlobalCommerceSection.jsx)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    let width, height, rays = [], animationFrameId;
    const numRays = 350;
    let mouse = { x: -1000, y: -1000, active: false };

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width; height = rect.height;
      canvas.width = width * dpr; canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      rays = [];
      for (let i = 0; i < numRays; i++) rays.push(new Ray());
    }

    class Ray {
      constructor() {
        this.originX = width / 2;
        this.originY = height + 50;
        this.angle = Math.PI + Math.random() * Math.PI * 1.2 - Math.PI * 0.1;
        this.baseLength = Math.random() * (height * 0.8) + height * 0.2;
        this.currentLength = 0;
        this.phase = Math.random() * Math.PI * 2;
        this.speed = 0.005 + Math.random() * 0.01;
        this.vx = 0; this.vy = 0;
        this.baseEndX = this.originX + Math.cos(this.angle) * this.baseLength;
        this.baseEndY = this.originY + Math.sin(this.angle) * this.baseLength;
        this.endX = this.baseEndX; this.endY = this.baseEndY;
      }
      update(time) {
        if (isPausedRef.current) return;
        const breath = Math.sin(time * this.speed + this.phase) * 15;
        const len = this.baseLength + breath;
        this.baseEndX = this.originX + Math.cos(this.angle) * len;
        this.baseEndY = this.originY + Math.sin(this.angle) * len;
        if (this.currentLength < len) this.currentLength += (len - this.currentLength) * 0.05;
        let px = this.originX + Math.cos(this.angle) * this.currentLength;
        let py = this.originY + Math.sin(this.angle) * this.currentLength;
        if (mouse.active) {
          const dx = mouse.x - px, dy = mouse.y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            const a = Math.atan2(dy, dx);
            this.vx -= Math.cos(a) * force * 8;
            this.vy -= Math.sin(a) * force * 8;
          }
        }
        this.vx += (this.baseEndX - this.endX) * 0.08; this.vy += (this.baseEndY - this.endY) * 0.08;
        this.vx *= 0.85; this.vy *= 0.85;
        this.endX += this.vx; this.endY += this.vy;
        if (!mouse.active && Math.abs(this.vx) < 0.1 && Math.abs(this.vy) < 0.1) { this.endX = px; this.endY = py; }
      }
      draw() {
        const g = ctx.createLinearGradient(this.originX, this.originY, this.endX, this.endY);
        g.addColorStop(0, "rgba(251,191,36,0.4)"); g.addColorStop(0.5, "rgba(96,165,250,0.3)"); g.addColorStop(1, "rgba(37,99,235,0.6)");
        ctx.beginPath(); ctx.moveTo(this.originX, this.originY); ctx.lineTo(this.endX, this.endY);
        ctx.strokeStyle = g; ctx.lineWidth = 1; ctx.stroke();
        ctx.beginPath(); ctx.arc(this.endX, this.endY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(37,99,235,0.8)"; ctx.fill();
      }
    }

    function animate(time) {
      ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, width, height);
      const bg = ctx.createRadialGradient(width/2, height, 0, width/2, height, height);
      bg.addColorStop(0, "rgba(253,230,138,0.2)"); bg.addColorStop(0.5, "rgba(191,219,254,0.15)"); bg.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, width, height);
      rays.sort((a, b) => b.baseLength - a.baseLength).forEach(r => { r.update(time); r.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    }

    const onMove = (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true; };
    const onLeave = () => { mouse.active = false; mouse.x = -1000; mouse.y = -1000; };
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    resize();
    animationFrameId = requestAnimationFrame(animate);
    return () => { window.removeEventListener("resize", resize); canvas.removeEventListener("mousemove", onMove); canvas.removeEventListener("mouseleave", onLeave); cancelAnimationFrame(animationFrameId); };
  }, []);

  return (
    <section className="bg-white text-slate-900 overflow-hidden">
      <div className="relative max-w-screen-2xl mx-auto border-x border-slate-200">
        {/* Corner accents */}
        <div className="absolute top-0 -left-[3px] w-1.5 h-1.5 bg-slate-200"></div>
        <div className="absolute top-0 -right-[3px] w-1.5 h-1.5 bg-slate-200"></div>

        {/* Heading */}
        <div className="px-6 md:px-12 pt-24 pb-16 text-center relative z-10">
          <RevealText
            text="Samarbetspartner till Sveriges ledande organisationer."
            as="h2"
            className="text-4xl md:text-6xl font-medium tracking-tight text-slate-900 leading-[1.1] max-w-4xl mx-auto"
            delayOffset={0.1}
          />
        </div>

        {/* Stats row */}
        <div className="relative z-10 bg-white">
          <div className="w-full h-px bg-slate-200"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 text-center">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                className="py-12 px-6 flex flex-col items-center justify-center cursor-default transition-colors duration-300 hover:bg-slate-50/50"
              >
                <div className={`text-4xl md:text-5xl font-medium tracking-tight mb-2 transition-colors duration-300 ${hoverIndex === idx ? 'text-slate-900' : idx === 0 ? 'text-slate-900' : 'text-slate-600'}`}>
                  {stat.value}
                </div>
                <p className="text-sm text-slate-500 font-normal leading-relaxed max-w-[180px]">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="w-full h-px bg-slate-200"></div>
        </div>

        {/* Canvas visualization */}
        <div className="relative flex-grow overflow-hidden min-h-[500px]" style={{ background: 'radial-gradient(100% 100% at 50% 100%, rgba(253,230,138,0.4) 0%, rgba(191,219,254,0.4) 50%, rgba(255,255,255,0) 100%)' }}>
          <div className="absolute inset-0 z-10 w-full h-full flex items-end justify-center pointer-events-auto cursor-crosshair">
            <canvas ref={canvasRef} className="w-full h-full block"></canvas>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}


// ─── DASH METRIC — for Diwo Index dashboard ────────────────────────
function DashMetric({ label, value, pct, color }) {
  return (
    <div>
      <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">{label}</div>
      <div className="text-3xl font-semibold text-neutral-900 tracking-tight mb-2">{value}<span className="text-lg text-neutral-400">%</span></div>
      <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000`} style={{ width: `${pct}%` }}></div>
      </div>
    </div>
  );
}


// ─── PAIN SECTION — Ported from Growth.io (template 64) dark section
function PainSection() {
  return (
    <section className="overflow-hidden bg-neutral-950 border-neutral-800 border-t pt-24 pb-24 relative" id="varfor">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/20 via-neutral-950 to-neutral-950"></div>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Label */}
        <div className="flex flex-col items-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 shadow-sm">
            <iconify-icon icon="solar:chart-square-bold-duotone" width="18" height="18" className="text-blue-400"></iconify-icon>
            <span className="text-[11px] uppercase font-medium text-neutral-400 tracking-[0.18em]">Fakta som driver förändring</span>
          </div>
          <h2 className="mt-6 text-4xl lg:text-5xl tracking-tight text-white text-center max-w-3xl leading-[1.05]">
            Varför den digitala arbetsplatsen spelar roll
          </h2>
          <p className="mt-4 text-base text-neutral-400 text-center max-w-2xl">
            De flesta organisationer förlorar tid, pengar och engagemang — helt i onödan. Här är fakta som visar varför.
          </p>
        </div>

        {/* Problem Grid — exact layout from Growth.io */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 relative">
          {/* Col 1 */}
          <div className="flex flex-col pt-10 gap-4">
            <Placeholder />
            <Placeholder />
            <PainCard tag="Söka information" icon="solar:hourglass-bold-duotone" stat="19%" text={<>Medarbetare spenderar i snitt <span className="font-medium text-white">7,2 timmar per vecka</span> med att söka efter information.</>} />
            <Placeholder />
          </div>
          {/* Col 2 */}
          <div className="flex flex-col gap-4">
            <Placeholder />
            <PainCard tag="Högre lönsamhet" icon="solar:graph-new-bold-duotone" stat="23%" text={<>Organisationer med högt engagerade anställda har <span className="font-medium text-white">23% högre lönsamhet</span>.</>} />
            <Placeholder />
            <Placeholder />
          </div>
          {/* Col 3 */}
          <div className="flex flex-col gap-4">
            <Placeholder />
            <PainCard tag="Generativ AI" icon="solar:bolt-bold-duotone" stat="40%" text={<>Användningen av generativ AI leder till en <span className="font-medium text-white">ökad kvalitet med 40%</span>.</>} />
            <Placeholder />
            <Placeholder />
          </div>
          {/* Col 4 */}
          <div className="flex flex-col gap-4 pt-6 md:pt-0">
            <Placeholder />
            <Placeholder />
            <PainCard tag="Rollspecifikt arbete" icon="solar:users-group-rounded-bold-duotone" stat="39%" text={<>I slutändan återstår bara <span className="font-medium text-white">39% av arbetstiden</span> för uppgifter vi är anställda för.</>} />
            <Placeholder />
          </div>
        </div>
      </div>
    </section>
  );
}

function Placeholder() {
  return (
    <div className="h-20 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5 flex flex-col justify-center gap-2.5 opacity-50">
      <div className="h-1.5 w-12 rounded-full bg-white/10"></div>
      <div className="h-1.5 w-full rounded-full bg-white/5"></div>
    </div>
  );
}

function PainCard({ tag, icon, stat, text }) {
  return (
    <div className="rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl px-5 py-5 flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-3 text-[11px] font-medium text-neutral-500 uppercase tracking-[0.16em]">
        <iconify-icon icon={icon} width="16" height="16"></iconify-icon>
        <span>{tag}</span>
      </div>
      <div className="text-4xl font-semibold text-white tracking-tighter mb-2">{stat}</div>
      <p className="text-sm text-neutral-400 leading-relaxed">{text}</p>
    </div>
  );
}


// ─── CTA — Ported from Growth.io (template 64) ────────────────────
function CtaSection() {
  return (
    <section className="overflow-hidden bg-center bg-neutral-950 bg-cover border-neutral-800 border-t pt-20 pb-16 relative" id="kontakt">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.15),transparent_60%)]"></div>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex bg-gradient-to-b from-white/10 to-white/0 rounded-full mb-6 pt-1 pr-4 pb-1 pl-4 backdrop-blur-lg gap-2 items-center border border-white/10">
            <iconify-icon icon="solar:flash-circle-bold-duotone" className="text-blue-300"></iconify-icon>
            <span className="text-[11px] uppercase font-medium text-gray-100 tracking-[0.18em]">Redo att ta nästa steg?</span>
          </div>
          <h2 className="text-4xl lg:text-5xl tracking-tight text-white leading-[1.05] mb-4">
            Kontakta oss för ett förutsättningslöst samtal
          </h2>
          <p className="text-base text-neutral-300 max-w-2xl mx-auto mb-6">
            Vi hjälper er organisation att lyckas med den digitala arbetsplatsen — från strategi till implementation.
          </p>

          {/* Person */}
          <div className="flex items-center gap-4 justify-center mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center text-white font-bold text-sm">ER</div>
            <div className="text-left">
              <div className="text-sm font-medium text-white">Edward Ringborg</div>
              <div className="text-xs text-neutral-400">CEO & Digital Workplace Strategist</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a href="mailto:kontakt@diwo.se" className="group inline-flex items-center justify-center rounded-full bg-white text-neutral-900 text-sm font-medium px-6 py-3 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.7)] hover:bg-neutral-100 transition-all gap-2">
              Kontakta oss
              <iconify-icon icon="solar:arrow-right-up-bold-duotone" width="16" height="16"></iconify-icon>
            </a>
            <a href="tel:+46760068007" className="inline-flex hover:border-neutral-400 hover:text-white transition-colors text-white text-sm font-medium bg-gradient-to-b from-white/10 to-white/0 rounded-full py-3 px-6 backdrop-blur-xl items-center justify-center border border-white/10">
              +46 76-006 80 07
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-white/70">edward.ringborg@diwo.se</span>
          </div>
        </div>
      </div>
    </section>
  );
}


// ─── FOOTER — Ported from Growth.io (template 64) ─────────────────
function FooterSection() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 pt-14 pb-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="bg-neutral-900/50 border border-white/5 rounded-3xl px-6 py-10 lg:px-10 lg:py-12 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Brand */}
            <div className="lg:w-1/3 space-y-5">
              <div className="flex items-center gap-3">
                <img src="/diwo-logo.webp" alt="Diwo" className="h-8 object-contain invert" />
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">Digital arbetsplatskonsulter</span>
                </div>
              </div>
              <p className="text-sm text-neutral-400 max-w-sm">Vi hjälper organisationer att lyckas med den digitala arbetsplatsen. En del av Worklife Group.</p>
              <div className="flex items-center gap-3 text-neutral-500">
                <a href="https://www.linkedin.com/company/diwo-group/" className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center hover:border-neutral-600 hover:text-white transition-colors">
                  <iconify-icon icon="simple-icons:linkedin" width="14" height="14"></iconify-icon>
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="space-y-3">
                <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">Tjänster</h3>
                <ul className="space-y-2 text-neutral-400">
                  {["AI & Copilot", "Säkerhet", "Microsoft 365", "Digital strategi", "Intranät & Portaler"].map((s) => (
                    <li key={s}><a href="#" className="hover:text-white transition-colors">{s}</a></li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">Företaget</h3>
                <ul className="space-y-2 text-neutral-400">
                  {["Om Diwo", "Diwo Index", "Våra konsulter", "Karriär"].map((s) => (
                    <li key={s}><a href="#" className="hover:text-white transition-colors">{s}</a></li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">Kontakt</h3>
                <ul className="space-y-2 text-neutral-400">
                  <li><a href="mailto:kontakt@diwo.se" className="hover:text-white transition-colors">kontakt@diwo.se</a></li>
                  <li><span>Norr Mälarstrand 14</span></li>
                  <li><span>112 20 Stockholm</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-neutral-800 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-neutral-500">
            <p>© 2025 Diwo AB. Alla rättigheter förbehållna.</p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-neutral-300 transition-colors">Worklife Group</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
