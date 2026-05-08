"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Work", "Services", "About", "Contact"];

const SERVICES = [
  {
    num: "01",
    title: "Editorial",
    desc: "Fashion, beauty, and lifestyle photography for print and digital media.",
  },
  {
    num: "02",
    title: "Commercial",
    desc: "Product, campaign, and brand photography that converts and captivates.",
  },
  {
    num: "03",
    title: "Portrait",
    desc: "Executive, personal, and artistic portraiture with cinematic depth.",
  },
  {
    num: "04",
    title: "Film & Motion",
    desc: "Short-form video, reels, and cinematic brand films.",
  },
];

const WORKS = [
  { id: 1, tag: "Editorial", title: "Velvet Season", aspect: "tall" },
  { id: 2, tag: "Commercial", title: "Pure Form", aspect: "wide" },
  { id: 3, tag: "Portrait", title: "Unguarded", aspect: "square" },
  { id: 4, tag: "Film", title: "Drift", aspect: "tall" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Instrument+Sans:wght@400;500&display=swap');

        :root {
          --cream: #F5F0E8;
          --ink: #0E0D0B;
          --warm-mid: #8C7B6B;
          --accent: #C4A882;
          --surface: #EFEBE2;
          --serif: 'Cormorant Garamond', Georgia, serif;
          --sans: 'Instrument Sans', sans-serif;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        html { scroll-behavior: smooth; }

        body {
          background: var(--cream);
          color: var(--ink);
          font-family: var(--sans);
          overflow-x: hidden;
        }

        /* ── NAV ── */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 3rem;
          mix-blend-mode: normal;
          transition: background 0.4s, backdrop-filter 0.4s;
        }
        .nav.scrolled {
          background: rgba(245,240,232,0.85);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(196,168,130,0.2);
        }
        .nav-logo {
          font-family: var(--serif);
          font-size: 1.25rem;
          font-weight: 300;
          letter-spacing: 0.08em;
          color: var(--ink);
          text-decoration: none;
        }
        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }
        .nav-links a {
          font-family: var(--sans);
          font-size: 0.75rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink);
          text-decoration: none;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .nav-links a:hover { opacity: 1; }

        .nav-cta {
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.6rem 1.4rem;
          border: 1px solid var(--ink);
          color: var(--ink);
          text-decoration: none;
          transition: background 0.25s, color 0.25s;
        }
        .nav-cta:hover { background: var(--ink); color: var(--cream); }

        /* ── HERO ── */
        .hero {
          min-height: 100svh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
        }
        .hero-left {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 10rem 3rem 5rem;
          position: relative;
          z-index: 2;
        }
        .hero-eyebrow {
          font-family: var(--sans);
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--warm-mid);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .hero-eyebrow::before {
          content: '';
          display: block;
          width: 2rem;
          height: 1px;
          background: var(--accent);
        }
        .hero-headline {
          font-family: var(--serif);
          font-size: clamp(3.5rem, 7vw, 6.5rem);
          font-weight: 300;
          line-height: 1.05;
          letter-spacing: -0.01em;
          color: var(--ink);
          margin-bottom: 2rem;
        }
        .hero-headline em {
          font-style: italic;
          color: var(--warm-mid);
        }
        .hero-body {
          font-size: 0.95rem;
          line-height: 1.8;
          color: var(--warm-mid);
          max-width: 22rem;
          margin-bottom: 3rem;
        }
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--ink);
          color: var(--cream);
          padding: 0.9rem 2rem;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.25s, gap 0.25s;
        }
        .btn-primary:hover { background: #2a2520; gap: 0.9rem; }
        .btn-primary svg { transition: transform 0.25s; }
        .btn-primary:hover svg { transform: translateX(3px); }

        .btn-ghost {
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--warm-mid);
          text-decoration: none;
          border-bottom: 1px solid currentColor;
          padding-bottom: 1px;
          transition: color 0.2s;
        }
        .btn-ghost:hover { color: var(--ink); }

        .hero-right {
          position: relative;
          overflow: hidden;
        }
        .hero-img-wrapper {
          position: absolute;
          inset: 0;
          background: #1a1714;
        }
        .hero-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, var(--cream) 0%, transparent 30%);
          z-index: 1;
        }
        .hero-img-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #2a2520 0%, #1a1410 40%, #3d2e24 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* Decorative camera aperture SVG inside placeholder */
        .aperture {
          opacity: 0.12;
          width: 320px;
          height: 320px;
        }

        .hero-scroll-hint {
          position: absolute;
          bottom: 2.5rem;
          left: 3rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--warm-mid);
          z-index: 3;
        }
        .scroll-line {
          width: 1px;
          height: 3rem;
          background: linear-gradient(to bottom, var(--accent), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.1); }
        }

        /* ── TICKER ── */
        .ticker-wrap {
          overflow: hidden;
          border-top: 1px solid rgba(140,123,107,0.2);
          border-bottom: 1px solid rgba(140,123,107,0.2);
          padding: 0.85rem 0;
          background: var(--surface);
        }
        .ticker-track {
          display: flex;
          gap: 3rem;
          animation: ticker 22s linear infinite;
          white-space: nowrap;
          width: max-content;
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ticker-item {
          font-family: var(--serif);
          font-size: 0.9rem;
          font-style: italic;
          color: var(--warm-mid);
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 3rem;
        }
        .ticker-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--accent);
          display: inline-block;
        }

        /* ── SERVICES ── */
        .section {
          padding: 7rem 3rem;
          max-width: 1400px;
          margin: 0 auto;
        }
        .section-label {
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--warm-mid);
          margin-bottom: 4rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, rgba(196,168,130,0.4), transparent);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-left: 1px solid rgba(140,123,107,0.2);
        }
        .service-item {
          padding: 2.5rem 2rem;
          border-right: 1px solid rgba(140,123,107,0.2);
          border-bottom: 1px solid rgba(140,123,107,0.2);
          transition: background 0.3s;
          cursor: default;
        }
        .service-item:hover { background: var(--surface); }
        .service-num {
          font-family: var(--serif);
          font-size: 0.8rem;
          color: var(--accent);
          margin-bottom: 1.5rem;
          letter-spacing: 0.04em;
        }
        .service-title {
          font-family: var(--serif);
          font-size: 1.8rem;
          font-weight: 300;
          color: var(--ink);
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .service-desc {
          font-size: 0.82rem;
          line-height: 1.7;
          color: var(--warm-mid);
        }

        /* ── WORK ── */
        .work-section {
          background: var(--ink);
          padding: 7rem 3rem;
        }
        .work-inner {
          max-width: 1400px;
          margin: 0 auto;
        }
        .work-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 4rem;
        }
        .work-title {
          font-family: var(--serif);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 300;
          color: var(--cream);
          line-height: 1.1;
        }
        .work-title em { font-style: italic; color: var(--accent); }
        .work-all {
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent);
          text-decoration: none;
          border-bottom: 1px solid var(--accent);
          padding-bottom: 2px;
          transition: color 0.2s;
          flex-shrink: 0;
          margin-bottom: 0.25rem;
        }
        .work-all:hover { color: var(--cream); border-color: var(--cream); }

        .works-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: auto;
          gap: 1rem;
        }
        .work-card:nth-child(1) { grid-column: 1 / 5; grid-row: 1; }
        .work-card:nth-child(2) { grid-column: 5 / 9; grid-row: 1; }
        .work-card:nth-child(3) { grid-column: 9 / 13; grid-row: 1; }
        .work-card:nth-child(4) { grid-column: 3 / 11; grid-row: 2; margin-top: 0; }

        .work-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          group: true;
        }
        .work-card-img {
          aspect-ratio: 3/4;
          background: linear-gradient(135deg, #1e1a16, #2d2520, #1a1410);
          position: relative;
          overflow: hidden;
          transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .work-card:nth-child(2) .work-card-img { aspect-ratio: 4/3; }
        .work-card:nth-child(4) .work-card-img { aspect-ratio: 16/7; }

        .work-card:hover .work-card-img { transform: scale(1.03); }

        .work-card-img-inner {
          position: absolute;
          inset: 0;
          background: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .img-grain {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
        }

        .work-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(14,13,11,0.85) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.35s;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
        }
        .work-card:hover .work-card-overlay { opacity: 1; }
        .work-card-info { transform: translateY(6px); transition: transform 0.35s; }
        .work-card:hover .work-card-info { transform: translateY(0); }
        .work-card-tag {
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.3rem;
        }
        .work-card-title {
          font-family: var(--serif);
          font-size: 1.4rem;
          font-weight: 300;
          color: var(--cream);
          font-style: italic;
        }

        /* image tones */
        .work-card:nth-child(1) .work-card-img { background: linear-gradient(160deg, #2a1f1a 0%, #1a110c 60%, #3a2a20 100%); }
        .work-card:nth-child(2) .work-card-img { background: linear-gradient(160deg, #1c1a18 0%, #282420 60%, #1a1714 100%); }
        .work-card:nth-child(3) .work-card-img { background: linear-gradient(160deg, #1a1c1e 0%, #12181c 60%, #202428 100%); }
        .work-card:nth-child(4) .work-card-img { background: linear-gradient(160deg, #201c18 0%, #2a2420 50%, #181410 100%); }

        /* subtle lens flare decorations */
        .work-card:nth-child(1) .work-card-img-inner::after {
          content: '';
          position: absolute;
          top: 20%; left: 60%;
          width: 120px; height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(196,168,130,0.08) 0%, transparent 70%);
        }

        /* ── STATS ── */
        .stats-bar {
          background: var(--surface);
          border-top: 1px solid rgba(140,123,107,0.2);
          border-bottom: 1px solid rgba(140,123,107,0.2);
        }
        .stats-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          divide-x: 1px solid rgba(140,123,107,0.2);
        }
        .stat-item {
          padding: 3.5rem 3rem;
          border-right: 1px solid rgba(140,123,107,0.2);
          text-align: center;
        }
        .stat-item:first-child { border-left: none; }
        .stat-num {
          font-family: var(--serif);
          font-size: clamp(2.5rem, 4vw, 4rem);
          font-weight: 300;
          color: var(--ink);
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .stat-num sup {
          font-size: 0.5em;
          vertical-align: super;
          color: var(--accent);
        }
        .stat-label {
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--warm-mid);
        }

        /* ── CTA ── */
        .cta-section {
          padding: 9rem 3rem;
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .cta-left {}
        .cta-sub {
          font-family: var(--serif);
          font-style: italic;
          font-size: 1rem;
          color: var(--accent);
          margin-bottom: 1rem;
        }
        .cta-headline {
          font-family: var(--serif);
          font-size: clamp(2.2rem, 4vw, 3.5rem);
          font-weight: 300;
          line-height: 1.15;
          color: var(--ink);
        }
        .cta-right {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-left: 3rem;
          border-left: 1px solid rgba(196,168,130,0.3);
        }
        .cta-body {
          font-size: 0.9rem;
          line-height: 1.8;
          color: var(--warm-mid);
        }
        .cta-actions { display: flex; gap: 1.5rem; align-items: center; }

        /* ── FOOTER ── */
        footer {
          background: var(--ink);
          padding: 4rem 3rem 2.5rem;
        }
        .footer-inner {
          max-width: 1400px;
          margin: 0 auto;
        }
        .footer-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(245,240,232,0.1);
          margin-bottom: 2rem;
        }
        .footer-logo {
          font-family: var(--serif);
          font-size: 1.4rem;
          font-weight: 300;
          color: var(--cream);
          letter-spacing: 0.06em;
        }
        .footer-tagline {
          font-style: italic;
          color: var(--accent);
          font-size: 0.85rem;
          margin-top: 0.25rem;
        }
        .footer-links {
          display: flex;
          gap: 4rem;
        }
        .footer-col-label {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.3);
          margin-bottom: 1rem;
        }
        .footer-col a {
          display: block;
          font-size: 0.82rem;
          color: rgba(245,240,232,0.6);
          text-decoration: none;
          margin-bottom: 0.5rem;
          transition: color 0.2s;
        }
        .footer-col a:hover { color: var(--cream); }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.7rem;
          color: rgba(245,240,232,0.3);
          letter-spacing: 0.06em;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; min-height: auto; }
          .hero-right { height: 55vw; }
          .hero-left { padding: 8rem 1.5rem 4rem; }
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .works-grid { grid-template-columns: 1fr 1fr; }
          .work-card { grid-column: auto !important; grid-row: auto !important; }
          .work-card:nth-child(4) { display: none; }
          .stats-inner { grid-template-columns: repeat(2, 1fr); }
          .cta-section { grid-template-columns: 1fr; }
          .cta-right { border-left: none; padding-left: 0; border-top: 1px solid rgba(196,168,130,0.3); padding-top: 2rem; }
          .footer-top { flex-direction: column; gap: 2rem; }
          .nav { padding: 1.25rem 1.5rem; }
          .nav-links { display: none; }
          .section { padding: 5rem 1.5rem; }
          .work-section { padding: 5rem 1.5rem; }
        }

        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr; }
          .stats-inner { grid-template-columns: 1fr 1fr; }
          .works-grid { grid-template-columns: 1fr; }
          .work-card:nth-child(4) { display: none; }
          .footer-links { flex-direction: column; gap: 2rem; }
          .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
        }

        /* ── FADE IN ANIMATION ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.25s; }
        .delay-3 { animation-delay: 0.4s; }
        .delay-4 { animation-delay: 0.55s; }
      `}</style>

      {/* NAV */}
      <nav className={`nav ${scrollY > 60 ? "scrolled" : ""}`}>
        <a href="#" className="nav-logo">LUMEN STUDIO</a>
        <ul className="nav-links">
          {NAV_LINKS.map(l => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
        <a href="#" className="nav-cta">Book a Session</a>
      </nav>

      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div className="hero-left">
          <p className="hero-eyebrow fade-up">New Delhi · Est. 2014</p>
          <h1 className="hero-headline fade-up delay-1">
            Light is the<br />
            <em>language</em> we<br />
            speak fluently
          </h1>
          <p className="hero-body fade-up delay-2">
            A boutique photography & film studio crafting images that endure — 
            for brands, publications, and individuals who refuse to be ordinary.
          </p>
          <div className="hero-actions fade-up delay-3">
            <a href="#" className="btn-primary">
              See Our Work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M7 1L13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" className="btn-ghost">View Pricing</a>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-img-wrapper">
            <div className="hero-img-overlay" />
            <div className="hero-img-placeholder">
              {/* Decorative aperture motif */}
              <svg className="aperture" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="0.5"/>
                <circle cx="100" cy="100" r="55" stroke="white" strokeWidth="0.5"/>
                <circle cx="100" cy="100" r="30" stroke="white" strokeWidth="0.5"/>
                {[0,45,90,135].map(angle => (
                  <line
                    key={angle}
                    x1="100" y1="20"
                    x2="100" y2="180"
                    stroke="white" strokeWidth="0.3"
                    transform={`rotate(${angle} 100 100)`}
                  />
                ))}
                {[22.5,67.5,112.5,157.5].map((angle,i) => (
                  <line
                    key={i}
                    x1="100" y1="45"
                    x2="100" y2="155"
                    stroke="white" strokeWidth="0.2" strokeDasharray="2 4"
                    transform={`rotate(${angle} 100 100)`}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
        <div className="hero-scroll-hint fade-up delay-4">
          <div className="scroll-line" />
          Scroll
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...Array(2)].map((_, i) =>
            ["Editorial Photography","Commercial Campaigns","Luxury Portraiture","Brand Film","Studio Rental","Fine Art Prints","Fashion Editorials","Product Photography"].map((t, j) => (
              <span className="ticker-item" key={`${i}-${j}`}>
                {t} <span className="ticker-dot" />
              </span>
            ))
          )}
        </div>
      </div>

      {/* SERVICES */}
      <div className="section">
        <p className="section-label">What We Do</p>
        <div className="services-grid">
          {SERVICES.map(s => (
            <div className="service-item" key={s.num}>
              <div className="service-num">{s.num}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SELECTED WORK */}
      <section className="work-section">
        <div className="work-inner">
          <div className="work-header">
            <h2 className="work-title">Selected<br /><em>Works</em></h2>
            <a href="#" className="work-all">View All Projects</a>
          </div>
          <div className="works-grid">
            {WORKS.map(w => (
              <div className="work-card" key={w.id}>
                <div className="work-card-img">
                  <div className="work-card-img-inner">
                    <div className="img-grain" />
                  </div>
                  <div className="work-card-overlay">
                    <div className="work-card-info">
                      <p className="work-card-tag">{w.tag}</p>
                      <p className="work-card-title">{w.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        <div className="stats-inner">
          {[
            { num: "340", sup: "+", label: "Projects Completed" },
            { num: "12", sup: "yr", label: "Years in Practice" },
            { num: "80", sup: "+", label: "Brand Clients" },
            { num: "18", sup: "", label: "International Awards" },
          ].map(s => (
            <div className="stat-item" key={s.label}>
              <div className="stat-num">{s.num}<sup>{s.sup}</sup></div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section style={{ background: "var(--cream)" }}>
        <div className="cta-section">
          <div className="cta-left">
            <p className="cta-sub">Ready to create?</p>
            <h2 className="cta-headline">
              Let's make something<br />
              worth remembering.
            </h2>
          </div>
          <div className="cta-right">
            <p className="cta-body">
              Whether you're a brand launching a campaign, a publication in need of editorial imagery, 
              or an individual seeking a portrait that captures who you truly are — we'd love to work with you.
            </p>
            <div className="cta-actions">
              <a href="#" className="btn-primary">
                Get in Touch
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7H13M7 1L13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="tel:+911234567890" className="btn-ghost">+91 12345 67890</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="footer-logo">LUMEN STUDIO</div>
              <div className="footer-tagline">Photography & Film, New Delhi</div>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <p className="footer-col-label">Navigate</p>
                {["Work","Services","About","Journal","Contact"].map(l => <a key={l} href="#">{l}</a>)}
              </div>
              <div className="footer-col">
                <p className="footer-col-label">Services</p>
                {["Editorial","Commercial","Portraiture","Film & Motion","Studio Hire"].map(l => <a key={l} href="#">{l}</a>)}
              </div>
              <div className="footer-col">
                <p className="footer-col-label">Follow</p>
                {["Instagram","Behance","LinkedIn","Vimeo"].map(l => <a key={l} href="#">{l}</a>)}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2025 Lumen Studio. All rights reserved.</span>
            <span>Privacy · Terms</span>
          </div>
        </div>
      </footer>
    </>
  );
}